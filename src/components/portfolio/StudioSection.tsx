import type { Lang } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionaries";
import { SectionHead } from "@/components/space/SectionHead";

export function StudioSection({ lang }: { lang: Lang }) {
  const d = dictionaries[lang].studio;
  return (
    <section id="studio" aria-labelledby="studio-title" className="on-rail scroll-mt-6 px-[var(--gutter)] pt-28 pb-32 md:pt-40 md:pb-44">
      <SectionHead num={3} title={d.title} id="studio-title">
        {d.statement}
      </SectionHead>
      <div className="mt-16 grid gap-12 md:mt-24 md:grid-cols-3 md:gap-8">
        {d.columns.map((c) => (
          <div key={c.title}>
            <h3 className="tech">{c.title}</h3>
            <ul className="mt-4 space-y-1.5 text-[17px] leading-snug">
              {c.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
