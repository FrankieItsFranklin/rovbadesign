import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InnerPage } from "@/components/InnerPage";
import { PrefillLink } from "@/components/portfolio/PrefillLink";
import { FaqSection } from "@/components/space/FaqSection";
import { SERVICES, serviceBySlug } from "@/data/services";
import { LANGS, type Lang, localePath } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionaries";
import { pagePath } from "@/i18n/routes";
import { breadcrumbs, faqPage, JsonLd, nicheService } from "@/lib/jsonld";

export const dynamicParams = false;

export function generateStaticParams() {
  return LANGS.flatMap((lang) => SERVICES.map((s) => ({ lang, service: s[lang].slug })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/services/[service]">): Promise<Metadata> {
  const { lang, service } = await params;
  const i = serviceBySlug(lang as Lang, service);
  if (i < 0) return {};
  const s = SERVICES[i];
  return {
    title: { absolute: s[lang as Lang].metaTitle },
    description: s[lang as Lang].metaDescription,
    alternates: {
      canonical: pagePath(lang as Lang, "services", service),
      languages: { pl: pagePath("pl", "services", s.pl.slug), en: pagePath("en", "services", s.en.slug) },
    },
  };
}

/** One service: when it is worth it, what you get, how it goes, price, time, its questions and the other services. */
export default async function ServicePage({ params }: PageProps<"/[lang]/services/[service]">) {
  const { service } = await params;
  const lang = (await params).lang as Lang;
  const i = serviceBySlug(lang, service);
  if (i < 0) notFound();
  const s = SERVICES[i][lang];
  const dict = dictionaries[lang];
  const d = dict.servicesPage;
  const hero = dict.space.services[i];
  const other = lang === "en" ? "pl" : "en";
  const list = pagePath(lang, "services");
  const path = pagePath(lang, "services", s.slug);

  return (
    <InnerPage lang={lang} alternate={pagePath(other, "services", SERVICES[i][other].slug)} label={d.label} title={s.title} lead={s.intro}>
      <JsonLd
        data={[
          nicheService(lang, s.title, s.metaDescription, path),
          faqPage(s.faq, path),
          breadcrumbs(lang, [
            [d.label, list],
            [s.title, path],
          ]),
        ]}
      />

      <dl className="readout-facts">
        {hero.facts.map(([k, v]) => (
          <div key={k}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>

      <section aria-labelledby="when" className="mt-20">
        <h2 id="when" className="strand-anchor label" data-strand-anchor>
          {d.when}
        </h2>
        <ul className="offer-items mt-6 text-[17px]">
          {s.when.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="what" className="mt-20">
        <h2 id="what" className="strand-anchor label" data-strand-anchor>
          {d.what}
        </h2>
        <ul className="offer-items mt-6 text-[17px]">
          {s.includes.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="how" className="mt-20">
        <h2 id="how" className="strand-anchor label" data-strand-anchor>
          {d.how}
        </h2>
        <ol className="service-steps mt-6">
          {s.steps.map(([name, text], n) => (
            <li key={name}>
              <span className="tech">{String(n + 1).padStart(2, "0")}</span>
              <h3>{name}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
        <Link href={`${localePath(lang, "/")}#process`} className="link-quiet label mt-6 inline-block">
          {d.howLink} →
        </Link>
      </section>

      <section aria-labelledby="price" className="mt-20 grid gap-12 md:grid-cols-2">
        <div>
          <h2 id="price" className="label">
            {d.price}
          </h2>
          <p className="mt-4 text-[17px] leading-[1.6] text-text-2">{s.price}</p>
          <Link href={`${list}#pakiety`} className="link-quiet label mt-4 inline-block">
            {d.pricesLink} →
          </Link>
        </div>
        <div>
          <h2 className="label">{d.time}</h2>
          <p className="mt-4 text-[17px] leading-[1.6] text-text-2">{d.timeText}</p>
        </div>
      </section>

      <div className="mt-16">
        <PrefillLink lang={lang} topic={dict.form.topicOptions[0]} message={`${s.title}: `} className="btn btn-primary btn-lg">
          {d.cta}
        </PrefillLink>
      </div>

      <FaqSection inner title={d.faq} items={s.faq} />

      <nav aria-labelledby="other" className="mt-28">
        <h2 id="other" className="label">
          {d.other}
        </h2>
        <ul className="other-services mt-6">
          {SERVICES.map((x, n) =>
            n === i ? null : (
              <li key={x[lang].slug}>
                <Link href={pagePath(lang, "services", x[lang].slug)} className="link-quiet">
                  {x[lang].title} →
                </Link>
              </li>
            ),
          )}
        </ul>
      </nav>
    </InnerPage>
  );
}
