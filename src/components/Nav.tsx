"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useLang } from "@/lib/lang";
import type { Lang } from "@/lib/copy";
import { useNavigate, type Route } from "@/lib/router";
import { VeliorMark } from "./atoms";

const LANGS: { code: Lang; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "it", label: "Italiano", flag: "🇮🇹" },
  { code: "sq", label: "Shqip", flag: "🇦🇱" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "ar", label: "العربية", flag: "🇸🇦" },
];

const LangPicker = () => {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const current = LANGS.find((l) => l.code === lang) ?? LANGS[0];

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className={`lang-picker ${open ? "is-open" : ""}`} ref={ref}>
      <button
        className="lang-toggle"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="lang-flag" aria-hidden>{current.flag}</span>
        <span className="lang-code">{current.code.toUpperCase()}</span>
        <svg className="lang-caret" width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M2 4 L5 7 L8 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <ul className="lang-menu" role="listbox">
        {LANGS.map((l) => (
          <li key={l.code}>
            <button
              className={`lang-option ${l.code === lang ? "is-active" : ""}`}
              onClick={() => {
                setLang(l.code);
                setOpen(false);
              }}
              role="option"
              aria-selected={l.code === lang}
            >
              <span className="lang-flag" aria-hidden>{l.flag}</span>
              <span className="lang-name">{l.label}</span>
              <span className="lang-code-sm">{l.code.toUpperCase()}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ROUTES: { key: Route; path: string }[] = [
  { key: "home", path: "/" },
  { key: "about", path: "/about" },
  { key: "services", path: "/services" },
  { key: "contact", path: "/contact" },
];

export const Nav = () => {
  const { lang, setLang, t } = useLang();
  const navigate = useNavigate();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (route: Route, path: string) => {
    if (route === "home") return pathname === "/" || pathname === "";
    return pathname?.startsWith(path) ?? false;
  };

  return (
    <header className={`nav ${scrolled ? "nav-scrolled" : ""}`}>
      <div className="nav-inner container">
        <VeliorMark />
        <nav className="nav-pill">
          {ROUTES.map(({ key, path }) => (
            <a
              key={key}
              href={path}
              onClick={(e) => {
                e.preventDefault();
                navigate(key);
              }}
              className={`nav-link ${isActive(key, path) ? "active" : ""}`}
            >
              {t.nav[key]}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <LangPicker />
          <button className="btn btn-gradient nav-cta" onClick={() => navigate("contact")}>
            {t.nav.cta}
          </button>
          <button className="nav-burger" onClick={() => setOpen(!open)} aria-label="Menu">
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
      {open && (
        <div className="nav-mobile">
          {ROUTES.map(({ key, path }) => (
            <a
              key={key}
              href={path}
              onClick={(e) => {
                e.preventDefault();
                navigate(key);
                setOpen(false);
              }}
              className={`nav-mobile-link ${isActive(key, path) ? "active" : ""}`}
            >
              {t.nav[key]}
            </a>
          ))}
          <button
            className="btn btn-gradient"
            style={{ marginTop: 16 }}
            onClick={() => {
              navigate("contact");
              setOpen(false);
            }}
          >
            {t.nav.cta}
          </button>
        </div>
      )}
    </header>
  );
};
