import type { Metadata } from "next";
import Link from "next/link";
import { InnerPage } from "@/components/InnerPage";
import { FaqSection } from "@/components/space/FaqSection";
import { AuditBox, OfferPackages } from "@/components/space/Offer";
import { offerFaq } from "@/data/faq";
import { SERVICES } from "@/data/services";
import type { Lang } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionaries";
import { pagePath } from "@/i18n/routes";
import { breadcrumbs, faqPage, JsonLd, serviceList } from "@/lib/jsonld";

export async function generateMetadata({ params }: PageProps<"/[lang]/services">): Promise<Metadata> {
  const lang = (await params).lang as Lang;
  const d = dictionaries[lang].servicesPage;
  return {
    title: { absolute: d.metaTitle },
    description: d.metaDescription,
    alternates: { canonical: pagePath(lang, "services"), languages: { pl: pagePath("pl", "services"), en: pagePath("en", "services") } },
  };
}

/**
 * Services and the offer (moved here from the home page): the five services, each leading to its page; the three
 * packages with net prices; what every package has; how to choose; the free review; the questions about prices.
 */
export default async function Services({ params }: PageProps<"/[lang]/services">) {
  const lang = (await params).lang as Lang;
  const dict = dictionaries[lang];
  const d = dict.servicesPage;
  const hero = dict.space.services;
  const path = pagePath(lang, "services");
  const faq = offerFaq[lang];

  return (
    <InnerPage lang={lang} alternate={pagePath(lang === "en" ? "pl" : "en", "services")} label={d.label} title={d.title} lead={d.lead}>
      <JsonLd data={[serviceList(lang, d.title, path), faqPage(faq, path), breadcrumbs(lang, [[d.label, path]])]} />

      <section aria-labelledby="list">
        <h2 id="list" className="strand-anchor label" data-strand-anchor>
          {d.list}
        </h2>
        <ol className="register-list mt-8">
          {SERVICES.map((s, i) => (
            <li key={s[lang].slug}>
              <Link href={pagePath(lang, "services", s[lang].slug)} className="register-row strand-wire" data-strand-wire>
                <span className="register-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="register-title">{s[lang].title}</span>
                <span className="register-meta">{hero[i].text}</span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section id="pakiety" aria-labelledby="packages" className="mt-28 scroll-mt-28 md:mt-40">
        <h2 id="packages" className="strand-anchor label" data-strand-anchor>
          {d.packages}
        </h2>
        <div className="mt-8">
          <OfferPackages lang={lang} />
        </div>
      </section>

      <section aria-labelledby="every" className="mt-20">
        <h2 id="every" className="label">
          {d.every}
        </h2>
        <ul className="offer-items mt-6 text-[17px]">
          {d.everyList.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="choose" className="mt-20">
        <h2 id="choose" className="label">
          {d.choose}
        </h2>
        <dl className="choose-list mt-6">
          {d.chooseList.map(([name, text]) => (
            <div key={name}>
              <dt>{name}</dt>
              <dd>{text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <div className="mt-20">
        <AuditBox lang={lang} />
      </div>

      <FaqSection inner title={dict.faq.title} items={faq} />
    </InnerPage>
  );
}
