# Velior Group

Static marketing site for Velior Group — CRM, Automation & AI.

## Stack

- Plain HTML + CSS
- React 18 (UMD via CDN)
- Babel Standalone (in-browser JSX transform)
- No build step

## Structure

```
.
├── index.html              # Main app (hash routing: home/about/services/contact)
├── index-print.html        # Print-friendly variant (auto print on load)
├── assets/                 # Logo & static images
├── uploads/                # User-uploaded media
├── scripts/
│   ├── content.js          # i18n copy (en)
│   ├── components.jsx      # Shared UI components
│   ├── page-home.jsx       # Home page
│   ├── pages.jsx           # About / Services / Contact pages
│   └── tweaks-panel.jsx    # Dev tweaks panel
└── styles/
    ├── tokens.css          # Design tokens
    └── site.css            # Site styles
```

## Local development

Open `index.html` via any static server (Babel Standalone needs HTTP, not `file://`):

```bash
python3 -m http.server 8000
# or
npx serve .
```

Then visit http://localhost:8000

## Deploy — Hostinger

1. Push to GitHub (this repo).
2. Hostinger hPanel → **Websites** → choose domain → **File Manager**.
3. Upload contents of repo into `public_html/` (or use **Git** integration in hPanel pointing to this repo, branch `main`, install path `public_html`).
4. `.htaccess` is included for compression, caching, and HTTPS redirect.

### Git deployment (recommended)

In Hostinger hPanel:
- **Advanced → Git** → Create repository
- Repository address: `https://github.com/VeliorGroup/veliorgroup.com.git`
- Branch: `main`
- Install path: `public_html`
- Enable auto-deployment webhook (paste webhook URL in GitHub repo Settings → Webhooks).

## Notes

- Babel in-browser is fine for low-traffic marketing sites; for production scale, precompile JSX with esbuild/Vite.
- Hash routing means deep links work without server rewrites.
