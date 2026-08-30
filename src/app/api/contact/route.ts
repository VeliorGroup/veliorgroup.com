import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";
import { createLead, salesforceConfigured, type LeadPayload } from "@/lib/salesforce";

// Lead creation must never be prerendered or cached.
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const MAX_LEN = { name: 100, email: 150, company: 150, message: 4000 } as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * In-memory rate limit: 5 submissions per IP per 10 minutes.
 * Single-instance deployment (systemd, one Node process) so a Map is adequate;
 * move to Redis if the site is ever scaled horizontally.
 */
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear(); // crude memory ceiling
  return recent.length > RATE_MAX;
}

function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  return fwd ? fwd.split(",")[0].trim() : "unknown";
}

/** Last-resort persistence so a Salesforce outage never costs a lead. */
async function spool(payload: LeadPayload, reason: string) {
  try {
    const dir = process.env.LEAD_SPOOL_DIR ?? "/tmp/velior-leads";
    await fs.mkdir(dir, { recursive: true });
    const file = path.join(dir, `lead-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.json`);
    await fs.writeFile(file, JSON.stringify({ reason, payload, at: new Date().toISOString() }, null, 2));
    console.error(`[contact] lead spooled to ${file} (${reason})`);
  } catch (e) {
    // If even the spool fails, at least get it into the journal.
    console.error("[contact] SPOOL FAILED — lead payload follows:", reason, JSON.stringify(payload));
  }
}

function str(v: unknown, max: number): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export async function POST(req: Request) {
  const ip = clientIp(req);
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  // Honeypot: real users never fill a hidden field. Bots do.
  // Answer 200 so the bot believes it succeeded and does not retry.
  if (str(body.website, 200)) {
    return NextResponse.json({ ok: true });
  }

  const name = str(body.name, MAX_LEN.name);
  const email = str(body.email, MAX_LEN.email);
  const company = str(body.company, MAX_LEN.company);
  const message = str(body.message, MAX_LEN.message);
  const phone = str(body.phone, 40);

  const errors: string[] = [];
  if (name.length < 2) errors.push("name");
  if (!EMAIL_RE.test(email)) errors.push("email");
  if (message.length < 10) errors.push("message");
  if (errors.length) {
    return NextResponse.json({ ok: false, error: "validation", fields: errors }, { status: 400 });
  }

  // Salesforce Lead requires LastName and Company; derive sane values.
  const parts = name.split(/\s+/);
  const firstName = parts.length > 1 ? parts.slice(0, -1).join(" ") : "";
  const lastName = parts.length > 1 ? parts[parts.length - 1] : name;

  const utm: Record<string, string> = {};
  for (const k of ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"]) {
    const v = str(body[k], 100);
    if (v) utm[k] = v;
  }
  const referrer = str(body.referrer, 300);
  if (referrer) utm.referrer = referrer;

  // Qualifying answer: which CRM the prospect already runs. Whitelisted so a
  // crafted request cannot inject arbitrary text into the CRM record.
  // Keep in sync with CRM_OPTIONS in src/components/ContactForm.tsx.
  const CRM_VALUES = [
    "salesforce", "dynamics", "hubspot", "sap", "oracle", "zoho",
    "pipedrive", "odoo", "zendesk", "freshworks", "monday",
    "teamsystem", "spreadsheet", "other", "none",
  ];
  const crmRaw = str(body.crm, 40).toLowerCase();
  const crm = CRM_VALUES.includes(crmRaw) ? crmRaw : "";

  const payload: LeadPayload = {
    firstName,
    lastName,
    email,
    company: company || "(not provided)",
    phone,
    message,
    source: "Website Contact Form",
    crm,
    utm,
  };

  if (!salesforceConfigured()) {
    await spool(payload, "salesforce_not_configured");
    return NextResponse.json({ ok: true, queued: true });
  }

  try {
    const { id } = await createLead(payload);
    return NextResponse.json({ ok: true, id });
  } catch (e) {
    await spool(payload, e instanceof Error ? e.message : "unknown_error");
    // The visitor did nothing wrong and the lead is safe on disk: report success.
    return NextResponse.json({ ok: true, queued: true });
  }
}
