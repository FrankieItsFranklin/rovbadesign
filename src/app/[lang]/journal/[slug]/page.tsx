import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InnerPage } from "@/components/InnerPage";
import { articleBySlug, journal } from "@/data/journal";
import { SITE_URL } from "@/data/studio";
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
  const ld = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t.title,
    description: t.description,
    datePublished: a.date,
    inLanguage: lang,
    author: { "@type": "Organization", name: "ROVBA Design", url: SITE_URL },
    mainEntityOfPage: `${SITE_URL}${pagePath(lang, "journal", t.slug)}`,
  };

  return (
    <InnerPage lang={lang} alternate={pagePath(other, "journal", a[other].slug)} label={`${d.title} · ${d.minutes(a.minutes)}`} title={t.title} lead={t.description}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <article className="max-w-[68ch] text-[19px] leading-[1.6] md:ml-[25%]">
        {t.blocks.map((b, i) => (
          <div key={i} className={i ? "mt-8" : undefined}>
            {b.h && <h2 className="mb-3 text-[24px] leading-[1.2] font-semibold tracking-[-0.015em]">{b.h}</h2>}
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
