# Lead intake — setup Salesforce + produzione

Runbook per collegare il form di `veliorgroup.com` all'org `VELIOR_GROUP_PROD`.
Finché non è completato il form **funziona lo stesso**: ogni lead viene scritto
su disco in `LEAD_SPOOL_DIR` invece che nel CRM, quindi non si perde nulla — ma
non arriva niente in Salesforce.

## Stato attuale

| # | Passo | Stato |
|---|---|---|
| 1 | Deploy metadata su `VELIOR_GROUP_PROD` | ✅ fatto (deploy `0AfWV000009KmJR0A0`) |
| 2 | Utente di integrazione | ✅ creato — `website.integration@veliorgroup.com.pbo` (`005WV000007M3knYAC`) |
| 2b | Permission set + permission set license | ✅ assegnati |
| 3 | Client credentials flow + Run As | ✅ fatto da CLI (non serve la UI) |
| 4 | Consumer secret → `/etc/veliorgroup/env` sul VPS | ❌ **da fare a mano** |
| 5 | Verifica end-to-end | ❌ dopo il punto 4 |

Manca solo il punto 4. Il **consumer key** è già stato generato dall'org:

```sh
sf project retrieve start \
  --metadata ExtlClntAppGlobalOauthSettings:Velior_Website_Lead_Intake \
  --target-org VELIOR_GROUP_PROD
```

(Attenzione: quel retrieve riscrive il file sorgente includendo la chiave e
cancellando i commenti — non committarlo così.)

Il **consumer secret** invece non è esposto da nessuna API: né Metadata né
Tooling (`ExternalClientApplication` non è un tipo Tooling). Si legge solo da
Setup, ed è una scelta di sicurezza della piattaforma.

---

## 1. Deploy dei metadata (org VELIOR_GROUP_PROD) — ✅ fatto

Dal repo `~/WORKSPACE/SALESFORCE/VELIOR_GROUP`:

```sh
sf project deploy start \
  --source-dir force-app/main/default/externalClientApps \
  --source-dir force-app/main/default/extlClntAppGlobalOauthSets \
  --source-dir force-app/main/default/extlClntAppOauthSettings \
  --source-dir force-app/main/default/extlClntAppOauthPolicies \
  --source-dir force-app/main/default/permissionsets/Velior_Website_Lead_Intake.permissionset-meta.xml \
  --target-org VELIOR_GROUP_PROD
```

Perché una External Client App e non una Connected App: da Spring '26 la
creazione di nuove Connected App è disabilitata di default.

## 2. Utente di integrazione — ✅ creato

Non usare un utente umano né un amministratore: se il segreto del sito viene
compromesso, l'attaccante eredita i permessi di quell'utente.

| Campo | Valore |
|---|---|
| Username | `website.integration@veliorgroup.com.pbo` |
| Id | `005WV000007M3knYAC` |
| Profile | `Minimum Access - API Only Integrations` |
| Licenza | Salesforce Integration (5 disponibili nell'org, gratuite) |

**Serve una permission set license**, altrimenti l'assegnazione del permission
set fallisce con `FIELD_INTEGRITY_EXCEPTION: The user license doesn't allow the
permission: Create Lead`. La licenza Salesforce Integration da sola non
consente l'accesso agli oggetti standard:

```sh
# 1. permission set license (Salesforce API Integration)
sf api request rest "/services/data/v65.0/sobjects/PermissionSetLicenseAssign" \
  --method POST --target-org VELIOR_GROUP_PROD \
  --body '{"AssigneeId":"005WV000007M3knYAC","PermissionSetLicenseId":"0PLWV000000QEKR4A4"}'

# 2. permission set
sf org assign permset -n Velior_Website_Lead_Intake \
  -b website.integration@veliorgroup.com.pbo -o VELIOR_GROUP_PROD
```

## 3. Client credentials flow e Run As — ✅ fatto da CLI

Si configura interamente da source. Servono **due** file, entrambi necessari:

- `extlClntAppGlobalOauthSets/…ecaGlblOauth-meta.xml` → `isClientCredentialsFlowEnabled` (interruttore a livello di app)
- `extlClntAppOauthPolicies/…ecaOauthPlcy-meta.xml` → `isClientCredentialsFlowEnabled` **e** `clientCredentialsFlowUser` (il Run As)

```xml
<clientCredentialsFlowUser>website.integration@veliorgroup.com.pbo</clientCredentialsFlowUser>
<isClientCredentialsFlowEnabled>true</isClientCredentialsFlowEnabled>
```

Verificato con un retrieve dall'org dopo il deploy.

> Il file delle policy non esiste finché non si fa il primo deploy dell'app:
> viene generato dall'org e va recuperato con
> `sf project retrieve start --metadata ExtlClntAppOauthConfigurablePolicies --target-org VELIOR_GROUP_PROD`.

Per aprire comunque la pagina in Setup:

```sh
sf org open -o VELIOR_GROUP_PROD -p /lightning/setup/ExternalClientAppManager/home
```

## 4. Configurare il server di produzione — ❌ da fare

Prendi il **consumer secret** da Setup → External Client Apps → *Velior Website
Lead Intake* → Settings → OAuth Settings → *Consumer Key and Secret*. È l'unico
valore che nessuna API espone.

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
