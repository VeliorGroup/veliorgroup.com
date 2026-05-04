# Velior Group

Marketing site for Velior Group — CRM, Automation & AI.

## Stack

- **Next.js 16** (App Router, static export)
- **React 19**
- **TypeScript 5**
- Vanilla CSS (preserved from previous v2 design system)
- Node.js 22 LTS

The build outputs a fully static site to `out/`, which can be served by any HTTP host (Hostinger shared, Premium, Cloud, or VPS).

## Structure

```
.
├── src/
│   ├── app/                # App router pages + globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx        # Home
│   │   ├── about/page.tsx
│   │   ├── services/page.tsx
│   │   └── contact/page.tsx
│   ├── components/         # Nav, Footer, atoms, sections
│   └── lib/                # copy.ts (i18n), lang.tsx (provider), router.tsx
├── public/                 # Static assets served at root
│   ├── .htaccess           # Apache config (HTTPS, gzip, cache, MIME)
│   ├── assets/             # Logo
│   └── uploads/
├── _legacy/                # Original static React-CDN version (reference)
├── .github/
│   ├── dependabot.yml      # Auto-update deps (weekly)
│   └── workflows/          # CI + Hostinger FTP deploy
├── next.config.ts
├── tsconfig.json
└── package.json
```

## Local development

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # static export → out/
npm run lint
npm run typecheck
```

## Deploy — Hostinger

The build produces a fully static site in `out/`. Three options:

### Option A — GitHub Actions FTP (automatic on push)

Add these secrets in **GitHub repo → Settings → Secrets and variables → Actions**:

| Secret                    | Example value                  |
|---------------------------|--------------------------------|
| `HOSTINGER_FTP_HOST`      | `ftp.veliorgroup.com`          |
| `HOSTINGER_FTP_USER`      | `u123456789.veliorgroup`       |
| `HOSTINGER_FTP_PASSWORD`  | (FTP account password)         |
| `HOSTINGER_FTP_PATH`      | `/public_html/`                |

FTP credentials live in **hPanel → Files → FTP Accounts**.

Every push to `main` runs `.github/workflows/deploy-hostinger.yml`: builds and uploads `out/` via FTP.

### Option B — Hostinger Git deployment

In hPanel → **Advanced → Git**:

- Repository: `https://github.com/VeliorGroup/veliorgroup.com.git`
- Branch: `main`
- Install path: `public_html`

Then add a build step to run `npm ci && npm run build` and serve `out/` (only available on plans with Node.js / SSH access). Otherwise prefer Option A.

### Option C — manual upload

```bash
npm run build
# Drag the contents of out/ (NOT the folder itself) into public_html/ via hPanel File Manager.
```

## Auto-updates

`.github/dependabot.yml` opens grouped weekly PRs against `main` for:

- Next.js + eslint-config-next
- React + types
- Other dev deps (minor/patch)
- GitHub Actions versions

Merge the PR — CI runs lint + typecheck + build before deploy is allowed.

## Routes

- `/` Home
- `/about/`
- `/services/`
- `/contact/`
- 404 → `/404.html` (configured in `.htaccess`)

The site is bilingual EN/IT — language is selected by the user (toolbar toggle) and persisted in `localStorage`.

## License

Proprietary — © Velior Group.
