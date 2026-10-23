import { imageCredits } from "@/data/projects";
import type { Lang } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionaries";

// Placeholder address until the studio's real mailbox is set up.
export const STUDIO_EMAIL = "hello@rovba.design";

export function ContactSection({ lang }: { lang: Lang }) {
  const d = dictionaries[lang].contact;
  return (
    <footer id="contact" className="overflow-hidden bg-ink px-[var(--gutter)] pt-24 pb-8 text-paper md:pt-32">
      <div className="grid gap-12 md:grid-cols-12 md:gap-8">
        <h2 className="label text-paper/60 md:col-span-3">{d.title}</h2>
        <div className="md:col-span-8">
          <p className="font-serif text-[26px] leading-[1.18] tracking-[-0.012em] md:text-[36px]">{d.statement}</p>
          <a
            href={`mailto:${STUDIO_EMAIL}?subject=${encodeURIComponent(d.subject)}`}
            className="link-quiet mt-10 inline-block text-[22px] md:text-[28px]"
          >
            {STUDIO_EMAIL}
          </a>
        </div>
      </div>
      <p aria-hidden="true" className="mt-24 text-[26.5vw] leading-[0.78] font-bold tracking-[-0.055em] md:mt-36 md:text-[27.6vw]">
        ROVBA
      </p>
      <div className="label mt-10 grid gap-4 text-paper/60 md:grid-cols-12 md:gap-8">
        <p className="md:col-span-3">{d.signature}</p>
        <p className="normal-case tracking-normal md:col-span-9">
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
      </div>
    </footer>
  );
}
