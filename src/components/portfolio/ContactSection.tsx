import Link from "next/link";
import { niches, NICHES } from "@/data/niches";
import { imageCredits } from "@/data/projects";
import { hasLegalDetails, mapsUrl, studio, studioAddress, telHref } from "@/data/studio";
import type { Lang } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionaries";
import { pagePath } from "@/i18n/routes";
import { SectionHead } from "@/components/space/SectionHead";
import { ContactForm } from "./ContactForm";
import { FooterWordmark } from "./FooterWordmark";

export function ContactSection({ lang }: { lang: Lang }) {
  const dict = dictionaries[lang];
  const d = dict.contact;
  const r = dict.reach;
  const shortcuts = [
    studio.calendarUrl && { href: studio.calendarUrl, label: r.calendar, external: true },
    studio.whatsapp && { href: `https://wa.me/${studio.whatsapp}`, label: r.whatsapp, external: true },
    studio.phone && { href: telHref(studio.phone), label: `${r.call} ${studio.phone}`, external: false },
  ].filter(Boolean) as { href: string; label: string; external: boolean }[];

  return (
    <footer id="contact" aria-labelledby="contact-title" data-strand-dark className="on-rail on-dark overflow-hidden bg-ink px-[var(--gutter)] pt-24 pb-8 text-paper md:pt-32">
      <SectionHead mark="→" title={d.title} id="contact-title">
        {d.statement}
      </SectionHead>
      <div className="mx-auto max-w-[760px]">
        <div>
          {shortcuts.length > 0 && (
            <ul className="mt-10 flex flex-wrap justify-center gap-3">
              {shortcuts.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    {...(s.external ? { target: "_blank", rel: "noreferrer" } : {})}
                    className="btn btn-line-light"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-14">
            <h3 className="tech mb-8 text-center">{dict.form.title}</h3>
            <ContactForm lang={lang} />
          </div>
          <p className="mt-12 text-center text-[15px] text-paper/60">
            {r.or}:{" "}
            <a href={`mailto:${studio.email}?subject=${encodeURIComponent(d.subject)}`} className="contact-mail link-quiet text-paper">
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
          <address className="mt-2 grid gap-1 not-italic normal-case tracking-normal">
            <a href={mapsUrl} target="_blank" rel="noreferrer" className="link-quiet">
              {studioAddress}
            </a>
            <a href={telHref(studio.phone)} className="link-quiet">
              {studio.phone}
            </a>
          </address>
          {hasLegalDetails && (
            <p className="mt-2 normal-case tracking-normal">
              {studio.owner} · NIP {studio.nip}
              {studio.regon && ` · REGON ${studio.regon}`}
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
