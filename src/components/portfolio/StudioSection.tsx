import type { Lang } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionaries";

export function StudioSection({ lang }: { lang: Lang }) {
  const d = dictionaries[lang].studio;
  return (
    <section id="studio" className="scroll-mt-6 px-[var(--gutter)] pt-28 pb-32 md:pt-40 md:pb-44">
      <div className="grid gap-14 md:grid-cols-12 md:gap-8">
        <h2 className="label md:col-span-3">{d.title}</h2>
        <p className="font-serif text-[26px] leading-[1.18] tracking-[-0.012em] md:col-span-8 md:text-[36px]">{d.statement}</p>
      </div>
      <div className="mt-20 grid gap-12 md:mt-28 md:grid-cols-12 md:gap-8">
        {d.columns.map((c, i) => (
          <div key={c.title} className={i === 0 ? "md:col-span-3 md:col-start-4" : "md:col-span-3"}>
            <h3 className="label text-muted">{c.title}</h3>
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
