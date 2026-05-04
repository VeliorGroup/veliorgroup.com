// Velior v2 — Shared atoms, dark-mode-first
const { useState, useEffect, useRef } = React;

// === LOGO MARK — uses the actual brand logo ===
const VeliorMark = ({ size = 22 }) => (
  <a href="#home" className="velior-mark" data-route="home"
     onClick={(e) => { e.preventDefault(); window.location.hash = "home"; window.scrollTo({top:0}); }}
     style={{ fontSize: size }}>
    <img src="assets/velior-logo.webp" alt="Velior" style={{ height: size + 10, width: "auto", filter: "brightness(1.15)" }} />
  </a>
);

// === SF Partner Badge ===
const SalesforcePartnerBadge = ({ compact = false }) => (
  <div className="sf-badge" style={compact ? { padding: "8px 12px" } : undefined}>
    <svg width="22" height="16" viewBox="0 0 32 22" fill="none">
      <path d="M19.5 3.8c1.4-1.5 3.4-2.4 5.6-2.4 3 0 5.6 1.7 6.9 4.1.7-.3 1.5-.5 2.3-.5 3.1 0 5.7 2.6 5.7 5.7 0 3.2-2.6 5.7-5.7 5.7-.4 0-.8 0-1.1-.1-.7 1.7-2.5 2.9-4.5 2.9-.9 0-1.7-.2-2.4-.6-1.3 2.1-3.6 3.5-6.3 3.5-2.7 0-5.1-1.5-6.4-3.7-.6.1-1.2.2-1.8.2-4.5 0-8.1-3.7-8.1-8.2 0-3 1.6-5.6 4-7-1.5-3.4 1-7.4 4.7-7.4 2.3 0 4.3 1.4 5.1 3.4 1-1.7 2.9-2.9 5-2.9 1.5 0 2.8.6 3.8 1.5z"
            transform="translate(-2 1) scale(0.85)" fill="#00A1E0"/>
    </svg>
    <div className="sf-badge-text">
      <div className="sf-badge-k">Salesforce</div>
      <div className="sf-badge-v">Consulting Partner</div>
    </div>
  </div>
);

