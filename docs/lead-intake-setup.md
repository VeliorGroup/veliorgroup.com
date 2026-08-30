# Lead intake — setup Salesforce + produzione

Runbook per collegare il form di `veliorgroup.com` all'org `VELIOR_GROUP_PROD`.
Finché non è completato il form **funziona lo stesso**: ogni lead viene scritto
su disco in `LEAD_SPOOL_DIR` invece che nel CRM, quindi non si perde nulla — ma
non arriva niente in Salesforce.

## Stato attuale

| # | Passo | Stato |
|---|---|---|
| 1 | Deploy metadata su `VELIOR_GROUP_PROD` | ✅ fatto (deploy `0AfWV000009KmJR0A0`, 4/4 componenti) |
| 2 | Utente di integrazione | ✅ creato — `website.integration@veliorgroup.com.pbo` (`005WV000007M3knYAC`) |
| 2b | Permission set assegnato all'utente | ⚠️ **da verificare in Setup** (l'assegnazione da CLI ha restituito un errore) |
| 3 | Abilitare client credentials + Run As | ❌ **da fare in Setup** — non esiste via API |
| 4 | Consumer secret → `/etc/veliorgroup/env` sul VPS | ❌ **da fare** — nessun accesso SSH al VPS |
| 5 | Verifica end-to-end | ❌ dopo il punto 4 |

Restano ~10 minuti di lavoro manuale: i passi 3 e 4 non sono automatizzabili.
Il **consumer key** è già stato generato dall'org ed è leggibile con:

```sh
sf project retrieve start \
  --metadata ExtlClntAppGlobalOauthSettings:Velior_Website_Lead_Intake \
  --target-org VELIOR_GROUP_PROD
```

Il **consumer secret** non compare mai in un retrieve: si legge solo da Setup.

---

## 1. Deploy dei metadata (org VELIOR_GROUP_PROD) — ✅ fatto

Dal repo `~/WORKSPACE/SALESFORCE/VELIOR_GROUP`:

```sh
sf project deploy start \
  --source-dir force-app/main/default/externalClientApps \
  --source-dir force-app/main/default/extlClntAppGlobalOauthSets \
  --source-dir force-app/main/default/extlClntAppOauthSettings \
  --source-dir force-app/main/default/permissionsets/Velior_Website_Lead_Intake.permissionset-meta.xml \
  --target-org VELIOR_GROUP_PROD
```

Perché una External Client App e non una Connected App: da Spring '26 la
creazione di nuove Connected App è disabilitata di default.

## 2. Utente di integrazione — ✅ creato

Non usare un utente umano né un amministratore: se il segreto del sito viene
compromesso, l'attaccante eredita i permessi di quell'utente.

L'org aveva **5 licenze "Salesforce Integration" libere** — gratuite e nate
esattamente per questo caso. L'utente creato:

| Campo | Valore |
|---|---|
| Username | `website.integration@veliorgroup.com.pbo` |
| Id | `005WV000007M3knYAC` |
| Profile | `Minimum Access - API Only Integrations` |
| Licenza | Salesforce Integration |

**Da verificare:** l'assegnazione del permission set via CLI ha restituito un
errore, mentre una query su `PermissionSetAssignment` mostra un'assegnazione
con un nome non risolto. Controlla in Setup → Users → *Website Integration* →
Permission Set Assignments che `Velior Website Lead Intake` sia presente, e in
caso contrario assegnalo dalla UI.

Comando CLI (se si preferisce riprovare da terminale):

```sh
sf org assign permset -n Velior_Website_Lead_Intake \
  -b website.integration@veliorgroup.com.pbo -o VELIOR_GROUP_PROD
```

## 3. Abilitare client credentials e prendere le chiavi — ❌ da fare

Questi flag **non sono impostabili via Metadata API**: l'org li riporta a
`false` a ogni deploy, per design. Vanno attivati dalla UI.

Setup → **External Client Apps** → *Velior Website Lead Intake* → Policies → Edit:

1. **Enable Client Credentials Flow** → ON
2. **Run As** → `website.integration@veliorgroup.com.pbo`
3. Salva

Poi Settings → OAuth Settings → **Consumer Key and Secret**: copia i due valori.

> Il consumer key non si può impostare via metadata, viene generato dall'org
> dopo il primo deploy. Il secret non è esposto da nessuna API: solo da Setup.

Scorciatoia per aprire la pagina:

```sh
sf org open -o VELIOR_GROUP_PROD -p /lightning/setup/ExternalClientAppManager/home
```

## 4. Configurare il server di produzione

Sul VPS, come root:

```sh
# Cartella di spool persistente (NON /tmp: il unit ha PrivateTmp=true e
# ogni restart svuoterebbe la coda dei lead)
install -d -o web -g web -m 750 /var/lib/veliorgroup/leads

# File dei segreti, fuori dal repo e fuori dagli slot di deploy
install -d -o root -g root -m 755 /etc/veliorgroup
touch /etc/veliorgroup/env
chown root:web /etc/veliorgroup/env
chmod 640 /etc/veliorgroup/env
```

Scrivi in `/etc/veliorgroup/env` (schema completo in `.env.example`):

```sh
SF_CLIENT_ID=<consumer key dal punto 3>
SF_CLIENT_SECRET=<consumer secret dal punto 3>
SF_LOGIN_URL=https://login.salesforce.com
SF_API_VERSION=v65.0
LEAD_SPOOL_DIR=/var/lib/veliorgroup/leads
```

Aggiorna il systemd unit e riavvia:

```sh
cp deploy/systemd/veliorgroup.service /etc/systemd/system/veliorgroup.service
systemctl daemon-reload
systemctl restart veliorgroup
systemctl status veliorgroup --no-pager
```

## 5. Verifica end-to-end

```sh
curl -sS -X POST https://veliorgroup.com/api/contact \
  -H 'Content-Type: application/json' \
  -d '{"name":"Test Lead","email":"test@example.com","company":"Test Srl",
       "message":"Verifica end-to-end del form di contatto.","crm":"hubspot"}'
```

- Risposta `{"ok":true,"id":"00Q..."}` → il lead è **in Salesforce**. ✅
- Risposta `{"ok":true,"queued":true}` → il lead è **nello spool**, Salesforce
  non ha risposto. Il motivo è nel log:

```sh
journalctl -u veliorgroup -n 50 --no-pager
ls -l /var/lib/veliorgroup/leads
```

Controlla il record nell'org:

```sh
sf data query -o VELIOR_GROUP_PROD \
  -q "SELECT Id, Name, Company, Email, LeadSource, Description FROM Lead WHERE Email='test@example.com'"
```

Verifica che il campo `Description` inizi con `CRM in use: hubspot` — è la
risposta di qualifica, la ragione per cui il form esiste. Poi cancella il lead
di test.

## 6. Recuperare i lead in coda

Se durante un disservizio dei lead sono finiti nello spool, ogni file è un JSON
con il payload completo: si reinseriscono a mano da Setup o con `sf data import`.
Controllare la cartella dopo ogni incidente:

```sh
ls -l /var/lib/veliorgroup/leads
```

---

## Rischi accettati

- **OWD di Lead** = `ReadWriteTransfer` (interno). Salesforce impone Read
  insieme a Create, quindi l'utente di integrazione può leggere tutti i lead,
  non solo i propri. Se il segreto trapela l'attaccante può leggere la base
  lead. Mitigazione strutturale: portare l'OWD di Lead a Private.
- **Rate limit in memoria** (5 invii per IP / 10 min) — sufficiente con un solo
  processo Node; va spostato su Redis se il sito viene scalato orizzontalmente.
