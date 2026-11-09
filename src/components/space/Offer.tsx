import type { Lang } from "@/i18n/config";
import { formatPrice, PACKAGE_PRICES as PRICES } from "@/data/prices";
import { dictionaries } from "@/i18n/dictionaries";
import { PrefillLink } from "@/components/portfolio/PrefillLink";

/** The three packages (DESIGN.md §5); the middle one is marked as the most chosen. Services page and pricing page. */
export function OfferPackages({ lang }: { lang: Lang }) {
  const dict = dictionaries[lang];
  const d = dict.offer;
  return (
    <>
      <ol className="offer-grid">
        {d.packages.map((p, i) => (
          <li key={p.name} className={`offer-card${i === 1 ? " is-popular" : ""}`}>
            {i === 1 && <p className="offer-badge tech">{dict.popular}</p>}
            <div>
              <p className="tech">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="offer-name">{p.name}</h3>
              <p className="mt-2 text-[15px] text-text-2">{p.for}</p>
            </div>
            <ul className="offer-items">
              {p.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="mt-auto grid gap-4 border-t border-line pt-6">
              <p>
                <span className="tech">{d.priceLabel}</span>
                <br />
                <span className="offer-price">{PRICES[i] != null ? formatPrice(PRICES[i], lang) : d.priceOnRequest}</span>
              </p>
              <PrefillLink lang={lang} topic={dict.form.topicOptions[0]} message={`${p.name}: `} className={`btn ${i === 1 ? "btn-primary" : "btn-line"} w-fit`}>
                {d.choose}
              </PrefillLink>
            </div>
          </li>
        ))}
      </ol>
      <p className="mt-8 max-w-[60ch] text-[15px] text-text-2">{d.note}</p>
    </>
  );
}

/** The free review of a current site: a dark band with one action. */
export function AuditBox({ lang }: { lang: Lang }) {
  const dict = dictionaries[lang];
  const d = dict.offer.audit;
  return (
    <div className="grid gap-8 bg-text p-8 text-space md:grid-cols-[1fr_auto] md:items-end md:p-12">
      <div>
        <h2 className="statement statement-sm">{d.title}</h2>
        <p className="mt-4 max-w-[52ch] text-[17px] leading-[1.5] text-space/75">{d.text}</p>
      </div>
      <div>
        <PrefillLink lang={lang} topic={dict.form.topicOptions[2]} className="btn btn-light">
          {d.cta}
        </PrefillLink>
      </div>
    </div>
  );
}
