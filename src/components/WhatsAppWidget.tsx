"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/lang";

const WA_AL = "355696555559";
const WA_IT = "393203238814";

const WhatsAppGlyph = ({ size = 26 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M17.5 14.4c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.2-.7.2-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.5-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4 0 1.4 1 2.8 1.2 3 .2.2 2 3 4.8 4.2.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.4zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.1-1.3c1.4.8 3.1 1.3 4.9 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.2c-1.6 0-3.2-.4-4.5-1.2l-.3-.2-3 .8.8-3-.2-.3c-.9-1.4-1.4-3-1.4-4.6 0-4.6 3.7-8.4 8.4-8.4 4.6 0 8.4 3.7 8.4 8.4-.1 4.6-3.8 8.5-8.4 8.5z" />
  </svg>
);

export const WhatsAppWidget = () => {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const open_ = (n: string) => {
    window.open(`https://wa.me/${n}`, "_blank", "noopener,noreferrer");
    setOpen(false);
  };

  return (
    <div ref={rootRef} className={`wa-widget ${open ? "is-open" : ""}`}>
      <div className="wa-panel" role="dialog" aria-hidden={!open}>
        <div className="wa-panel-head">
          <div>
            <div className="wa-panel-title">{t.ui.whatsappTitle}</div>
            <div className="wa-panel-sub">{t.ui.whatsappSub}</div>
          </div>
          <button className="wa-close" onClick={() => setOpen(false)} aria-label="Close">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 3 L11 11 M11 3 L3 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <button className="wa-option" onClick={() => open_(WA_IT)}>
          <span className="wa-option-flag" aria-hidden>🇮🇹</span>
          <span className="wa-option-body">
            <span className="wa-option-k">{t.ui.italy}</span>
            <span className="wa-option-v">+39 320 323 8814</span>
          </span>
          <span className="wa-option-arrow">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7 H12 M8 3 L12 7 L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </button>

        <button className="wa-option" onClick={() => open_(WA_AL)}>
          <span className="wa-option-flag" aria-hidden>🇦🇱</span>
          <span className="wa-option-body">
            <span className="wa-option-k">{t.ui.albania}</span>
            <span className="wa-option-v">+355 69 655 5559</span>
          </span>
          <span className="wa-option-arrow">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7 H12 M8 3 L12 7 L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </button>

        <div className="wa-foot">{t.ui.whatsappFoot}</div>
      </div>

      <button
        className="wa-fab"
        onClick={() => setOpen((v) => !v)}
        aria-label={t.ui.whatsappTitle}
        aria-expanded={open}
      >
        <span className="wa-fab-pulse" aria-hidden />
        <WhatsAppGlyph />
      </button>
    </div>
  );
};
