"use client";

import { useLang } from "@/lib/lang";
import { Arrow, Eyebrow, Reveal, SalesforcePartnerBadge, SectionHeading } from "./atoms";
import { ContactCTA, ProcessSection } from "./shared";
import { WorldMap } from "./WorldMap";
import { SalesforceFlower } from "./SalesforceFlower";

const WA_AL = "355696555559";
const WA_IT = "393203238814";

export const AboutContent = () => {
  const { t } = useLang();
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Reveal>
            <Eyebrow>{t.about.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="h-display" style={{ marginTop: 20, maxWidth: "16ch" }}>
              {t.ui.ambitiousOperators[0]} <span className="gradient-text-brand">{t.ui.ambitiousOperators[1]}</span>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="lede" style={{ marginTop: 28, maxWidth: "70ch" }}>
              {t.about.lede}
            </p>
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
                <div className="value-num">
                  0{i + 1} / 0{t.about.values.length}
                </div>
                <h3 className="value-title">{v.t}</h3>
                <p className="value-desc">{v.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
};

export const ServicesContent = () => {
  const { t } = useLang();
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Reveal>
            <Eyebrow>{t.services.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="h-display" style={{ marginTop: 20, maxWidth: "22ch" }}>
              {t.ui.threePillars[0]} <span className="gradient-text-brand">{t.ui.threePillars[1]}</span>{" "}
              {t.ui.threePillars[2]}
            </h1>
          </Reveal>
        </div>
      </section>

      {t.services.items.map((s, i) => (
        <section key={i} className="service-deep">
          <div className="container service-deep-grid">
            <div>
              <div className="service-deep-num">{s.n}</div>
              <Eyebrow>
                {t.ui.pillar} {s.n}
              </Eyebrow>
            </div>
            <div>
              <h2 className="h1" style={{ margin: "0 0 24px" }}>
                {s.t}
              </h2>
              <p className="lede" style={{ marginBottom: 36 }}>
                {s.d}
              </p>
              <ul className="service-deep-bullets">
                {s.bullets.map((b, j) => (
                  <li key={j}>
                    <span className="bullet-dot" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              {i === 0 && (
                <div className="sf-flower-wrap">
                  <Reveal delay={120}>
                    <div className="sf-flower-head">
                      <Eyebrow>{t.salesforce.eyebrow}</Eyebrow>
                      <h3 className="h2 sf-flower-title">{t.salesforce.title}</h3>
                      <p className="body sf-flower-lede">{t.salesforce.lede}</p>
                    </div>
                  </Reveal>
                  <SalesforceFlower />
                </div>
              )}
            </div>
          </div>
        </section>
      ))}

      <ProcessSection />
      <ContactCTA />
    </>
  );
};

const WhatsAppGlyph = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M17.5 14.4c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.2-.7.2-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.5-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4 0 1.4 1 2.8 1.2 3 .2.2 2 3 4.8 4.2.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.4zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.1-1.3c1.4.8 3.1 1.3 4.9 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.2c-1.6 0-3.2-.4-4.5-1.2l-.3-.2-3 .8.8-3-.2-.3c-.9-1.4-1.4-3-1.4-4.6 0-4.6 3.7-8.4 8.4-8.4 4.6 0 8.4 3.7 8.4 8.4-.1 4.6-3.8 8.5-8.4 8.5z" />
  </svg>
);

export const ContactContent = () => {
  const { t } = useLang();
  return (
    <section className="contact-page">
      <div className="container">
        <div className="contact-head">
          <Reveal>
            <Eyebrow>{t.contact.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="h-display contact-title">
              {t.ui.tellUs[0]} <span className="gradient-text-brand">{t.ui.tellUs[1]}</span>
            </h1>
          </Reveal>
        </div>

        <div className="contact-grid-v2">
          <div>
            <Reveal delay={120}>
              <p className="lede contact-lede">{t.contact.lede}</p>
            </Reveal>
            <Reveal delay={220}>
              <div className="contact-detail">
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
            <Reveal delay={320}>
              <div style={{ marginTop: 40 }}>
                <SalesforcePartnerBadge />
              </div>
            </Reveal>
          </div>

          <Reveal delay={200} className="contact-channels-card">
          <div className="channels-head">
            <span className="channels-eyebrow">{t.ui.directLine}</span>
            <h2 className="h2 channels-title">{t.ui.howToReach}</h2>
            <p className="body channels-lede">{t.ui.channelsLede}</p>
          </div>

          <a className="channel-row" href={`https://wa.me/${WA_IT}`} target="_blank" rel="noopener noreferrer">
            <span className="channel-flag" aria-hidden>🇮🇹</span>
            <span className="channel-body">
              <span className="channel-k">{t.ui.italy} · WhatsApp</span>
              <span className="channel-v">+39 320 323 8814</span>
            </span>
            <span className="channel-icon"><WhatsAppGlyph /></span>
          </a>

          <a className="channel-row" href={`https://wa.me/${WA_AL}`} target="_blank" rel="noopener noreferrer">
            <span className="channel-flag" aria-hidden>🇦🇱</span>
            <span className="channel-body">
              <span className="channel-k">{t.ui.albania} · WhatsApp</span>
              <span className="channel-v">+355 69 655 5559</span>
            </span>
            <span className="channel-icon"><WhatsAppGlyph /></span>
          </a>

          <a
            className="channel-row"
            href={`mailto:${t.contact.detail.email}`}
            onClick={(e) => {
              e.preventDefault();
              window.location.href = `mailto:${t.contact.detail.email}`;
            }}
          >
            <span className="channel-flag" aria-hidden>✉</span>
            <span className="channel-body">
              <span className="channel-k">{t.ui.email}</span>
              <span className="channel-v">{t.contact.detail.email}</span>
            </span>
            <span className="channel-icon"><Arrow size={16} /></span>
          </a>
        </Reveal>
        </div>

        <Reveal delay={300} className="contact-map-wrap">
          <WorldMap />
        </Reveal>
      </div>
    </section>
  );
};
