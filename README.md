# Velior Group

Marketing site for Velior Group — CRM, Automation & AI.

## Stack

- **Next.js 16** (App Router, `output: "standalone"`)
- **React 19**
- **TypeScript 5**
- **Node.js 22 LTS**
- Vanilla CSS (preserved from previous v2 design system)

The build outputs a self-contained Node.js server in `.next/standalone/server.js`. Designed for a Linux VPS with nginx + systemd.

## Structure

```
.
├── src/
│   ├── app/                # App router pages + globals.css
│   ├── components/         # Nav, Footer, atoms, sections
│   └── lib/                # copy.ts (i18n), lang.tsx, router.tsx
├── public/                 # Static assets served at root
├── deploy/
│   ├── systemd/            # systemd unit file
│   ├── nginx/              # nginx site config
│   ├── scripts/            # Blue/green build, switch, rollback
│   └── github-workflows/   # Optional GH Actions templates
├── _legacy/                # Original static React-CDN site (reference)
├── .github/dependabot.yml  # Auto-update deps weekly
├── next.config.ts
├── tsconfig.json
└── package.json
```

## Local development

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # standalone output in .next/standalone
npm run start        # node .next/standalone/server.js
npm run lint
npm run typecheck
```

---

## Deploy — Hostinger VPS (Ubuntu 22.04 / 24.04)

The repo includes a blue/green deploy: two slots (`veliorgroup-a`, `veliorgroup-b`) and a `veliorgroup-live` symlink swapped atomically. Service stays up during build.

### 1. Provision the VPS

SSH in as root.

```bash
# System update + base packages
apt update && apt -y dist-upgrade
apt -y install nginx git ufw

# Snap + certbot for HTTPS
snap install --classic certbot
ln -s /snap/bin/certbot /usr/bin/certbot

# Node.js 22 LTS via NodeSource
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt -y install nodejs
node -v && npm -v

# Firewall
ufw allow OpenSSH
ufw allow "Nginx Full"
ufw --force enable
```

### 2. Create the `web` user + dirs

```bash
useradd -m -s /bin/bash web
mkdir -p /var/log/veliorgroup
chown web:web /var/log/veliorgroup

# Allow `web` to restart the service without a password
echo 'web ALL=(root) NOPASSWD: /usr/sbin/service veliorgroup restart' \
    > /etc/sudoers.d/veliorgroup
chmod 440 /etc/sudoers.d/veliorgroup
```

Switch to `web`:

```bash
sudo -iu web
```

Generate an SSH key and add it as a deploy key on the GitHub repo (read-only is enough):

```bash
ssh-keygen -t ed25519 -C "veliorgroup-vps" -f ~/.ssh/id_ed25519 -N ""
cat ~/.ssh/id_ed25519.pub
# → paste in GitHub → repo Settings → Deploy keys → Add key
```

Sanity-check:

```bash
ssh -T git@github.com   # should greet you by username
```

### 3. Install the deploy scripts + service + nginx config

Back as **root**:

```bash
# Clone once to bootstrap the scripts
sudo -u web git clone https://github.com/VeliorGroup/veliorgroup.com.git /home/web/veliorgroup-a

# Install scripts
install -m 0755 /home/web/veliorgroup-a/deploy/scripts/veliorgroup-build    /usr/local/bin/
install -m 0755 /home/web/veliorgroup-a/deploy/scripts/veliorgroup-switch   /usr/local/bin/
install -m 0755 /home/web/veliorgroup-a/deploy/scripts/veliorgroup-rollback /usr/local/bin/

# systemd unit
install -m 0644 /home/web/veliorgroup-a/deploy/systemd/veliorgroup.service /etc/systemd/system/
systemctl daemon-reload

# nginx site
install -m 0644 /home/web/veliorgroup-a/deploy/nginx/veliorgroup.com.conf /etc/nginx/sites-available/
ln -sf /etc/nginx/sites-available/veliorgroup.com.conf /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx
```

### 4. First build

```bash
sudo -iu web /usr/local/bin/veliorgroup-build
```

The script:
1. Builds the inactive slot (`veliorgroup-b` on first run).
2. Copies static + public into the standalone output.
3. Hands off to `veliorgroup-switch`, which symlinks `/home/web/veliorgroup-live` → the new build and restarts the service.

Enable on boot:

```bash
systemctl enable --now veliorgroup
systemctl status veliorgroup
```

Hit the site over plain HTTP via the VPS IP — nginx should proxy to the Node app on `127.0.0.1:3000`.

### 5. SSL

Point `veliorgroup.com` and `www.veliorgroup.com` DNS to the VPS IP, wait for propagation, then:

```bash
certbot --nginx -d veliorgroup.com -d www.veliorgroup.com
```

Certbot rewrites the nginx config for HTTPS and adds a renewal timer.

### 6. Deploys after the first one

```bash
# Deploy current main:
sudo -iu web /usr/local/bin/veliorgroup-build

# Roll back to the previous slot:
sudo -iu web /usr/local/bin/veliorgroup-rollback

# Logs:
journalctl -u veliorgroup -f
tail -f /var/log/veliorgroup/app.log
```

### 7. Optional — auto-deploy on push

Two ways:

**a) GitHub Actions (recommended).** Copy `deploy/github-workflows/deploy-vps.yml` to `.github/workflows/` and add these repo secrets:

| Secret         | Value                                  |
|----------------|----------------------------------------|
| `VPS_HOST`     | VPS IP or hostname                     |
| `VPS_USER`     | `web`                                  |
| `VPS_PORT`     | `22` (or your custom port)             |
| `VPS_SSH_KEY`  | private key with deploy access on VPS  |

The workflow SSHs in and runs `veliorgroup-build`.

**b) Cron / GitHub webhook.** Run `veliorgroup-build` on a 5-minute timer, or expose a tiny webhook receiver that triggers the script on `push` events.

---

## Auto-update of dependencies

`.github/dependabot.yml` opens grouped weekly PRs against `main` for:

- Next.js + eslint-config-next
- React + types
- Other dev deps (minor / patch)

Merge the PR after CI is green; the next deploy picks the new versions up automatically.

## Routes

- `/` Home
- `/about`
- `/services`
- `/contact`

Bilingual EN/IT — language is selected by the user (toolbar toggle) and persisted in `localStorage`.

## License

Proprietary — © Velior Group.
