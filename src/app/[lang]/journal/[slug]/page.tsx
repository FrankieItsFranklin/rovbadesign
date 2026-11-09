import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InnerPage } from "@/components/InnerPage";
import { breadcrumbs, JsonLd, person, SITE_ID, STUDIO_ID } from "@/lib/jsonld";
import { articleBySlug, journal } from "@/data/journal";
import { SITE_URL, studio } from "@/data/studio";
import { LANGS, type Lang } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionaries";
import { pagePath } from "@/i18n/routes";

export const dynamicParams = false;

export function generateStaticParams() {
  return LANGS.flatMap((lang) => journal.map((a) => ({ lang, slug: a[lang].slug })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/journal/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const a = articleBySlug(lang as Lang, slug);
  if (!a) return {};
  const t = a[lang as Lang];
  return {
    title: t.title,
    description: t.description,
    openGraph: { type: "article", title: t.title, description: t.description, publishedTime: a.date },
    alternates: {
      canonical: pagePath(lang as Lang, "journal", t.slug),
      languages: { en: pagePath("en", "journal", a.en.slug), pl: pagePath("pl", "journal", a.pl.slug) },
    },
  };
}

export default async function Article({ params }: PageProps<"/[lang]/journal/[slug]">) {
  const { slug } = await params;
  const lang = (await params).lang as Lang;
  const a = articleBySlug(lang, slug);
  if (!a) notFound();
  const t = a[lang];
  const d = dictionaries[lang].journal;
  const other = lang === "en" ? "pl" : "en";
  const path = pagePath(lang, "journal", t.slug);
  const ld = [
    {
      "@type": "Article",
      "@id": `${SITE_URL}${path}#article`,
      headline: t.title,
      description: t.description,
      datePublished: a.date,
      dateModified: a.date,
      inLanguage: lang,
      image: `${SITE_URL}/opengraph-image`,
      author: studio.team.map(person),
      publisher: { "@id": STUDIO_ID },
      isPartOf: { "@id": SITE_ID },
      mainEntityOfPage: `${SITE_URL}${path}`,
    },
    breadcrumbs(lang, [
      [d.title, pagePath(lang, "journal")],
      [t.title, path],
    ]),
  ];

  return (
    <InnerPage lang={lang} alternate={pagePath(other, "journal", a[other].slug)} label={`${d.title} · ${d.minutes(a.minutes)}`} title={t.title} lead={t.description} read>
      <JsonLd data={ld} />
      <article className="max-w-[68ch] text-[19px] leading-[1.6] md:ml-[25%]">
        {/* The byline: who wrote it and when, for readers and for search engines (E-E-A-T). */}
        <p className="tech mb-12">
          {d.authors}: {studio.team.join(", ")} · <time dateTime={a.date}>{new Date(a.date).toLocaleDateString(lang === "pl" ? "pl-PL" : "en-GB", { day: "numeric", month: "long", year: "numeric" })}</time>
        </p>
        {t.blocks.map((b, i) => (
          <div key={i} className={i ? "mt-8" : undefined}>
            {b.h && <h2 className="mb-3 text-[24px] leading-[1.2] font-semibold">{b.h}</h2>}
            {b.p && <p>{b.p}</p>}
            {b.list && (
              <ul className="space-y-2">
                {b.list.map((x) => (
                  <li key={x} className="grid grid-cols-[18px_1fr]">
                    <span aria-hidden="true" className="mt-[14px] h-px w-[10px] bg-ink" />
                    {x}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
        <p className="mt-16">
          <Link href={pagePath(lang, "journal")} className="label link-quiet">
            {d.back}
          </Link>
        </p>
      </article>
    </InnerPage>
  );
}