// === Nav ===
const Nav = ({ route, setRoute, lang, setLang, t }) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    ["home", t.nav.home],
    ["about", t.nav.about],
    ["services", t.nav.services],
    ["contact", t.nav.contact]
  ];

  return (
    <header className={`nav ${scrolled ? "nav-scrolled" : ""}`}>
      <div className="nav-inner container">
        <VeliorMark />
        <nav className="nav-pill">
          {navItems.map(([k, label]) => (
            <a key={k} href={`#${k}`}
               onClick={(e) => { e.preventDefault(); setRoute(k); }}
               className={`nav-link ${route === k ? "active" : ""}`}>
              {label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <button className="lang-toggle" onClick={() => setLang(lang === "en" ? "it" : "en")}>
            <span className={lang === "en" ? "active" : ""}>EN</span>
            <span className="lang-divider">/</span>
            <span className={lang === "it" ? "active" : ""}>IT</span>
          </button>
          <button className="btn btn-gradient nav-cta" onClick={() => setRoute("contact")}>
            {t.nav.cta}
          </button>
          <button className="nav-burger" onClick={() => setOpen(!open)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </div>
      {open && (
        <div className="nav-mobile">
          {navItems.map(([k, label]) => (
            <a key={k} href={`#${k}`}
               onClick={(e) => { e.preventDefault(); setRoute(k); setOpen(false); }}
               className={`nav-mobile-link ${route === k ? "active" : ""}`}>
              {label}
            </a>
          ))}
          <button className="btn btn-gradient" style={{marginTop:16}} onClick={() => { setRoute("contact"); setOpen(false); }}>
            {t.nav.cta}
          </button>
        </div>
      )}
    </header>
  );
};

// === Footer ===
const Footer = ({ t, setRoute }) => (
  <footer className="footer">
    <div className="container footer-inner">
      <div>
        <VeliorMark size={24} />
        <p className="footer-tagline">{t.footer.tagline}</p>
        <SalesforcePartnerBadge compact />
      </div>
      <div className="footer-cols">
        {t.footer.sections.map((s, i) => (
          <div key={i} className="footer-col">
            <div className="footer-col-title">{s.t}</div>
            {s.l.map(([label, route], j) => (
              <a key={j} href={`#${route}`}
                 onClick={(e) => { e.preventDefault(); setRoute(route); }}
                 className="footer-link">{label}</a>
            ))}
          </div>
        ))}
        <div className="footer-col">
          <div className="footer-col-title">{t.ui.contact}</div>
          <a className="footer-link" href="mailto:info@veliorgroup.com">info@veliorgroup.com</a>
          <a className="footer-link" href="#">LinkedIn</a>
          <a className="footer-link" href="#">Instagram</a>
        </div>
      </div>
    </div>
    <div className="container footer-bottom">
      <span className="small">{t.footer.legal}</span>
      <div className="footer-bottom-links">
        <a href="#" className="small">{t.footer.privacy}</a>
        <a href="#" className="small">{t.footer.cookies}</a>
      </div>
    </div>
    <div className="footer-wordmark">VELIOR</div>
  </footer>
);

// === Reveal ===
const Reveal = ({ children, delay = 0, as: Tag = "div", className = "", scale = false, ...rest }) => {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setTimeout(() => setShown(true), delay);
        obs.disconnect();
      }
    }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return <Tag ref={ref} className={`reveal ${scale ? "reveal-scale" : ""} ${shown ? "in" : ""} ${className}`} {...rest}>{children}</Tag>;
};

// === Eyebrow ===
const Eyebrow = ({ children }) => (
  <div className="eyebrow">{children}</div>
);

// === Section heading ===
const SectionHeading = ({ eyebrow, title, lede, align = "left" }) => (
  <div style={{ textAlign: align, maxWidth: align === "center" ? 720 : 840, margin: align === "center" ? "0 auto" : 0 }}>
    {eyebrow && <Reveal><Eyebrow>{eyebrow}</Eyebrow></Reveal>}
    {title && (
      <Reveal delay={80}>
        <h2 className="h1" style={{ marginTop: 20, marginBottom: 0 }}>
          {title}
        </h2>
      </Reveal>
    )}
    {lede && (
      <Reveal delay={160}>
        <p className="lede" style={{ marginTop: 24, marginLeft: align === "center" ? "auto" : 0, marginRight: align === "center" ? "auto" : 0 }}>
          {lede}
        </p>
      </Reveal>
    )}
  </div>
);

// === Arrow ===
const Arrow = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
    <path d="M2 7 H12 M8 3 L12 7 L8 11" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// === Service icons (geometric, glowing) ===
const ServiceIcon = ({ kind }) => {
  const icons = {
    salesforce: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M3 6 L9 6 M3 12 L21 12 M3 18 L15 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="13" cy="6" r="2" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="19" cy="18" r="2" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    automation: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 3 L12 7 M12 17 L12 21 M3 12 L7 12 M17 12 L21 12 M5.6 5.6 L8.4 8.4 M15.6 15.6 L18.4 18.4 M5.6 18.4 L8.4 15.6 M15.6 8.4 L18.4 5.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    fullstack: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M9 8 L5 12 L9 16 M15 8 L19 12 L15 16 M13 6 L11 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    ai: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="5" y="5" width="14" height="14" rx="3" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="9" cy="10" r="1" fill="currentColor"/>
        <circle cx="15" cy="10" r="1" fill="currentColor"/>
        <path d="M9 14 Q12 16 15 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        <path d="M2 9 L5 9 M2 15 L5 15 M19 9 L22 9 M19 15 L22 15 M9 2 L9 5 M15 2 L15 5 M9 19 L9 22 M15 19 L15 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    )
  };
  return icons[kind] || null;
};

// === Tech logos (inline SVG, brand-accurate marks) ===
const TechLogo = ({ kind }) => {
  const L = {
    salesforce: <svg viewBox="0 0 32 22" fill="#00A1E0"><path d="M13.3 2.4c1-1 2.3-1.6 3.8-1.6 2 0 3.7 1.1 4.6 2.7.8-.4 1.7-.6 2.7-.6 3.5 0 6.4 2.9 6.4 6.4 0 .9-.2 1.7-.5 2.5 1.1.5 1.8 1.6 1.8 2.9 0 1.7-1.4 3.1-3.1 3.1-.2 0-.4 0-.6-.1-.6 2.2-2.6 3.8-5 3.8-1 0-1.9-.3-2.7-.8-.8 1.7-2.5 2.8-4.5 2.8s-3.8-1.2-4.6-2.9c-.5.1-1 .2-1.6.2-2.4 0-4.4-1.8-4.7-4.1C2.6 16.1 1 14.4 1 12.3c0-1.4.7-2.7 1.8-3.4-.2-.5-.4-1.1-.4-1.7C2.4 4.5 4.5 2.4 7 2.4c1.5 0 2.7.7 3.5 1.7.7-1 1.8-1.7 3.1-1.7"/></svg>,
    salescloud: <svg viewBox="0 0 24 24" fill="#0070D2"><path d="M5 6h14v3H5zm0 5h14v3H5zm0 5h10v3H5z"/></svg>,
    servicecloud: <svg viewBox="0 0 24 24" fill="#FF9A3C"><path d="M12 3a9 9 0 100 18 9 9 0 000-18zm0 14a5 5 0 110-10 5 5 0 010 10z"/></svg>,
    marketingcloud: <svg viewBox="0 0 24 24" fill="#FE5C34"><path d="M3 6l9 12 9-12-9 4z"/></svg>,
    datacloud: <svg viewBox="0 0 24 24" fill="#032E61"><ellipse cx="12" cy="6" rx="8" ry="2.5"/><path d="M4 12c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5V6c0 1.4-3.6 2.5-8 2.5S4 7.4 4 6zm0 6c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5v-6c0 1.4-3.6 2.5-8 2.5s-8-1.1-8-2.5z"/></svg>,
    agentforce: <svg viewBox="0 0 24 24" fill="none" stroke="#00A1E0" strokeWidth="1.6"><rect x="5" y="7" width="14" height="12" rx="2"/><circle cx="9.5" cy="12" r="1" fill="#00A1E0"/><circle cx="14.5" cy="12" r="1" fill="#00A1E0"/><path d="M12 3v4M9 19l-1 2M15 19l1 2"/></svg>,
    tableau: <svg viewBox="0 0 24 24" fill="#E8762D"><path d="M11 1h2v3.5h3.5v2H13V11h-2V6.5H7.5v-2H11V1zm0 12h2v3.5h3.5v2H13V22h-2v-3.5H7.5v-2H11V13zM2 9.5h3v-2H2v2zm17 0h3v-2h-3v2zM2 16.5h3v-2H2v2zm17 0h3v-2h-3v2z"/></svg>,
    mulesoft: <svg viewBox="0 0 24 24" fill="#00A0DF"><path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 3l6 3-6 3-6-3 6-3zm-6 5l5 2.5V19l-5-2.5V10zm12 0v6.5L13 19v-6.5l5-2.5z"/></svg>,
    n8n: <svg viewBox="0 0 24 24" fill="#EA4B71"><circle cx="6" cy="12" r="3"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M9 12h6M15.5 7.5L12 12M15.5 16.5L12 12" stroke="#EA4B71" strokeWidth="1.5" fill="none"/></svg>,
    make: <svg viewBox="0 0 24 24" fill="#6D00CC"><path d="M5 4h3v16H5zm5.5 0h3v16h-3zm5.5 0h3v16h-3z"/></svg>,
    nextjs: <svg viewBox="0 0 24 24" fill="#fff"><circle cx="12" cy="12" r="10" fill="#000"/><path d="M9 7v10M9 7l8 10" stroke="#fff" strokeWidth="1.6" fill="none"/><path d="M15 7v6" stroke="#fff" strokeWidth="1.6"/></svg>,
    angular: <svg viewBox="0 0 24 24" fill="#DD0031"><path d="M12 2L3 5l1.5 12L12 22l7.5-5L21 5 12 2zm0 3l5.5 12.5h-2L14 15h-4l-1.5 2.5h-2L12 5zm-1.5 8h3L12 9.5 10.5 13z"/></svg>,
    vue: <svg viewBox="0 0 24 24" fill="#41B883"><path d="M2 4h4l6 10 6-10h4L12 21 2 4zm5 0h3l2 3.3L14 4h3l-5 8.5L7 4z"/></svg>,
    tailwind: <svg viewBox="0 0 24 24" fill="#06B6D4"><path d="M12 4.5c-3 0-4.9 1.5-5.5 4.5 1-1.5 2.1-2 3.5-1.7 1 .3 1.6.9 2.4 1.7 1.3 1.3 2.7 2.8 5.6 2.8 3 0 4.9-1.5 5.5-4.5-1 1.5-2.1 2-3.5 1.7-1-.3-1.6-.9-2.4-1.7-1.3-1.4-2.7-2.8-5.6-2.8zM6.5 12c-3 0-4.9 1.5-5.5 4.5 1-1.5 2.1-2 3.5-1.7 1 .3 1.6.9 2.4 1.7 1.3 1.3 2.7 2.8 5.6 2.8 3 0 4.9-1.5 5.5-4.5-1 1.5-2.1 2-3.5 1.7-1-.3-1.6-.9-2.4-1.7-1.3-1.4-2.7-2.8-5.6-2.8z"/></svg>,
    nodejs: <svg viewBox="0 0 24 24" fill="#5FA04E"><path d="M12 2L3 7v10l9 5 9-5V7l-9-5zm-2 16c-2 0-3-1-3-2.5h2c0 .5.4.8 1 .8s1-.3 1-.8c0-.7-.7-.9-1.7-1.3-1.4-.5-2.3-1-2.3-2.4s1.1-2.3 2.7-2.3c1.7 0 2.6 1 2.6 2.4h-2c0-.6-.3-.8-.8-.8s-.7.3-.7.6c0 .5.5.8 1.4 1.1 1.6.5 2.6 1 2.6 2.6 0 1.6-1.2 2.6-2.8 2.6zm6.7-.3c-.4.2-.7.3-1.3.3-1.4 0-2.4-1-2.4-2.7v-5h2v5c0 .6.2.9.7.9.2 0 .4 0 .5-.1l.5 1.6z"/></svg>,
    fastapi: <svg viewBox="0 0 24 24" fill="#009688"><circle cx="12" cy="12" r="10"/><path d="M11 5l-4 8h4l-1 6 5-8h-4l1-6z" fill="#fff"/></svg>,
    python: <svg viewBox="0 0 24 24"><path d="M12 2c-3 0-3 1-3 2v2h6v1H6c-2 0-3 1.5-3 4s1 4 3 4h2v-2c0-2 1-3 3-3h4c1.5 0 3-1 3-3V4c0-1-1-2-3-2h-3zm-3 2.5a1 1 0 110 2 1 1 0 010-2z" fill="#3776AB"/><path d="M12 22c3 0 3-1 3-2v-2H9v-1h6c2 0 3-1.5 3-4s-1-4-3-4h-2v2c0 2-1 3-3 3H6c-1.5 0-3 1-3 3v3c0 1 1 2 3 2h3zm3-2.5a1 1 0 110-2 1 1 0 010 2z" fill="#FFD43B"/></svg>,
    go: <svg viewBox="0 0 32 24" fill="#00ADD8"><path d="M2 9h6v1.5H2zm0 3h7v1.5H2zm1 3h6v1.5H3zm17.5-7C16.5 8 13 11 13 14.5S16.5 21 20.5 21s7-3 7-6.5-3.5-6.5-7-6.5zm0 3a3.5 3.5 0 110 7 3.5 3.5 0 010-7z"/></svg>,
    postgresql: <svg viewBox="0 0 24 24" fill="#336791"><ellipse cx="12" cy="5" rx="8" ry="2.5"/><path d="M4 5v6c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5V5c0 1.4-3.6 2.5-8 2.5S4 6.4 4 5zm0 8v6c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5v-6c0 1.4-3.6 2.5-8 2.5s-8-1.1-8-2.5z"/></svg>,
    mongodb: <svg viewBox="0 0 24 24" fill="#47A248"><path d="M12 2c-1 4-5 6-5 11s2 7 5 9c3-2 5-4 5-9s-4-7-5-11zm0 4c.5 2 2 4 2 7s-1 4-2 5c-1-1-2-2-2-5s1.5-5 2-7z"/></svg>,
    redis: <svg viewBox="0 0 24 24" fill="#DC382D"><path d="M3 5l9-3 9 3v3l-9 3-9-3V5zm0 5l9 3 9-3v3l-9 3-9-3v-3zm0 5l9 3 9-3v3l-9 3-9-3v-3z"/></svg>,
    openrouter: <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.6"><circle cx="12" cy="12" r="9"/><path d="M3 12h6M15 12h6M12 3v6M12 15v6"/></svg>,
    langchain: <svg viewBox="0 0 24 24" fill="#1C3C3C"><circle cx="6" cy="12" r="3"/><circle cx="18" cy="12" r="3"/><path d="M9 12h6" stroke="#1C3C3C" strokeWidth="2"/><path d="M12 5v3M12 16v3" stroke="#1C3C3C" strokeWidth="2"/></svg>
  };
  return <span className="tech-logo">{L[kind] || <span className="tech-logo-placeholder" />}</span>;
};

// === Tech stack ===
const TECH_STACK = [
  { name: "Salesforce", group: "CRM", logo: "salesforce" },
  { name: "Sales Cloud", group: "CRM", logo: "salescloud" },
  { name: "Service Cloud", group: "CRM", logo: "servicecloud" },
  { name: "Marketing Cloud", group: "CRM", logo: "marketingcloud" },
  { name: "Data Cloud", group: "Data", logo: "datacloud" },
  { name: "Agentforce", group: "AI", logo: "agentforce" },
  { name: "Tableau", group: "BI", logo: "tableau" },
  { name: "MuleSoft", group: "iPaaS", logo: "mulesoft" },
  { name: "n8n", group: "iPaaS", logo: "n8n" },
  { name: "Make", group: "iPaaS", logo: "make" },
  { name: "Next.js", group: "Frontend", logo: "nextjs" },
  { name: "Angular", group: "Frontend", logo: "angular" },
  { name: "Vue.js", group: "Frontend", logo: "vue" },
  { name: "Tailwind", group: "Frontend", logo: "tailwind" },
  { name: "Node.js", group: "Backend", logo: "nodejs" },
  { name: "FastAPI", group: "Backend", logo: "fastapi" },
  { name: "Python", group: "Backend", logo: "python" },
  { name: "Go", group: "Backend", logo: "go" },
  { name: "PostgreSQL", group: "Data", logo: "postgresql" },
  { name: "MongoDB", group: "Data", logo: "mongodb" },
  { name: "Redis", group: "Data", logo: "redis" },
  { name: "OpenRouter", group: "AI", logo: "openrouter" },
  { name: "LangChain", group: "AI", logo: "langchain" }
];

Object.assign(window, {
  VeliorMark, Nav, Footer, SalesforcePartnerBadge, Reveal, Eyebrow,
  SectionHeading, Arrow, ServiceIcon, TECH_STACK, TechLogo
});
