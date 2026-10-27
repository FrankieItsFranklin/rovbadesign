import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InnerPage } from "@/components/InnerPage";
import { PrefillLink } from "@/components/portfolio/PrefillLink";
import { localizedProjects } from "@/data/localize";
import { nicheBySlug, niches, NICHES } from "@/data/niches";
import { LANGS, type Lang, localePath } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionaries";
import { pagePath } from "@/i18n/routes";

export const dynamicParams = false;

export function generateStaticParams() {
  return LANGS.flatMap((lang) => NICHES.map((n) => ({ lang, niche: niches[n][lang].slug })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/for/[niche]">): Promise<Metadata> {
  const { lang, niche } = await params;
  const n = nicheBySlug(lang as Lang, niche);
  if (!n) return {};
  const c = niches[n][lang as Lang];
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: {
      canonical: pagePath(lang as Lang, "for", c.slug),
      languages: { en: pagePath("en", "for", niches[n].en.slug), pl: pagePath("pl", "for", niches[n].pl.slug) },
    },
  };
}

export default async function NichePage({ params }: PageProps<"/[lang]/for/[niche]">) {
  const { niche } = await params;
  const lang = (await params).lang as Lang;
  const n = nicheBySlug(lang, niche);
  if (!n) notFound();
  const c = niches[n][lang];
  const d = dictionaries[lang];
  const work = localizedProjects(lang).filter((p) => p.niche === n);
  const other = lang === "en" ? "pl" : "en";

  return (
    <InnerPage lang={lang} alternate={pagePath(other, "for", niches[n][other].slug)} label={c.label} title={c.title} lead={c.lead}>
      <section aria-labelledby="needs" className="grid gap-10 md:grid-cols-12 md:gap-8">
        <h2 id="needs" className="label md:col-span-3">
          {d.niche.needs}
        </h2>
        <ol className="grid gap-x-8 gap-y-10 md:col-span-9 md:grid-cols-2">
          {c.needs.map((x) => (
            <li key={x.title} className="border-t border-ink pt-5">
              <div>
                <h3 className="text-[20px] font-semibold tracking-[-0.01em]">{x.title}</h3>
                <p className="mt-2 text-[17px] leading-[1.5] text-ink/80">{x.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="works" className="mt-28 grid gap-10 md:mt-40 md:grid-cols-12 md:gap-8">
        <h2 id="works" className="label md:col-span-3">
          {d.niche.works}
        </h2>
        <div className="md:col-span-9">
          {work.length ? (
            <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {work.map((p) => (
                <li key={p.id}>
                  <Link href={localePath(lang, `/work/${p.slug}`)} className="group block">
                    <span className="relative block aspect-[16/10] overflow-hidden rounded-[6px] bg-paper-2">
                      <Image
                        src={p.desktopImages[0]}
                        alt={d.card.alt(p.title)}
                        fill
                        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 28vw"
                        quality={80}
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        style={{ objectPosition: "50% 0%" }}
                      />
                    </span>
                    <span className="mt-4 block text-[20px] font-semibold tracking-[-0.01em]">{p.title}</span>
                    <span className="label mt-1 block text-muted">
                      {p.category} · {p.city} · {d.work.statuses[p.status]}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-[17px] text-muted">{d.niche.none}</p>
          )}
        </div>
      </section>

      <section aria-labelledby="approach" className="mt-28 grid gap-10 md:mt-40 md:grid-cols-12 md:gap-8">
        <h2 id="approach" className="label md:col-span-3">
          {d.niche.approach}
        </h2>
        <div className="md:col-span-8">
          <p className="font-serif text-[26px] leading-[1.2] tracking-[-0.012em] md:text-[34px]">{c.approach}</p>
          <PrefillLink
            lang={lang}
            topic={d.form.topicOptions[0]}
            message={`${c.label}: `}
            className="label mt-10 inline-flex min-h-12 items-center rounded-full bg-ink px-7 text-paper transition-transform duration-150 active:scale-[0.97]"
          >
            {d.niche.cta}
          </PrefillLink>
        </div>
      </section>

      <nav aria-labelledby="other" className="mt-28 grid gap-6 md:mt-40 md:grid-cols-12 md:gap-8">
        <h2 id="other" className="label md:col-span-3">
          {d.niche.other}
        </h2>
        <ul className="flex flex-wrap gap-3 md:col-span-9">
          {NICHES.filter((x) => x !== n).map((x) => (
            <li key={x}>
              <Link href={pagePath(lang, "for", niches[x][lang].slug)} className="label inline-flex min-h-11 items-center rounded-full border border-ink/25 px-5 hover:border-ink">
                {niches[x][lang].label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </InnerPage>
  );
}
