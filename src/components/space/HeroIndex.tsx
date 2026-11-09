"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Link from "next/link";
import { SERVICES } from "@/data/services";
import type { Lang } from "@/i18n/config";
import { pagePath } from "@/i18n/routes";
import { pageY, selectOnStrand } from "./strand";

type Service = { name: string; text: string; facts: string[][] };

/**
 * The service index wired to the strand. Choosing a service (hover, focus or tap) turns its leader line red and sends
 * the strand a level: a red packet runs along the strand to it, and the plates there turn red and make a 120° turn
 * (StrandCanvas). Choosing another service turns those back first. The rail column only holds the strand's place.
 */
export function HeroIndex({ lang, label, more, services, lead, intro, actions }: { lang: Lang; label: string; more: string; services: Service[]; lead: string; intro: React.ReactNode; actions: React.ReactNode }) {
  const [active, setActive] = useState<number | null>(null);
  // Leaving the page (a client-side navigation keeps the strand) forgets the chosen level.
  useEffect(() => () => selectOnStrand(null), []);

  const select = (i: number, el: HTMLElement) => {
    if (i === active) return;
    setActive(i);
    selectOnStrand(pageY(el));
  };

  const current = active === null ? null : services[active];

  return (
    <>
      <div className="hero-column" aria-hidden="true" />

      <div className="hero-index">
        <p className="tech hero-index-label enter" style={{ "--d": 3 } as CSSProperties}>
          {label}
        </p>
        <ul>
          {services.map((s, i) => (
            <li key={s.name}>
              <button
                type="button"
                className="idx-item"
                aria-pressed={active === i}
                aria-controls="hero-readout"
                data-strand-wire
                onMouseEnter={(e) => select(i, e.currentTarget)}
                onFocus={(e) => select(i, e.currentTarget)}
                onClick={(e) => select(i, e.currentTarget)}
                style={{ "--d": i } as CSSProperties}
              >
                <span className="idx-num">{String(i + 1).padStart(2, "0")}</span>
                {s.name}
              </button>
              {/* On a phone the description opens under the item instead of in the readout. */}
              {active === i && (
                <div className="idx-detail">
                  <p>{s.text}</p>
                  <Link href={pagePath(lang, "services", SERVICES[i][lang].slug)} className="link-quiet label mt-2 inline-block">
                    {more} →
                  </Link>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="hero-copy">
        {intro}
        <div id="hero-readout" className="readout" aria-live="polite" key={active ?? "lead"} data-lead={active === null || undefined}>
          {current ? (
            <>
              <p className="tech">
                {String((active ?? 0) + 1).padStart(2, "0")} / {current.name}
              </p>
              <p className="readout-text">{current.text}</p>
              <dl className="readout-facts">
                {current.facts.map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
              <Link href={pagePath(lang, "services", SERVICES[active ?? 0][lang].slug)} className="link-quiet label mt-5 inline-block">
                {more} →
              </Link>
            </>
          ) : (
            <p className="readout-text">{lead}</p>
          )}
        </div>
        {actions}
      </div>
    </>
  );
}
