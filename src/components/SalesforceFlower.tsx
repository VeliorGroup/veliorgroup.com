"use client";

import type { ReactNode } from "react";
import { useLang } from "@/lib/lang";
import { Eyebrow, Reveal } from "./atoms";

type Petal = {
  key: string;
  hue: string;
  icon: ReactNode;
};

const PETALS: Petal[] = [
  {
    key: "consulting",
    hue: "linear-gradient(135deg, #7D30F3 0%, #9C5BFF 100%)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="8" r="2.6" />
        <path d="M3.6 18a5.4 5.4 0 0 1 10.8 0" />
        <path d="M16 6.5h5M16 10h4" />
      </svg>
    ),
  },
  {
    key: "implementation",
    hue: "linear-gradient(135deg, #03ECE9 0%, #5BAFFF 100%)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 14a4 4 0 0 1 4-4h1a3 3 0 0 1 3-3 4 4 0 0 1 4 4 4 4 0 0 1 0 8H8a4 4 0 0 1-4-4Z" />
        <path d="m9 14 2 2 4-4" />
      </svg>
    ),
  },
  {
    key: "integration",
    hue: "linear-gradient(135deg, #5BAFFF 0%, #00A1E0 100%)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="6" cy="12" r="2.4" />
        <circle cx="18" cy="6" r="2.4" />
        <circle cx="18" cy="18" r="2.4" />
        <path d="M8.4 12 16 7M8.4 12l7.6 5" />
      </svg>
    ),
  },
  {
    key: "development",
    hue: "linear-gradient(135deg, #C4B1FA 0%, #7D30F3 100%)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 8 5 12l4 4M15 8l4 4-4 4M14 5l-4 14" />
      </svg>
    ),
  },
  {
    key: "migration",
    hue: "linear-gradient(135deg, #03ECE9 0%, #7D30F3 100%)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="6" cy="6" rx="3.5" ry="1.5" />
        <path d="M2.5 6v6c0 .8 1.6 1.5 3.5 1.5s3.5-.7 3.5-1.5V6" />
        <path d="M11 11h7M14 8l4 3-4 3" />
        <ellipse cx="20" cy="18" rx="3" ry="1.3" />
        <path d="M17 18v3c0 .7 1.3 1.3 3 1.3s3-.6 3-1.3v-3" />
      </svg>
    ),
  },
  {
    key: "managed",
    hue: "linear-gradient(135deg, #9C5BFF 0%, #03ECE9 100%)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 9a4 4 0 0 1 4-4 5 5 0 0 1 9.4 1.6A4.5 4.5 0 0 1 18 15H8a4 4 0 0 1-3-6Z" />
        <path d="M9 19v-3M12 21v-5M15 19v-3" />
      </svg>
    ),
  },
];

export const SalesforceFlower = () => {
  const { t } = useLang();
  const labels = (t.salesforce.petals ?? []) as readonly { t: string; d: string }[];

  return (
    <div className="sf-flower">
      <div className="sf-flower-center">
        <div className="sf-flower-core">
          <span className="sf-flower-core-mark">Salesforce</span>
          <span className="sf-flower-core-sub">{t.salesforce.coreSub}</span>
        </div>
        <div className="sf-flower-orbit" aria-hidden />
      </div>

      <div className="sf-flower-petals">
        {PETALS.map((p, i) => (
          <div
            key={p.key}
            className={`sf-flower-petal sf-flower-petal-${i + 1}`}
            style={{ animationDelay: `${i * 90}ms` }}
          >
            <div className="sf-flower-petal-inner" style={{ background: p.hue }}>
              <div className="sf-flower-petal-icon">{p.icon}</div>
              <div className="sf-flower-petal-text">
                <div className="sf-flower-petal-title">{labels[i]?.t ?? ""}</div>
                <div className="sf-flower-petal-desc">{labels[i]?.d ?? ""}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const SalesforceFlowerSection = () => {
  const { t } = useLang();
  return (
    <section className="section sf-section">
      <div className="container">
        <Reveal>
          <div className="sf-flower-head">
            <Eyebrow>{t.salesforce.eyebrow}</Eyebrow>
            <h2 className="h1 sf-flower-title">{t.salesforce.title}</h2>
            <p className="lede sf-flower-lede">{t.salesforce.lede}</p>
          </div>
        </Reveal>
        <SalesforceFlower />
      </div>
    </section>
  );
};
