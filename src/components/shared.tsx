"use client";

import { useLang } from "@/lib/lang";
import { useNavigate } from "@/lib/router";
import { Reveal, SectionHeading } from "./atoms";

export const ProcessSection = () => {
  const { t } = useLang();
  return (
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
};

export const ContactCTA = () => {
  const { t } = useLang();
  const navigate = useNavigate();
  return (
    <section className="contact-cta">
      <div className="container">
        <div className="contact-cta-card">
          <div className="contact-cta-inner">
            <Reveal>
              <h2 className="h1" style={{ maxWidth: "16ch", margin: 0 }}>
                {t.ui.buildNext[0]} <span className="gradient-text-brand">{t.ui.buildNext[1]}</span>
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <div className="contact-cta-actions">
                <button className="btn btn-gradient" onClick={() => navigate("contact")}>
                  {t.nav.cta}
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
};
