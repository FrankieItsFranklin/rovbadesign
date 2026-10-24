// Contact form → e-mail via Resend (https://resend.com/docs/api-reference/emails/send-email).
// Env: RESEND_API_KEY (required), CONTACT_TO (where requests go), CONTACT_FROM (a verified sender,
// e.g. "ROVBA Design <formularz@rovbadesign.pl>"; until the domain is verified use "onboarding@resend.dev").
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const LIMITS = { name: 120, contact: 200, business: 80, topic: 80, site: 300, message: 4000 } as const;
type Field = keyof typeof LIMITS;

// Small in-memory throttle per instance: enough against a script hammering one lambda.
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.replace(/[\u0000-\u001f\u007f]+/g, " ").trim().slice(0, max) : "");
const escape = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  // Bots fill the hidden field or submit faster than a person can type.
  if (clean(body.company_url, 200) || Number(body.elapsed) < 2500) return NextResponse.json({ ok: true });

  const data = Object.fromEntries((Object.keys(LIMITS) as Field[]).map((k) => [k, clean(body[k], LIMITS[k])])) as Record<Field, string>;
  if (!data.name || !data.contact || data.message.length < 5 || body.consent !== true) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 422 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  hits.set(ip, [...recent, now]);

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  if (!key || !to) return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });

  const rows: [string, string][] = [
    ["Imię", data.name],
    ["Kontakt", data.contact],
    ["Firma", data.business],
    ["Temat", data.topic],
    ["Strona", data.site],
    ["Język", body.lang === "pl" ? "pl" : "en"],
  ];
  const html = `<table cellpadding="6">${rows
    .filter(([, v]) => v)
    .map(([k, v]) => `<tr><td><b>${k}</b></td><td>${escape(v)}</td></tr>`)
    .join("")}</table><p style="white-space:pre-wrap">${escape(data.message)}</p>`;
  const replyTo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.contact) ? data.contact : undefined;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM || "ROVBA Design <onboarding@resend.dev>",
      to: to.split(",").map((s) => s.trim()),
      reply_to: replyTo,
      subject: `Zapytanie: ${data.topic || "strona"} — ${data.name}`,
      html,
      text: `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\n${data.message}`,
    }),
  });
  if (!res.ok) return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  return NextResponse.json({ ok: true });
}
