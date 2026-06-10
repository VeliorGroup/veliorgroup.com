"use client";

import { useLang } from "@/lib/lang";
import { CONTACT } from "@/lib/contacts";
import { pathOf, useNavigate } from "@/lib/router";
import { SalesforcePartnerBadge, VeliorMark } from "./atoms";

export const Footer = () => {
  const { t } = useLang();
  const navigate = useNavigate();

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <VeliorMark size={40} />
          <p className="footer-tagline">{t.footer.tagline}</p>
          <SalesforcePartnerBadge compact />
        </div>
        <div className="footer-cols">
          {t.footer.sections.map((s, i) => (
            <div key={i} className="footer-col">
              <div className="footer-col-title">{s.t}</div>
              {s.l.map(([label, route], j) => (
                <a
                  key={j}
                  href={pathOf(route)}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(route);
                  }}
                  className="footer-link"
                >
                  {label}
                </a>
              ))}
            </div>
          ))}
          <div className="footer-col">
            <div className="footer-col-title">{t.ui.contact}</div>
            <a className="footer-link" href={`mailto:${CONTACT.email}`}>
              {CONTACT.email}
            </a>
            <a className="footer-link" href="#">
              LinkedIn
            </a>
            <a className="footer-link" href="#">
              Instagram
            </a>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <span className="small">{t.footer.legal}</span>
        <div className="footer-bottom-links">
          <a href="#" className="small">
            {t.footer.privacy}
          </a>
          <a href="#" className="small">
            {t.footer.cookies}
          </a>
        </div>
      </div>
      <div className="footer-wordmark">VELIOR</div>
    </footer>
  );
};
