"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/lang";
import type { Lang } from "@/lib/copy";

/**
 * Contact form -> POST /api/contact -> Salesforce Lead.
 *
 * Labels live here rather than in copy.ts to keep this component
 * self-contained; copy.ts carries the marketing prose, this carries UI chrome.
 */
const L: Record<Lang, Record<string, string>> = {
  en: { title: "Send a brief", name: "Name", email: "Work email", company: "Company", phone: "Phone (optional)", message: "What do you need?", send: "Send", sending: "Sending…", ok: "Thanks — we reply within one business day.", err: "Something went wrong. Write to us on WhatsApp or by email.", req: "Please check the highlighted fields.", ph: "Goals, current stack, timeline…", sf: "Which CRM do you use?" },
  it: { title: "Raccontaci il progetto", name: "Nome", email: "Email aziendale", company: "Azienda", phone: "Telefono (facoltativo)", message: "Di cosa hai bisogno?", send: "Invia", sending: "Invio…", ok: "Grazie — rispondiamo entro un giorno lavorativo.", err: "Qualcosa è andato storto. Scrivici su WhatsApp o via email.", req: "Controlla i campi evidenziati.", ph: "Obiettivi, stack attuale, tempistiche…", sf: "Quale CRM usate?" },
  sq: { title: "Na trego projektin", name: "Emri", email: "Email pune", company: "Kompania", phone: "Telefoni (opsional)", message: "Për çfarë ke nevojë?", send: "Dërgo", sending: "Duke dërguar…", ok: "Faleminderit — përgjigjemi brenda një dite pune.", err: "Diçka shkoi keq. Na shkruaj në WhatsApp ose email.", req: "Kontrollo fushat e theksuara.", ph: "Objektivat, stack-u aktual, afatet…", sf: "Cilin CRM përdorni?" },
  de: { title: "Projekt beschreiben", name: "Name", email: "Geschäftliche E-Mail", company: "Unternehmen", phone: "Telefon (optional)", message: "Was brauchen Sie?", send: "Senden", sending: "Senden…", ok: "Danke — wir antworten innerhalb eines Werktags.", err: "Etwas ist schiefgelaufen. Schreiben Sie uns per WhatsApp oder E-Mail.", req: "Bitte markierte Felder prüfen.", ph: "Ziele, aktueller Stack, Zeitplan…", sf: "Welches CRM nutzen Sie?" },
  fr: { title: "Décrivez le projet", name: "Nom", email: "E-mail professionnel", company: "Entreprise", phone: "Téléphone (facultatif)", message: "De quoi avez-vous besoin ?", send: "Envoyer", sending: "Envoi…", ok: "Merci — nous répondons sous un jour ouvré.", err: "Une erreur est survenue. Écrivez-nous sur WhatsApp ou par e-mail.", req: "Vérifiez les champs indiqués.", ph: "Objectifs, stack actuelle, délais…", sf: "Quel CRM utilisez-vous ?" },
  ar: { title: "صف مشروعك", name: "الاسم", email: "البريد المهني", company: "الشركة", phone: "الهاتف (اختياري)", message: "ما الذي تحتاجه؟", send: "إرسال", sending: "جارٍ الإرسال…", ok: "شكرًا — نرد خلال يوم عمل واحد.", err: "حدث خطأ ما. راسلنا عبر واتساب أو البريد.", req: "يرجى مراجعة الحقول المحددة.", ph: "الأهداف، النظام الحالي، الجدول الزمني…", sf: "ما الـ CRM الذي تستخدمه؟" },
};

/**
 * The single qualifying question.
 *
 * The expensive losses were SMEs who could not fund CRM licences, and that
 * only surfaced after several meetings. A company already running any CRM
 * has proven it will pay for one; a company with none is the risky segment.
 * Asking which CRM (not whether it is Salesforce) also routes the lead to
 * the right practice. Optional, so it never costs a conversion.
 */
const CRM_OPTIONS: [string, string][] = [
  ["", "—"],
  ["salesforce", "Salesforce"],
  ["dynamics", "Microsoft Dynamics 365"],
  ["hubspot", "HubSpot"],
  ["sap", "SAP"],
  ["oracle", "Oracle / NetSuite"],
  ["zoho", "Zoho CRM"],
  ["pipedrive", "Pipedrive"],
  ["odoo", "Odoo"],
  ["zendesk", "Zendesk Sell"],
  ["freshworks", "Freshworks"],
  ["monday", "monday CRM"],
  ["teamsystem", "TeamSystem / ERP"],
  ["spreadsheet", "Excel / spreadsheets"],
  ["other", "Other"],
  ["none", "No CRM yet"],
];

type State = "idle" | "sending" | "sent" | "error";

export const ContactForm = () => {
  const { lang } = useLang();
  const c = L[lang] ?? L.en;

  const [state, setState] = useState<State>("idle");
  const [bad, setBad] = useState<string[]>([]);
  const attribution = useRef<Record<string, string>>({});

  // Capture UTM parameters and referrer once on mount — this is the
  // attribution data the CRM has never had.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const acc: Record<string, string> = {};
    for (const k of ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"]) {
      const v = params.get(k);
      if (v) acc[k] = v;
    }
    if (document.referrer && !document.referrer.includes("veliorgroup.com")) {
      acc.referrer = document.referrer;
    }
    attribution.current = acc;
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "sending") return;

    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      company: String(fd.get("company") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      message: String(fd.get("message") ?? ""),
      crm: String(fd.get("crm") ?? ""),
      website: String(fd.get("website") ?? ""), // honeypot
      ...attribution.current,
    };

    setState("sending");
    setBad([]);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (res.ok && json.ok) {
        setState("sent");
      } else {
        setBad(Array.isArray(json.fields) ? json.fields : []);
        setState("error");
      }
    } catch {
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <div className="contact-form-done" role="status">
        <p className="body">{c.ok}</p>
      </div>
    );
  }

  const invalid = (f: string) => (bad.includes(f) ? { borderColor: "#e5484d" } : undefined);

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate>
      <h2 className="h2 contact-form-title">{c.title}</h2>

      <label className="cf-field">
        <span className="cf-label">{c.name}</span>
        <input name="name" required autoComplete="name" style={invalid("name")} />
      </label>

      <label className="cf-field">
        <span className="cf-label">{c.email}</span>
        <input name="email" type="email" required autoComplete="email" style={invalid("email")} />
      </label>

      <label className="cf-field">
        <span className="cf-label">{c.company}</span>
        <input name="company" autoComplete="organization" />
      </label>

      <label className="cf-field">
        <span className="cf-label">{c.phone}</span>
        <input name="phone" type="tel" autoComplete="tel" />
      </label>

      <label className="cf-field">
        <span className="cf-label">{c.sf}</span>
        <select name="crm" defaultValue="">
          {CRM_OPTIONS.map(([v, label]) => (
            <option key={v} value={v}>{label}</option>
          ))}
        </select>
      </label>

      <label className="cf-field">
        <span className="cf-label">{c.message}</span>
        <textarea name="message" rows={5} required placeholder={c.ph} style={invalid("message")} />
      </label>

      {/* Honeypot: visually hidden, never focusable by a human. */}
      <div aria-hidden style={{ position: "absolute", left: "-9999px", opacity: 0 }}>
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <button className="btn btn-primary cf-submit" type="submit" disabled={state === "sending"}>
        {state === "sending" ? c.sending : c.send}
      </button>

      {state === "error" && (
        <p className="cf-error" role="alert">{bad.length ? c.req : c.err}</p>
      )}
    </form>
  );
};
