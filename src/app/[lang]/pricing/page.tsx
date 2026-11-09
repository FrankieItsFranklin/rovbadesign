import type { Metadata } from "next";
import { InnerPage } from "@/components/InnerPage";
import { DraftNote, Todo } from "@/components/space/Draft";
import { FaqSection } from "@/components/space/FaqSection";
import { OfferPackages } from "@/components/space/Offer";
import { offerFaq } from "@/data/faq";
import { PRICING_DRAFT } from "@/data/prices";
import type { Lang } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionaries";
import { pagePath } from "@/i18n/routes";
import { breadcrumbs, faqPage, JsonLd } from "@/lib/jsonld";

export async function generateMetadata({ params }: PageProps<"/[lang]/pricing">): Promise<Metadata> {
  const lang = (await params).lang as Lang;
  const d = dictionaries[lang].pricing;
  return {
    title: { absolute: d.metaTitle },
    description: d.metaDescription,
    alternates: { canonical: pagePath(lang, "pricing"), languages: { pl: pagePath("pl", "pricing"), en: pagePath("en", "pricing") } },
    // A draft stays out of search until its gaps are filled (data/prices.ts).
    ...(PRICING_DRAFT ? { robots: { index: false, follow: true } } : {}),
  };
}

/** Pricing (stage 2, draft): the packages in full, what moves the price, upkeep, time and the price questions. */
export default async function Pricing({ params }: PageProps<"/[lang]/pricing">) {
  const lang = (await params).lang as Lang;
  const dict = dictionaries[lang];
  const d = dict.pricing;
  const todo = dict.draft.todo;
  const faq = offerFaq[lang].slice(0, 4);

  return (
    <InnerPage lang={lang} alternate={pagePath(lang === "en" ? "pl" : "en", "pricing")} label={d.label} title={d.title} lead={d.lead}>
      <JsonLd data={[faqPage(faq, pagePath(lang, "pricing")), breadcrumbs(lang, [[d.title, pagePath(lang, "pricing")]])]} />
      {PRICING_DRAFT && <DraftNote>{dict.draft.note}</DraftNote>}

      <section aria-labelledby="packages">
        <h2 id="packages" className="label">
          {d.packages}
        </h2>
        <div className="mt-8">
          <OfferPackages lang={lang} />
        </div>
      </section>

      <section aria-labelledby="factors" className="mt-24">
        <h2 id="factors" className="label">
          {d.factors}
        </h2>
        <ul className="offer-items mt-6 text-[17px]">
          {d.factorsList.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="time" className="mt-20">
        <h2 id="time" className="label">
          {d.time}
        </h2>
        <p className="mt-4 max-w-[60ch] text-[17px] leading-[1.6] text-text-2">{d.timeText}</p>
      </section>

      <section aria-labelledby="upkeep" className="mt-20">
        <h2 id="upkeep" className="label">
          {d.upkeep}
        </h2>
        <p className="mt-4 max-w-[60ch] text-[17px] leading-[1.6] text-text-2">{d.upkeepText}</p>
      </section>

      <section aria-labelledby="excluded" className="mt-20">
        <h2 id="excluded" className="label">
          {d.excluded}
        </h2>
        <Todo label={todo}>{d.excludedTodo}</Todo>
      </section>

      <FaqSection inner title={dict.faq.title} items={faq} />
    </InnerPage>
  );
}
