# Lead intake — setup Salesforce + produzione

Runbook per collegare il form di `veliorgroup.com` all'org `VELIOR_GROUP_PROD`.
Finché non è completato il form **funziona lo stesso**: ogni lead viene scritto
su disco in `LEAD_SPOOL_DIR` invece che nel CRM, quindi non si perde nulla — ma
non arriva niente in Salesforce.

Tempo stimato: ~20 minuti.

---

## 1. Deploy dei metadata (org VELIOR_GROUP_PROD)

Dal repo `~/WORKSPACE/SALESFORCE/VELIOR_GROUP`:

```sh
sf project deploy start \
  --source-dir force-app/main/default/externalClientApps \
  --source-dir force-app/main/default/extlClntAppGlobalOauthSets \
  --source-dir force-app/main/default/extlClntAppOauthSettings \
  --source-dir force-app/main/default/permissionsets/Velior_Website_Lead_Intake.permissionset-meta.xml \
  --target-org VELIOR_GROUP_PROD
```

Il dry-run di questi 4 componenti è già stato validato con successo.

Perché una External Client App e non una Connected App: da Spring '26 la
creazione di nuove Connected App è disabilitata di default.

## 2. Creare l'utente di integrazione

Non usare un utente umano né un amministratore: se il segreto del sito viene
compromesso, l'attaccante eredita i permessi di quell'utente.

L'org ha **5 licenze "Salesforce Integration" libere** (0 usate su 5) — sono
gratuite e nate esattamente per questo caso.

Setup → Users → New User:

| Campo | Valore |
|---|---|
| Last Name | `Website Integration` |
| Username | `website@veliorgroup.com.pbo` (qualsiasi, purché univoco) |
| User License | **Salesforce Integration** |
| Profile | `Salesforce API Only System Integrations` |

Poi assegna il permission set:

```sh
sf org assign permset -n Velior_Website_Lead_Intake \
  -b website@veliorgroup.com.pbo -o VELIOR_GROUP_PROD
```

## 3. Abilitare client credentials e prendere le chiavi

Setup → **External Client Apps** → *Velior Website Lead Intake* → Policies → Edit:

1. **Enable Client Credentials Flow** → ON
2. **Run As** → l'utente di integrazione creato al punto 2
3. Salva

Poi Settings → OAuth Settings → **Consumer Key and Secret**: copia i due valori.

> Il consumer key non si può impostare via metadata, viene generato dall'org
> dopo il primo deploy. Vanno letti da Setup.

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
