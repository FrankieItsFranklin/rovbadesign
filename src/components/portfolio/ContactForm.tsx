"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { studio } from "@/data/studio";
import type { Lang } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionaries";
import { pagePath } from "@/i18n/routes";

type State = "idle" | "sending" | "ok" | "error" | "invalid";

/** Fields come pre-filled from links such as #contact?topic=… (packages, the free review). */
export const PREFILL_EVENT = "rovba:prefill";
export type Prefill = { topic?: string; message?: string };

export function ContactForm({ lang }: { lang: Lang }) {
  const d = dictionaries[lang].form;
  const [state, setState] = useState<State>("idle");
  const started = useRef(Date.now());
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const apply = (e: Event) => {
      const p = (e as CustomEvent<Prefill>).detail;
      const f = formRef.current;
      if (!f) return;
      if (p.topic) (f.elements.namedItem("topic") as HTMLSelectElement).value = p.topic;
      const msg = f.elements.namedItem("message") as HTMLTextAreaElement;
      if (p.message && !msg.value) msg.value = p.message;
      (f.elements.namedItem("name") as HTMLInputElement).focus({ preventScroll: true });
    };
    window.addEventListener(PREFILL_EVENT, apply);
    return () => window.removeEventListener(PREFILL_EVENT, apply);
  }, []);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const text = (k: string) => String(f.get(k) ?? "");
    const payload = {
      name: text("name"),
      contact: text("contact"),
      business: text("business"),
      topic: text("topic"),
      site: text("site"),
      message: text("message"),
      company_url: text("company_url"),
      consent: f.get("consent") === "on",
      elapsed: Date.now() - started.current,
      lang,
    };
    if (!payload.name.trim() || !payload.contact.trim() || payload.message.trim().length < 5 || !payload.consent) {
      setState("invalid");
      return;
    }
    setState("sending");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      setState(res.ok ? "ok" : "error");
      if (res.ok) formRef.current?.reset();
    } catch {
      setState("error");
    }
  }

  if (state === "ok") {
    return (
      <p role="status" className="max-w-[36ch] font-serif text-[26px] leading-[1.2]">
        {d.ok}
      </p>
    );
  }

  const field = "w-full border-b border-paper/35 bg-transparent py-3 text-[18px] text-paper outline-none transition-colors placeholder:text-paper/40 focus:border-paper";
  return (
    <form ref={formRef} onSubmit={submit} noValidate className="grid gap-x-8 gap-y-7 md:grid-cols-2" aria-describedby="form-status">
      <label className="grid gap-1">
        <span className="label text-paper/60">{d.name}</span>
        <input name="name" autoComplete="name" required maxLength={120} className={field} />
      </label>
      <label className="grid gap-1">
        <span className="label text-paper/60">{d.contact}</span>
        <input name="contact" autoComplete="email" required maxLength={200} className={field} />
      </label>
      <label className="grid gap-1">
        <span className="label text-paper/60">{d.business}</span>
        <select name="business" className={`${field} appearance-none`} defaultValue="">
          <option value="" className="text-ink">—</option>
          {d.businessOptions.map((o) => (
            <option key={o} className="text-ink">
              {o}
            </option>
          ))}
        </select>
      </label>
      <label className="grid gap-1">
        <span className="label text-paper/60">{d.topic}</span>
        <select name="topic" className={`${field} appearance-none`} defaultValue={d.topicOptions[0]}>
          {d.topicOptions.map((o) => (
            <option key={o} className="text-ink">
              {o}
            </option>
          ))}
        </select>
      </label>
      <label className="grid gap-1 md:col-span-2">
        <span className="label text-paper/60">{d.site}</span>
        <input name="site" type="url" inputMode="url" placeholder="https://" maxLength={300} className={field} />
      </label>
      <label className="grid gap-1 md:col-span-2">
        <span className="label text-paper/60">{d.message}</span>
        <textarea name="message" rows={4} required maxLength={4000} placeholder={d.messageHint} className={`${field} resize-y`} />
      </label>
      {/* Honeypot: hidden from people and screen readers, filled only by bots. */}
      <input name="company_url" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-px w-px opacity-0" />
      <label className="flex items-start gap-3 text-[15px] text-paper/80 md:col-span-2">
        <input type="checkbox" name="consent" required className="mt-1 size-4 accent-paper" />
        <span>
          {d.consent}{" "}
          <Link href={pagePath(lang, "privacy")} className="underline decoration-paper/40 underline-offset-2">
            {d.privacy}
          </Link>
        </span>
      </label>
      <div className="flex flex-wrap items-center gap-6 md:col-span-2">
        <button
          type="submit"
          disabled={state === "sending"}
          className="label min-h-12 rounded-full bg-paper px-8 text-ink transition-transform duration-150 ease-out active:scale-[0.97] disabled:opacity-60"
        >
          {state === "sending" ? d.sending : d.send}
        </button>
        <p id="form-status" role="status" className="text-[15px] text-paper/80">
          {state === "invalid" && d.required}
          {state === "error" && (
            <>
              {d.error}{" "}
              <a href={`mailto:${studio.email}`} className="underline underline-offset-2">
                {studio.email}
              </a>
            </>
          )}
        </p>
      </div>
    </form>
  );
}
