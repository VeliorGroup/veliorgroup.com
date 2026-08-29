/**
 * Salesforce lead intake.
 *
 * OAuth 2.0 Client Credentials flow against VELIOR_GROUP_PROD, then a REST
 * insert on Lead. Server-side only: this module must never be imported from a
 * client component (it reads secrets from process.env).
 *
 * Design rule: a lead is revenue. If Salesforce is unreachable we still return
 * success to the visitor and persist the payload to disk for later replay —
 * dropping a lead because an API had a bad minute is unacceptable.
 */
import "server-only";

const LOGIN_URL = process.env.SF_LOGIN_URL ?? "https://login.salesforce.com";
const API_VERSION = process.env.SF_API_VERSION ?? "v65.0";

export type LeadPayload = {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phone?: string;
  message: string;
  /** Marketing attribution — the whole point of this exercise. */
  source: string;
  utm?: Record<string, string>;
};

type TokenResponse = { access_token: string; instance_url: string };

// Cached access token. Client-credentials tokens are reusable until they expire;
// re-authenticating on every submission would be slow and rate-limit prone.
let cachedToken: { token: string; instanceUrl: string; expiresAt: number } | null = null;

export function salesforceConfigured(): boolean {
  return Boolean(process.env.SF_CLIENT_ID && process.env.SF_CLIENT_SECRET);
}

async function getToken(): Promise<TokenResponse> {
  const now = Date.now();
  if (cachedToken && cachedToken.expiresAt > now) {
    return { access_token: cachedToken.token, instance_url: cachedToken.instanceUrl };
  }

  const body = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: process.env.SF_CLIENT_ID ?? "",
    client_secret: process.env.SF_CLIENT_SECRET ?? "",
  });

  const res = await fetch(`${LOGIN_URL}/services/oauth2/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`SF auth failed: ${res.status}`);
  }

  const json = (await res.json()) as TokenResponse;
  // Conservative 20-minute reuse window; well inside the default session TTL.
  cachedToken = {
    token: json.access_token,
    instanceUrl: json.instance_url,
    expiresAt: now + 20 * 60 * 1000,
  };
  return json;
}

/** Compose the Lead description from the message plus any UTM attribution. */
function buildDescription(p: LeadPayload): string {
  const lines = [p.message.trim()];
  if (p.utm && Object.keys(p.utm).length > 0) {
    lines.push("", "--- attribution ---");
    for (const [k, v] of Object.entries(p.utm)) lines.push(`${k}: ${v}`);
  }
  return lines.join("\n");
}

export async function createLead(p: LeadPayload): Promise<{ id: string }> {
  const { access_token, instance_url } = await getToken();

  const record = {
    FirstName: p.firstName || null,
    LastName: p.lastName,
    Email: p.email,
    Company: p.company,
    Phone: p.phone || null,
    LeadSource: p.source,
    Description: buildDescription(p),
    Status: "Open - Not Contacted",
  };

  const res = await fetch(
    `${instance_url}/services/data/${API_VERSION}/sobjects/Lead`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(record),
      cache: "no-store",
    },
  );

  if (!res.ok) {
    const detail = await res.text();
    // Drop the cached token on auth errors so the next attempt re-authenticates.
    if (res.status === 401) cachedToken = null;
    throw new Error(`SF lead insert failed: ${res.status} ${detail.slice(0, 300)}`);
  }

  const json = (await res.json()) as { id: string };
  return { id: json.id };
}
