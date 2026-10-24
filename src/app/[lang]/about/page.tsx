import type { Metadata } from "next";
import Image from "next/image";
import { InnerPage } from "@/components/InnerPage";
import { projects } from "@/data/projects";
import { studio } from "@/data/studio";
import type { Lang } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionaries";
import { pagePath } from "@/i18n/routes";

export async function generateMetadata({ params }: PageProps<"/[lang]/about">): Promise<Metadata> {
  const lang = (await params).lang as Lang;
  const d = dictionaries[lang].about;
  return {
    title: d.title,
    description: d.lead,
    alternates: { canonical: pagePath(lang, "about"), languages: { en: pagePath("en", "about"), pl: pagePath("pl", "about") } },
  };
}

export default async function About({ params }: PageProps<"/[lang]/about">) {
  const lang = (await params).lang as Lang;
  const dict = dictionaries[lang];
  const d = dict.about;
  const bio = studio.bio[lang];
  const showPerson = Boolean(studio.owner && (bio || studio.photo));

  return (
    <InnerPage lang={lang} alternate={pagePath(lang === "en" ? "pl" : "en", "about")} label={dict.nav.about} title={d.title} lead={d.lead}>
      {showPerson && (
        <section aria-labelledby="person" className="mb-28 grid gap-10 md:mb-40 md:grid-cols-12 md:gap-8">
          <h2 id="person" className="label md:col-span-3">
            {d.personTitle}
          </h2>
          {studio.photo && (
            <div className="relative aspect-[4/5] overflow-hidden rounded-[6px] bg-paper-2 md:col-span-4">
              <Image src={studio.photo} alt={studio.owner} fill sizes="(max-width: 768px) 90vw, 33vw" className="object-cover" />
            </div>
          )}
          <div className="md:col-span-5">
            <p className="text-[24px] font-semibold tracking-[-0.015em]">{studio.owner}</p>
            {bio && <p className="mt-4 text-[18px] leading-[1.55]">{bio}</p>}
          </div>
        </section>
      )}

      <section aria-labelledby="principles" className="grid gap-10 md:grid-cols-12 md:gap-8">
        <h2 id="principles" className="label md:col-span-3">
          {d.principlesTitle}
        </h2>
        <ul className="grid gap-x-8 gap-y-10 md:col-span-9 md:grid-cols-2">
          {d.principles.map((p) => (
            <li key={p.title} className="border-t border-ink pt-5">
              <h3 className="text-[22px] font-semibold tracking-[-0.015em]">{p.title}</h3>
              <p className="mt-2 text-[17px] leading-[1.5] text-ink/80">{p.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="process" className="mt-28 grid gap-10 md:mt-40 md:grid-cols-12 md:gap-8">
        <h2 id="process" className="label md:col-span-3">
          {dict.studio.columns[2].title}
        </h2>
        <ol className="grid gap-4 md:col-span-9">
          {dict.studio.columns[2].items.map((step) => (
            <li key={step} className="font-serif text-[26px] leading-[1.2] tracking-[-0.012em] md:text-[34px]">
              {step}
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="tools" className="mt-28 grid gap-10 md:mt-40 md:grid-cols-12 md:gap-8">
        <h2 id="tools" className="label md:col-span-3">
          {d.toolsTitle}
        </h2>
        <div className="md:col-span-7">
          <p className="text-[19px] leading-[1.55]">{d.tools}</p>
          <p className="label mt-8 text-muted">{dict.home.count(projects.length)}</p>
        </div>
      </section>
    </InnerPage>
  );
}
