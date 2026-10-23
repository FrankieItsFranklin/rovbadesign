import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactSection } from "@/components/portfolio/ContactSection";
import { CaseHeader } from "@/components/projects/CaseHeader";
import { NextProject } from "@/components/projects/NextProject";
import { DesktopGallery, MobileGallery } from "@/components/projects/ProjectGallery";
import { ProjectHero } from "@/components/projects/ProjectHero";
import { localizedNextProject, localizedProject } from "@/data/localize";
import { projects } from "@/data/projects";
import { LANGS, type Lang, localePath } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionaries";

export const dynamicParams = false;

export function generateStaticParams() {
  return LANGS.flatMap((lang) => projects.map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/work/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const project = localizedProject(slug, lang as Lang);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
    alternates: { languages: { en: `/work/${slug}`, pl: `/pl/work/${slug}` } },
  };
}

export default async function CaseStudy({ params }: PageProps<"/[lang]/work/[slug]">) {
  const { slug } = await params;
  const lang = (await params).lang as Lang;
  const project = localizedProject(slug, lang);
  if (!project) notFound();
  const next = localizedNextProject(slug, lang);
  const d = dictionaries[lang].work;

  return (
    <>
      <CaseHeader lang={lang} alternate={localePath(lang === "en" ? "pl" : "en", `/work/${slug}`)} />
      <main className="relative">
        <ProjectHero project={project} lang={lang} />

        <section className="grid gap-12 px-[var(--gutter)] py-20 md:grid-cols-12 md:gap-8 md:py-32">
          <p className="font-serif text-[24px] leading-[1.2] tracking-[-0.01em] md:col-span-7 md:text-[32px]">
            {project.description}
          </p>
          <div className="md:col-span-3 md:col-start-10">
            <h2 className="label text-muted">{d.services}</h2>
            <ul className="mt-4 space-y-1.5 text-[17px]">
              {project.services.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            {project.liveUrl ? (
              <a href={project.liveUrl} className="label link-quiet mt-8 inline-block" target="_blank" rel="noreferrer">
                {d.visit}
              </a>
            ) : (
              <p className="mt-8 max-w-[28ch] text-[14px] text-muted">
                {project.status === "Concept" ? d.conceptNote : d.prototypeNote}
              </p>
            )}
          </div>
        </section>

        <DesktopGallery project={project} lang={lang} />

        <section aria-labelledby="details-title" className="grid gap-10 px-[var(--gutter)] py-24 md:grid-cols-12 md:gap-8 md:py-36">
          <h2 id="details-title" className="label md:col-span-3">
            {d.details}
          </h2>
          {project.details.map((detail) => (
            <div key={detail.label} className="md:col-span-3">
              <h3 className="text-[17px] font-semibold">{detail.label}</h3>
              <p className="mt-2 text-[17px] leading-[1.5]">{detail.text}</p>
            </div>
          ))}
        </section>

        <MobileGallery project={project} lang={lang} />

        <section aria-labelledby="result-title" className="grid gap-10 px-[var(--gutter)] py-24 md:grid-cols-12 md:gap-8 md:py-36">
          <h2 id="result-title" className="label md:col-span-3">
            {d.task}
          </h2>
          <p className="font-serif text-[24px] leading-[1.2] tracking-[-0.01em] md:col-span-4 md:text-[28px]">{project.challenge}</p>
          <p className="text-[17px] leading-[1.55] md:col-span-4 md:col-start-9 md:pt-2">{project.approach}</p>
        </section>

        <div className="bg-paper-2">
          <NextProject project={next} lang={lang} />
        </div>
      </main>
      <ContactSection lang={lang} />
    </>
  );
}
