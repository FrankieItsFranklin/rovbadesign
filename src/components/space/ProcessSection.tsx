import type { CSSProperties } from "react";
import type { Lang } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionaries";
import { SectionHead } from "./SectionHead";

/** How we work: four steps down the page, each wired to the strand, which marks the step in view. */
export function ProcessSection({ lang }: { lang: Lang }) {
  const d = dictionaries[lang].process;
  return (
    <section id="process" aria-labelledby="process-title" className="on-rail scroll-mt-6 px-[var(--gutter)] py-28 md:py-40">
      <SectionHead num={2} title={d.title} id="process-title">
        {d.statement}
      </SectionHead>
      <ol className="steps mt-16 md:mt-24">
        {d.steps.map((s, i) => (
          <li key={s.name} className="step" style={{ "--i": i } as CSSProperties}>
            <p className="step-num strand-anchor" data-strand-anchor>
              {String(i + 1).padStart(2, "0")}
            </p>
            <div>
              <h3 className="step-name">{s.name}</h3>
              <p className="step-text">{s.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
