"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useLang } from "@/lib/lang";
import { useNavigate, type Route } from "@/lib/router";
import { VeliorMark } from "./atoms";

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
          <button
            className="lang-toggle"
            onClick={() => setLang(lang === "en" ? "it" : lang === "it" ? "sq" : "en")}
          >
            <span className={lang === "en" ? "active" : ""}>EN</span>
            <span className="lang-divider">/</span>
            <span className={lang === "it" ? "active" : ""}>IT</span>
            <span className="lang-divider">/</span>
            <span className={lang === "sq" ? "active" : ""}>SQ</span>
          </button>
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
