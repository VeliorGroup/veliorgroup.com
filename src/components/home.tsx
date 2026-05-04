"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/lang";
import { useNavigate } from "@/lib/router";
import {
  Arrow,
  Eyebrow,
  Reveal,
  SalesforcePartnerBadge,
  SectionHeading,
  ServiceIcon,
  type ServiceIconKind,
  TECH_STACK,
  TechLogo,
} from "./atoms";

const SERVICE_ICON_KINDS: ServiceIconKind[] = ["salesforce", "fullstack", "ai", "automation"];

export const Hero = () => {
  const { t } = useLang();
  const navigate = useNavigate();
  const orbRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
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
            <button className="btn btn-gradient" onClick={() => navigate("contact")}>
              {t.hero.ctaPrimary} <Arrow />
            </button>
            <button className="btn btn-ghost" onClick={() => navigate("services")}>
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

const TECH_GROUP_ORDER = ["CRM", "AI", "Data", "BI", "iPaaS", "Frontend", "Backend"] as const;

export const TechStack = () => {
  const { t } = useLang();
  const grouped = TECH_GROUP_ORDER.map((g) => ({
    group: g,
    items: TECH_STACK.filter((it) => it.group === g),
  })).filter((g) => g.items.length > 0);

  return (
    <section className="tech-section-v2">
      <div className="container">
        <Reveal>
          <div style={{ textAlign: "center" }}>
            <Eyebrow>{t.ui.techStack}</Eyebrow>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="h2 tech-v2-title">
            {t.ui.techStackTitle[0]}{" "}
            <span className="gradient-text-brand">{t.ui.techStackTitle[1]}</span>
          </h2>
        </Reveal>
        <div className="tech-v2-groups">
          {grouped.map((g, gi) => (
            <Reveal key={g.group} delay={120 + gi * 60} className="tech-v2-group">
              <div className="tech-v2-group-head">
                <span className="tech-v2-group-label">{g.group}</span>
                <span className="tech-v2-group-line" />
                <span className="tech-v2-group-count">
                  {String(g.items.length).padStart(2, "0")}
                </span>
              </div>
              <div className="tech-v2-grid">
                {g.items.map((tech) => (
                  <div key={tech.name} className="tech-v2-card">
                    <div className="tech-v2-logo">
                      <TechLogo kind={tech.logo} />
                    </div>
                    <span className="tech-v2-name">{tech.name}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export const PartnerSection = () => {
  const { t } = useLang();
  return (
    <section className="section partner-section">
      <div className="container">
        <div className="partner-grid">
          <div>
            <SectionHeading eyebrow={t.partner.eyebrow} title={t.partner.title} lede={t.partner.lede} />
            <Reveal delay={200}>
              <div className="partner-stats">
                <div className="partner-stat">
                  <div className="partner-stat-v">100+</div>
                  <div className="partner-stat-l">{t.ui.activeCerts}</div>
                </div>
                <div className="partner-stat">
                  <div className="partner-stat-v">20+</div>
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
                  <svg width="12" height="12" viewBox="0 0 12 12">
                    <path d="M2 6 L5 9 L10 3" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export const ServicesSection = () => {
  const { t } = useLang();
  const navigate = useNavigate();
  return (
    <section className="section services-section">
      <div className="container">
        <SectionHeading eyebrow={t.services.eyebrow} title={t.services.title} />
        <div className="services-grid">
          {t.services.items.map((s, i) => (
            <Reveal key={i} delay={i * 100} className="service-card">
              <span className="service-num">{s.n}</span>
              <div className="service-icon">
                <ServiceIcon kind={SERVICE_ICON_KINDS[i]} />
              </div>
              <h3 className="service-title">{s.t}</h3>
              <p className="service-desc">{s.d}</p>
              <ul className="service-bullets">
                {s.bullets.map((b, j) => (
                  <li key={j}>
                    <span className="bullet-dot" />
                    {b}
                  </li>
                ))}
              </ul>
              <button className="btn-link" onClick={() => navigate("services")}>
                {t.ui.learnMore} <Arrow size={12} />
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Testimonials = () => {
  const { t } = useLang();
  const [active, setActive] = useState(0);
  const items = t.testimonials.items;
  return (
    <section className="section testimonials-v2-section">
      <div className="testimonials-v2-bg-mark" aria-hidden>
        &ldquo;
      </div>
      <div className="container">
        <SectionHeading eyebrow={t.testimonials.eyebrow} title={t.ui.quietlyExcellent} />
        <div className="testimonials-v2-stage">
          {items.map((it, i) => (
            <div key={i} className={`testimonial-v2 ${active === i ? "is-active" : ""}`}>
              <svg className="testimonial-v2-mark" viewBox="0 0 80 80" fill="none">
                <path
                  d="M22 44 C22 28 32 20 40 20 L40 32 C32 32 28 36 28 44 L40 44 L40 60 L18 60 L18 44 Z M50 44 C50 28 60 20 68 20 L68 32 C60 32 56 36 56 44 L68 44 L68 60 L46 60 L46 44 Z"
                  fill="url(#tg)"
                />
                <defs>
                  <linearGradient id="tg" x1="0" y1="0" x2="80" y2="80">
                    <stop offset="0" stopColor="#7D30F3" />
                    <stop offset="1" stopColor="#03ECE9" />
                  </linearGradient>
                </defs>
              </svg>
              <blockquote className="testimonial-v2-quote">{it.q}</blockquote>
              <div className="testimonial-v2-author">
                <div className="testimonial-v2-avatar">
                  {it.n
                    .split(" ")
                    .map((s) => s[0])
                    .join("")}
                </div>
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
              <button
                key={i}
                className={`testimonials-v2-dot ${active === i ? "is-active" : ""}`}
                onClick={() => setActive(i)}
                aria-label={`Quote ${i + 1}`}
              />
            ))}
          </div>
          <div className="testimonials-v2-arrows">
            <button
              className="testimonials-v2-arrow"
              onClick={() => setActive((active - 1 + items.length) % items.length)}
              aria-label="Previous"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M15 6 L9 12 L15 18" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
            <button
              className="testimonials-v2-arrow"
              onClick={() => setActive((active + 1) % items.length)}
              aria-label="Next"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M9 6 L15 12 L9 18" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
