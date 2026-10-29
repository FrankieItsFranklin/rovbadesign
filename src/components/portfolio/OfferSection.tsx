import type { Lang } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionaries";
import { PrefillLink } from "./PrefillLink";

/** Starting prices in PLN, one per package; null shows "quoted after a short call". */
const PRICES: (number | null)[] = [1500, 3500, 6000];

// Grouping by hand: Polish Intl leaves four-digit numbers ungrouped ("1500"), and the space must not break.
const group = (n: number, sep: string) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, sep);
const formatPrice = (n: number, lang: Lang) => (lang === "pl" ? `od ${group(n, " ")} zł` : `from PLN ${group(n, ",")}`);

export function OfferSection({ lang }: { lang: Lang }) {
  const d = dictionaries[lang].offer;
  const topics = dictionaries[lang].form.topicOptions;
  return (
    <section id="offer" aria-labelledby="offer-title" className="scroll-mt-6 bg-paper-2 px-[var(--gutter)] py-28 md:py-40">
      <div className="grid gap-14 md:grid-cols-12 md:gap-8">
        <h2 id="offer-title" className="label md:col-span-3">
          {d.title}
        </h2>
        <p className="font-serif text-[26px] leading-[1.18] tracking-[-0.012em] md:col-span-8 md:text-[36px]">{d.statement}</p>
      </div>

      <ol className="mt-20 grid gap-px overflow-hidden rounded-[14px] bg-ink/15 md:mt-24 md:grid-cols-3">
        {d.packages.map((p, i) => (
          <li key={p.name} className="flex flex-col gap-8 bg-paper p-7 md:p-9">
            <div>
              <h3 className="font-serif text-[34px] leading-none tracking-[-0.015em]">{p.name}</h3>
              <p className="mt-3 text-[15px] text-muted">{p.for}</p>
            </div>
            <ul className="space-y-2 text-[16px] leading-snug">
              {p.items.map((item) => (
                <li key={item} className="grid grid-cols-[14px_1fr] gap-2">
                  <span aria-hidden="true" className="mt-[9px] h-px w-[10px] bg-ink" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-auto grid gap-4 border-t border-ink/15 pt-6">
              <p>
                <span className="label text-muted">{d.priceLabel}</span>
                <br />
                <span className="text-[19px]">{PRICES[i] != null ? formatPrice(PRICES[i], lang) : d.priceOnRequest}</span>
              </p>
              <PrefillLink
                lang={lang}
                topic={topics[0]}
                message={`${p.name}: `}
                className="label inline-flex min-h-11 w-fit items-center rounded-full border border-ink px-5 transition-colors hover:bg-ink hover:text-paper"
              >
                {d.choose}
              </PrefillLink>
            </div>
          </li>
        ))}
      </ol>
      <p className="mt-6 max-w-[60ch] text-[15px] text-muted">{d.note}</p>

      <div className="mt-20 grid gap-8 rounded-[14px] bg-ink p-8 text-paper md:mt-24 md:grid-cols-12 md:items-end md:p-12">
        <div className="md:col-span-8">
          <h3 className="font-serif text-[30px] leading-[1.1] tracking-[-0.012em] md:text-[40px]">{d.audit.title}</h3>
          <p className="mt-4 max-w-[52ch] text-[17px] leading-[1.5] text-paper/80">{d.audit.text}</p>
        </div>
        <div className="md:col-span-4 md:justify-self-end">
          <PrefillLink
            lang={lang}
            topic={topics[2]}
            className="label inline-flex min-h-12 items-center rounded-full bg-paper px-7 text-ink transition-transform duration-150 active:scale-[0.97]"
          >
            {d.audit.cta}
          </PrefillLink>
        </div>
      </div>
    </section>
  );
}
