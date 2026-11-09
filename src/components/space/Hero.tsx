import type { CSSProperties } from "react";
import { type Lang, localePath } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionaries";
import { HeroIndex } from "./HeroIndex";

/** The first screen (DESIGN.md §5): the strand, the service index wired to it, and the copy. */
export function Hero({ lang }: { lang: Lang }) {
  const d = dictionaries[lang].space;
  const home = localePath(lang, "/");
  const step = (n: number) => ({ "--d": n }) as CSSProperties;
  return (
    <section className="hero" data-zone="lattice" aria-labelledby="hero-title">
      <HeroIndex
        lang={lang}
        more={dictionaries[lang].servicesPage.more}
        label={d.indexLabel}
        services={d.services}
        lead={d.lead}
        intro={
          <>
            <h1 id="hero-title" tabIndex={-1} className="hero-title enter" style={step(4)}>
              {d.title}
            </h1>
            {/* Phones show the lead here; the readout below the title is a desktop element. */}
            <p className="hero-lead-m enter" style={step(5)}>
              {d.lead}
            </p>
          </>
        }
        actions={
          <div className="hero-ctas enter" style={step(6)}>
            <a href={`${home}#contact`} className="btn btn-primary btn-lg">
              {d.ctaTalk}
              <span className="btn-arrow" aria-hidden="true">
                →
              </span>
            </a>
            <a href={localePath(lang, "/work")} className="btn btn-white btn-lg">
              {d.ctaWork}
            </a>
          </div>
        }
      />

    </section>
  );
}
