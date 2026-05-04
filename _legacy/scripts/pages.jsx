// === ABOUT, SERVICES, CONTACT — v2 dark ===
const { useState: useStateP } = React;

const AboutPage = ({ t, setRoute }) => (
  <>
    <section className="page-hero">
      <div className="container">
        <Reveal><Eyebrow>{t.about.eyebrow}</Eyebrow></Reveal>
        <Reveal delay={100}>
          <h1 className="h-display" style={{ marginTop: 20, maxWidth: "16ch" }}>
            {t.ui.ambitiousOperators[0]} <span className="gradient-text-brand" >{t.ui.ambitiousOperators[1]}</span>
          </h1>
        </Reveal>
        <Reveal delay={200}>
          <p className="lede" style={{ marginTop: 28, maxWidth: "70ch" }}>{t.about.lede}</p>
        </Reveal>
      </div>
    </section>

    <section className="about-stats-section">
      <div className="container">
        <div className="about-stats-grid">
          {t.about.stats.map((s, i) => (
            <Reveal key={i} delay={i * 80} className="about-stat">
              <div className="about-stat-v">{s.v}</div>
              <div className="about-stat-l">{s.l}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    <section className="section">
      <div className="container">
        <SectionHeading eyebrow={t.ui.operatingPrinciples} title={t.ui.whatWeBelieve} />
        <div className="values-grid">
          {t.about.values.map((v, i) => (
            <Reveal key={i} delay={i * 100} className="value-card">
              <div className="value-num">0{i + 1} / 0{t.about.values.length}</div>
              <h3 className="value-title">{v.t}</h3>
              <p className="value-desc">{v.d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    <ContactCTA t={t} setRoute={setRoute} />
  </>
);

const ServicesPage = ({ t, setRoute }) => (
  <>
    <section className="page-hero">
      <div className="container">
        <Reveal><Eyebrow>{t.services.eyebrow}</Eyebrow></Reveal>
        <Reveal delay={100}>
          <h1 className="h-display" style={{ marginTop: 20, maxWidth: "22ch" }}>
            {t.ui.threePillars[0]} <span className="gradient-text-brand" >{t.ui.threePillars[1]}</span> {t.ui.threePillars[2]}
          </h1>
        </Reveal>
      </div>
    </section>

    {t.services.items.map((s, i) => (
      <section key={i} className="service-deep">
        <div className="container service-deep-grid">
          <div>
            <div className="service-deep-num">{s.n}</div>
            <Eyebrow>{t.ui.pillar} {s.n}</Eyebrow>
          </div>
          <div>
            <h2 className="h1" style={{ margin: "0 0 24px" }}>{s.t}</h2>
            <p className="lede" style={{ marginBottom: 36 }}>{s.d}</p>
            <ul className="service-deep-bullets">
              {s.bullets.map((b, j) => (
                <li key={j}><span className="bullet-dot" /><span>{b}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    ))}

    <ProcessSection t={t} />
    <ContactCTA t={t} setRoute={setRoute} />
  </>
);

const ContactPage = ({ t }) => {
  const [form, setForm] = useStateP({ firstName: "", lastName: "", company: "", email: "", topic: t.contact.form.topics[0], message: "" });
  const [sent, setSent] = useStateP(false);
  const [errs, setErrs] = useStateP({});

  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (!form.firstName.trim()) er.firstName = true;
    if (!form.lastName.trim()) er.lastName = true;
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) er.email = true;
    if (form.message.trim().length < 10) er.message = true;
    setErrs(er);
    if (Object.keys(er).length === 0) setSent(true);
  };

  return (
    <section className="contact-page">
      <div className="container contact-grid">
        <div>
          <Reveal><Eyebrow>{t.contact.eyebrow}</Eyebrow></Reveal>
          <Reveal delay={100}>
            <h1 className="h-display" style={{ marginTop: 20 }}>
              {t.ui.tellUs[0]} <span className="gradient-text-brand" >{t.ui.tellUs[1]}</span>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="lede" style={{ marginTop: 24 }}>{t.contact.lede}</p>
          </Reveal>
          <Reveal delay={300}>
            <div className="contact-detail">
              <div className="contact-detail-row">
                <span className="contact-detail-k">{t.ui.email}</span>
                <a href={`mailto:${t.contact.detail.email}`} className="contact-detail-v">{t.contact.detail.email}</a>
              </div>
              <div className="contact-detail-row">
                <span className="contact-detail-k">{t.ui.office}</span>
                <span className="contact-detail-v">{t.contact.detail.location}</span>
              </div>
              <div className="contact-detail-row">
                <span className="contact-detail-k">{t.ui.hours}</span>
                <span className="contact-detail-v">{t.contact.detail.hours}</span>
              </div>
            </div>
          </Reveal>
          <Reveal delay={400}>
            <div style={{ marginTop: 40 }}>
              <SalesforcePartnerBadge />
            </div>
          </Reveal>
        </div>

        <Reveal delay={200} className="contact-form-card">
          {sent ? (
            <div className="form-sent">
              <div className="form-sent-icon">
                <svg width="48" height="48" viewBox="0 0 48 48"><circle cx="24" cy="24" r="22" stroke="url(#g)" strokeWidth="1.5" fill="none"/><path d="M14 24 L21 31 L34 17" stroke="url(#g)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/><defs><linearGradient id="g" x1="0" y1="0" x2="48" y2="48"><stop offset="0%" stopColor="#7D30F3"/><stop offset="100%" stopColor="#03ECE9"/></linearGradient></defs></svg>
              </div>
              <h3 style={{ fontSize: 28, margin: "20px 0 12px", color: "var(--fg)" }}>{t.ui.messageReceived}</h3>
              <p className="body">{t.contact.form.sent}</p>
            </div>
          ) : (
            <form onSubmit={submit} className="contact-form" noValidate>
              <div className="form-row two">
                <label className={`field ${errs.firstName ? "err" : ""}`}>
                  <span>{t.contact.form.firstName}</span>
                  <input type="text" value={form.firstName} onChange={e => setForm({...form, firstName: e.target.value})} />
                </label>
                <label className={`field ${errs.lastName ? "err" : ""}`}>
                  <span>{t.contact.form.lastName}</span>
                  <input type="text" value={form.lastName} onChange={e => setForm({...form, lastName: e.target.value})} />
                </label>
              </div>
              <label className="field">
                <span>{t.contact.form.company}</span>
                <input type="text" value={form.company} onChange={e => setForm({...form, company: e.target.value})} />
              </label>
              <label className={`field ${errs.email ? "err" : ""}`}>
                <span>{t.contact.form.email}</span>
                <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
              </label>
              <label className="field">
                <span>{t.contact.form.topic}</span>
                <select value={form.topic} onChange={e => setForm({...form, topic: e.target.value})}>
                  {t.contact.form.topics.map((tp, i) => <option key={i}>{tp}</option>)}
                </select>
              </label>
              <label className={`field ${errs.message ? "err" : ""}`}>
                <span>{t.contact.form.message}</span>
                <textarea rows="5" value={form.message} onChange={e => setForm({...form, message: e.target.value})} />
              </label>
              <button type="submit" className="btn btn-gradient" style={{ alignSelf: "flex-start", marginTop: 8 }}>
                {t.contact.form.submit} <Arrow />
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
};

Object.assign(window, { AboutPage, ServicesPage, ContactPage });
