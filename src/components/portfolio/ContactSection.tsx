import Link from "next/link";
import { niches, NICHES } from "@/data/niches";
import { imageCredits } from "@/data/projects";
import { hasLegalDetails, studio } from "@/data/studio";
import type { Lang } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionaries";
import { pagePath } from "@/i18n/routes";
import { ContactForm } from "./ContactForm";
import { FooterWordmark } from "./FooterWordmark";

export function ContactSection({ lang }: { lang: Lang }) {
  const dict = dictionaries[lang];
  const d = dict.contact;
  const r = dict.reach;
  const shortcuts = [
    studio.calendarUrl && { href: studio.calendarUrl, label: r.calendar, external: true },
    studio.whatsapp && { href: `https://wa.me/${studio.whatsapp}`, label: r.whatsapp, external: true },
    studio.phone && { href: `tel:${studio.phone.replace(/\s/g, "")}`, label: `${r.call} ${studio.phone}`, external: false },
  ].filter(Boolean) as { href: string; label: string; external: boolean }[];

  return (
    <footer id="contact" className="overflow-hidden bg-ink px-[var(--gutter)] pt-24 pb-8 text-paper md:pt-32">
      <div className="grid gap-12 md:grid-cols-12 md:gap-8">
        <h2 className="label text-paper/60 md:col-span-3">{d.title}</h2>
        <div className="md:col-span-8">
          <p className="font-serif text-[26px] leading-[1.18] tracking-[-0.012em] md:text-[36px]">{d.statement}</p>
          {shortcuts.length > 0 && (
            <ul className="mt-10 flex flex-wrap gap-3">
              {shortcuts.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    {...(s.external ? { target: "_blank", rel: "noreferrer" } : {})}
                    className="label inline-flex min-h-11 items-center rounded-full border border-paper/40 px-5 transition-colors hover:bg-paper hover:text-ink"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-14">
            <h3 className="label mb-8 text-paper/60">{dict.form.title}</h3>
            <ContactForm lang={lang} />
          </div>
          <p className="mt-12 text-[15px] text-paper/60">
            {r.or}:{" "}
            <a href={`mailto:${studio.email}?subject=${encodeURIComponent(d.subject)}`} className="link-quiet text-paper">
              {studio.email}
            </a>
          </p>
        </div>
      </div>

      <div className="mt-24 md:mt-36">
        <FooterWordmark />
      </div>

      <nav aria-label={dict.nav.main} className="label mt-10 grid gap-6 text-paper/60 md:grid-cols-12 md:gap-8">
        <ul className="grid content-start gap-2 md:col-span-3">
          <li>
            <Link href={pagePath(lang, "about")} className="link-quiet">
              {dict.nav.about}
            </Link>
          </li>
          <li>
            <Link href={pagePath(lang, "journal")} className="link-quiet">
              {dict.nav.journal}
            </Link>
          </li>
          <li>
            <Link href={pagePath(lang, "privacy")} className="link-quiet">
              {dict.legal.privacy}
            </Link>
          </li>
        </ul>
        <ul className="grid content-start gap-2 md:col-span-4">
          {NICHES.map((n) => (
            <li key={n}>
              <Link href={pagePath(lang, "for", niches[n][lang].slug)} className="link-quiet">
                {niches[n][lang].title}
              </Link>
            </li>
          ))}
        </ul>
        <div className="md:col-span-5">
          <p>{d.signature}</p>
          {hasLegalDetails && (
            <p className="mt-2 normal-case tracking-normal">
              {studio.owner} · NIP {studio.nip}
              {studio.regon && ` · REGON ${studio.regon}`}
              {studio.address && ` · ${studio.address}`}
            </p>
          )}
        </div>
      </nav>

      <p className="label mt-8 normal-case tracking-normal text-paper/50">
        {d.credits}{" "}
        {imageCredits.map((c, i) => (
          <span key={c.url}>
            <a href={c.url} className="underline decoration-paper/30 underline-offset-2">
              {c.title}
            </a>{" "}
            {d.by} {c.author}, {c.licence}
            {i < imageCredits.length - 1 ? "; " : d.via}
          </span>
        ))}
      </p>
    </footer>
  );
}
