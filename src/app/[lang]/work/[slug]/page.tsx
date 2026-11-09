import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactSection } from "@/components/portfolio/ContactSection";
import { SiteHeader } from "@/components/space/SiteHeader";
import { NextProject } from "@/components/projects/NextProject";
import {
  DesktopGallery,
  MobileGallery,
} from "@/components/projects/ProjectGallery";
import { ProjectHero } from "@/components/projects/ProjectHero";
import { localizedNextProject, localizedProject } from "@/data/localize";
import { projects } from "@/data/projects";
import { LANGS, type Lang, localePath } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionaries";
import { breadcrumbs, caseStudy, JsonLd } from "@/lib/jsonld";

export const dynamicParams = false;

/** Search results show about 155 characters: cut at a word and mark the cut. */
const clip = (text: string, max = 155) => (text.length <= max ? text : `${text.slice(0, text.lastIndexOf(" ", max - 1))}…`);

export function generateStaticParams() {
  return LANGS.flatMap((lang) => projects.map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/work/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const project = localizedProject(slug, lang as Lang);
  if (!project) return {};
  return {
    // "Ha Long Curry – Restauracja wietnamska": the name and what it is, which is what people search for.
    title: `${project.title} – ${project.category}`,
    description: clip(project.description),
    alternates: {
      canonical: localePath(lang as Lang, `/work/${slug}`),
      languages: {
        pl: localePath("pl", `/work/${slug}`),
        en: localePath("en", `/work/${slug}`),
      },
    },
  };
}

export default async function CaseStudy({
  params,
}: PageProps<"/[lang]/work/[slug]">) {
  const { slug } = await params;
  const lang = (await params).lang as Lang;
  const project = localizedProject(slug, lang);
  if (!project) notFound();
  const next = localizedNextProject(slug, lang);
  const d = dictionaries[lang].work;

  return (
    <>
      <SiteHeader
        lang={lang}
        alternate={localePath(lang === "en" ? "pl" : "en", `/work/${slug}`)}
      />
      <JsonLd
        data={[
          caseStudy(lang, project),
          breadcrumbs(lang, [
            [dictionaries[lang].projectsPage.title, localePath(lang, "/work")],
            [project.title, localePath(lang, `/work/${slug}`)],
          ]),
        ]}
      />
      <main id="main" className="rail-pad relative">
        <ProjectHero project={project} lang={lang} />

        <section className="mx-auto grid max-w-[880px] gap-12 px-[var(--gutter)] py-20 md:py-32">
          <p className="statement">{project.description}</p>
          <div className="grid justify-items-start">
            <h2 className="tech">{d.services}</h2>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-1.5 text-[17px]">
              {project.services.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                className="btn btn-line case-link mt-8"
                target="_blank"
                rel="noreferrer"
              >
                {d.visit}
              </a>
            ) : project.demoUrl ? (
              <>
                <a
                  href={project.demoUrl}
                  className="btn btn-line mt-8"
                  target="_blank"
                  rel="noreferrer"
                >
                  {d.demo}
                </a>
                <p className="mt-4 max-w-[28ch] text-[14px] text-muted">
                  {project.status === "Concept"
                    ? d.conceptNote
                    : d.fictionalNote}
                </p>
              </>
            ) : (
              <p className="mt-8 max-w-[28ch] text-[14px] text-muted">
                {project.status === "Concept" ? d.conceptNote : d.prototypeNote}
              </p>
            )}
          </div>
        </section>

        <DesktopGallery project={project} lang={lang} />

        <section
          aria-labelledby="details-title"
          className="px-[var(--gutter)] py-24 md:py-36"
        >
          <div className="sec-head">
            <h2
              id="details-title"
              className="strand-anchor tech"
              data-strand-anchor
            >
              {d.details}
            </h2>
          </div>
          <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
            {project.details.map((detail) => (
              <div key={detail.label}>
                <h3 className="text-[17px] font-semibold">{detail.label}</h3>
                <p className="mt-2 text-[17px] leading-[1.5]">{detail.text}</p>
              </div>
            ))}
          </div>
        </section>

        <MobileGallery project={project} lang={lang} />

        <section
          aria-labelledby="result-title"
          className="sec-head px-[var(--gutter)] py-24 md:py-36"
        >
          <h2
            id="result-title"
            className="strand-anchor tech"
            data-strand-anchor
          >
            {d.task}
          </h2>
          <p className="statement statement-sm">{project.challenge}</p>
          <p className="max-w-[60ch] text-[17px] leading-[1.55]">
            {project.approach}
          </p>
        </section>

        <div>
          <NextProject project={next} lang={lang} />
        </div>
      </main>
      <ContactSection lang={lang} />
    </>
  );
}
