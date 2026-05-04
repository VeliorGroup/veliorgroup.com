// === HOMEPAGE — Velior v2, dark, gradient, motion ===
const { useState: useStateH, useEffect: useEffectH, useRef: useRefH } = React;

const Hero = ({ t, setRoute }) => {
  const orbRef = useRefH(null);
  useEffectH(() => {
    const onMove = (e) => {
      if (!orbRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      orbRef.current.style.transform = `translate(${x}px, ${y}px)`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section className="hero">
      <div className="hero-orb hero-orb-1" ref={orbRef} />
      <div className="hero-orb hero-orb-2" />
      <div className="hero-bg-grad" />
      <div className="hero-bg-grid" />
      <div className="container hero-inner">
        <Reveal>
          <div className="hero-sf-wrap">
            <SalesforcePartnerBadge />
          </div>
        </Reveal>
        <Reveal delay={120}>
          <h1 className="h-display hero-title">
            {t.hero.title[0]} <span className="accent">{t.hero.title[1]}</span>
          </h1>
        </Reveal>
        <Reveal delay={260}>
          <p className="lede hero-lede">{t.hero.lede}</p>
        </Reveal>
        <Reveal delay={380}>
          <div className="hero-ctas">
            <button className="btn btn-gradient" onClick={() => setRoute("contact")}>
              {t.hero.ctaPrimary} <Arrow/>
            </button>
            <button className="btn btn-ghost" onClick={() => setRoute("services")}>
              {t.hero.ctaSecondary}
            </button>
          </div>
        </Reveal>
        <Reveal delay={520}>
          <div className="hero-stats">
            {t.hero.stats.map((s, i) => (
              <div key={i} className="hero-stat">
                <div className="hero-stat-v">{s.v}</div>
                <div className="hero-stat-l">{s.l}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

const TechStack = ({ t }) => (
  <section className="tech-section">
    <div className="container">
      <Reveal><div style={{textAlign:"center"}}><Eyebrow>{t.ui.techStack}</Eyebrow></div></Reveal>
      <div className="tech-marquee-wrap">
        <div className="tech-marquee">
          {[...TECH_STACK, ...TECH_STACK].map((tech, i) => (
            <div key={i} className="tech-tile">
              <TechLogo kind={tech.logo} />
              <span className="tech-name">{tech.name}</span>
              <span className="tech-group">{tech.group}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const PartnerSection = ({ t }) => (
  <section className="section partner-section">
    <div className="container">
      <div className="partner-grid">
        <div>
          <SectionHeading eyebrow={t.partner.eyebrow} title={t.partner.title} lede={t.partner.lede} />
          <Reveal delay={200}>
            <div className="partner-stats">
              <div className="partner-stat">
                <div className="partner-stat-v">130+</div>
                <div className="partner-stat-l">{t.ui.activeCerts}</div>
              </div>
              <div className="partner-stat">
                <div className="partner-stat-v">30+</div>
                <div className="partner-stat-l">{t.ui.implementations}</div>
              </div>
              <div className="partner-stat">
                <div className="partner-stat-v">2025</div>
                <div className="partner-stat-l">{t.ui.partnerSince}</div>
              </div>
            </div>
          </Reveal>
        </div>
        <div className="cert-list">
          {t.partner.certs.map((c, i) => (
            <Reveal key={i} delay={i * 40} className="cert-item">
              <span className="cert-num">{String(i + 1).padStart(2, "0")}</span>
              <span className="cert-name">{c}</span>
              <span className="cert-check">
                <svg width="12" height="12" viewBox="0 0 12 12"><path d="M2 6 L5 9 L10 3" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const ServicesSection = ({ t, setRoute }) => {
  const icons = ["salesforce", "fullstack", "ai", "automation"];
  return (
    <section className="section services-section">
      <div className="container">
        <SectionHeading eyebrow={t.services.eyebrow} title={t.services.title} />
        <div className="services-grid">
          {t.services.items.map((s, i) => (
            <Reveal key={i} delay={i * 100} className="service-card">
              <span className="service-num">{s.n}</span>
              <div className="service-icon"><ServiceIcon kind={icons[i]} /></div>
              <h3 className="service-title">{s.t}</h3>
              <p className="service-desc">{s.d}</p>
              <ul className="service-bullets">
                {s.bullets.map((b, j) => (
                  <li key={j}><span className="bullet-dot" />{b}</li>
                ))}
              </ul>
              <button className="btn-link" onClick={() => setRoute("services")}>
                {t.ui.learnMore} <Arrow size={12}/>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProcessSection = ({ t }) => (
  <section className="section process-section">
    <div className="container">
      <SectionHeading eyebrow={t.process.eyebrow} title={t.process.title} />
      <div className="process-track">
        <div className="process-line" />
        {t.process.steps.map((s, i) => (
          <Reveal key={i} delay={i * 120} className="process-step">
            <div className="process-dot">{s.n}</div>
            <h3 className="process-title">{s.t}</h3>
            <p className="process-desc">{s.d}</p>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const CasesSection = ({ t }) => {
  const [active, setActive] = useStateH(0);
  return (
    <section className="section cases-section">
      <div className="container">
        <SectionHeading eyebrow={t.cases.eyebrow} title={t.cases.title} lede={t.cases.lede} />
        <div className="cases-card">
          <div className="cases-tabs">
            {t.cases.items.map((c, i) => (
              <button key={i} onClick={() => setActive(i)}
                      className={`case-tab ${active === i ? "active" : ""}`}>
                <span className="case-tab-num">{t.ui.caseN} {String(i + 1).padStart(2, "0")}</span>
                <span className="case-tab-tag">{c.tag}</span>
              </button>
            ))}
          </div>
          <Reveal key={active} className="case-panel">
            <h3 className="h2 case-title">{t.cases.items[active].t}</h3>
            <div className="case-metrics">
              {t.cases.items[active].m.map((m, i) => (
                <div key={i} className="case-metric">
                  <div className="case-metric-v">{m.v}</div>
                  <div className="case-metric-l">{m.l}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

const IndustriesSection = ({ t }) => (
  <section className="industries-section">
    <div className="container">
      <SectionHeading eyebrow={t.industries.eyebrow} title={t.ui.whereWeOperate} />
      <div className="industries-grid">
        {t.industries.list.map((it, i) => (
          <Reveal key={i} delay={i * 30} className="industry-tile">
            <span className="industry-tile-dot" />{it}
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const Testimonials = ({ t }) => {
  const [active, setActive] = useStateH(0);
  const items = t.testimonials.items;
  return (
    <section className="section testimonials-v2-section">
      <div className="testimonials-v2-bg-mark" aria-hidden>"</div>
      <div className="container">
        <SectionHeading eyebrow={t.testimonials.eyebrow} title={t.ui.quietlyExcellent} />
        <div className="testimonials-v2-stage">
          {items.map((it, i) => (
            <div key={i} className={`testimonial-v2 ${active === i ? "is-active" : ""}`}>
              <svg className="testimonial-v2-mark" viewBox="0 0 80 80" fill="none">
                <path d="M22 44 C22 28 32 20 40 20 L40 32 C32 32 28 36 28 44 L40 44 L40 60 L18 60 L18 44 Z M50 44 C50 28 60 20 68 20 L68 32 C60 32 56 36 56 44 L68 44 L68 60 L46 60 L46 44 Z" fill="url(#tg)"/>
                <defs>
                  <linearGradient id="tg" x1="0" y1="0" x2="80" y2="80">
                    <stop offset="0" stopColor="#7D30F3"/><stop offset="1" stopColor="#03ECE9"/>
                  </linearGradient>
                </defs>
              </svg>
              <blockquote className="testimonial-v2-quote">{it.q}</blockquote>
              <div className="testimonial-v2-author">
                <div className="testimonial-v2-avatar">{it.n.split(" ").map(s => s[0]).join("")}</div>
                <div>
                  <div className="testimonial-v2-name">{it.n}</div>
                  <div className="testimonial-v2-role">{it.r}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="testimonials-v2-nav">
          <div className="testimonials-v2-counter">
            <span className="testimonials-v2-counter-num">{String(active + 1).padStart(2, "0")}</span>
            <span className="testimonials-v2-counter-sep">/</span>
            <span className="testimonials-v2-counter-tot">{String(items.length).padStart(2, "0")}</span>
          </div>
          <div className="testimonials-v2-dots">
            {items.map((_, i) => (
              <button key={i} className={`testimonials-v2-dot ${active === i ? "is-active" : ""}`}
                      onClick={() => setActive(i)} aria-label={`Quote ${i + 1}`}/>
            ))}
          </div>
          <div className="testimonials-v2-arrows">
            <button className="testimonials-v2-arrow" onClick={() => setActive((active - 1 + items.length) % items.length)} aria-label="Previous">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M15 6 L9 12 L15 18" stroke="currentColor" strokeWidth="1.5"/></svg>
            </button>
            <button className="testimonials-v2-arrow" onClick={() => setActive((active + 1) % items.length)} aria-label="Next">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M9 6 L15 12 L9 18" stroke="currentColor" strokeWidth="1.5"/></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactCTA = ({ t, setRoute }) => (
  <section className="contact-cta">
    <div className="container">
      <div className="contact-cta-card">
        <div className="contact-cta-inner">
          <Reveal>
            <h2 className="h1" style={{ maxWidth: "16ch", margin: 0 }}>
              {t.ui.buildNext[0]} <span className="gradient-text-brand" >{t.ui.buildNext[1]}</span>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <div className="contact-cta-actions">
              <button className="btn btn-gradient" onClick={() => setRoute("contact")}>
                {t.nav.cta} <Arrow/>
              </button>
              <a className="btn btn-ghost" href="mailto:info@veliorgroup.com">
                info@veliorgroup.com
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  </section>
);

const HomePage = ({ t, setRoute }) => (
  <>
    <Hero t={t} setRoute={setRoute} />
    <TechStack t={t} />
    <PartnerSection t={t} />
    <ServicesSection t={t} setRoute={setRoute} />
    <ProcessSection t={t} />
    <Testimonials t={t} />
    <ContactCTA t={t} setRoute={setRoute} />
  </>
);

window.HomePage = HomePage;
window.ContactCTA = ContactCTA;
window.ProcessSection = ProcessSection;
