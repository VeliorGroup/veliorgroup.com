"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/lang";
import { CONTACT, waLink } from "@/lib/contacts";
import { WhatsAppGlyph } from "./atoms";

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
    window.open(waLink(n), "_blank", "noopener,noreferrer");
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

        <button className="wa-option" onClick={() => open_(CONTACT.whatsapp.it.e164)}>
          <span className="wa-option-flag" aria-hidden>🇮🇹</span>
          <span className="wa-option-body">
            <span className="wa-option-k">{t.ui.italy}</span>
            <span className="wa-option-v">{CONTACT.whatsapp.it.display}</span>
          </span>
        </button>

        <button className="wa-option" onClick={() => open_(CONTACT.whatsapp.al.e164)}>
          <span className="wa-option-flag" aria-hidden>🇦🇱</span>
          <span className="wa-option-body">
            <span className="wa-option-k">{t.ui.albania}</span>
            <span className="wa-option-v">{CONTACT.whatsapp.al.display}</span>
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
