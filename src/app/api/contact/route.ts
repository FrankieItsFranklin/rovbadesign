// Contact form → a message from the studio's Telegram bot (https://core.telegram.org/bots/api#sendmessage).
// Env: TELEGRAM_BOT_TOKEN (from @BotFather), TELEGRAM_CHAT_ID (who receives the requests; several ids
// separated by commas, e.g. you and a group).
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const LIMITS = { name: 120, contact: 200, business: 80, topic: 80, site: 300, message: 4000 } as const;
type Field = keyof typeof LIMITS;

// Small in-memory throttle per instance: enough against a script hammering one lambda.
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.replace(/[\u0000-\u001f\u007f]+/g, " ").trim().slice(0, max) : "");
const escape = (s: string) => s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c]!);

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

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chats = (process.env.TELEGRAM_CHAT_ID ?? "").split(",").map((c) => c.trim()).filter(Boolean);
  if (!token || !chats.length) return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });

  const lang = body.lang === "pl" ? "PL" : "EN";
  const rows: [string, string][] = [
    ["Imię", data.name],
    ["Kontakt", data.contact],
    ["Firma", data.business],
    ["Temat", data.topic],
    ["Strona", data.site],
  ];
  // Telegram's HTML mode needs only &, < and > escaped; a message may hold up to 4096 characters.
  const text = [
    `<b>Nowe zapytanie z rovbadesign.pl</b> · ${lang}`,
    "",
    ...rows.filter(([, v]) => v).map(([k, v]) => `<b>${k}:</b> ${escape(v)}`),
    "",
    escape(data.message),
  ]
    .join("\n")
    .slice(0, 4000);

  const sent = await Promise.all(
    chats.map(async (chat_id) => {
      const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id, text, parse_mode: "HTML", link_preview_options: { is_disabled: true } }),
      });
      if (res.ok) return true;
      // Telegram explains refusals (wrong chat id, bot never started, bad token); keep them in the server logs.
      console.error("Telegram refused the message", chat_id, res.status, await res.text().catch(() => ""));
      return false;
    }),
  );
  if (!sent.some(Boolean)) return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  return NextResponse.json({ ok: true });
}
