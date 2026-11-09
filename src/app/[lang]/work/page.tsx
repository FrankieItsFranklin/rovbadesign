import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { ContactSection } from "@/components/portfolio/ContactSection";
import { SiteHeader } from "@/components/space/SiteHeader";
import { WorkIndex } from "@/components/space/WorkIndex";
import { localizedProjects } from "@/data/localize";
import { breadcrumbs, JsonLd, workList } from "@/lib/jsonld";
import { type Lang, localePath } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionaries";

export async function generateMetadata({ params }: PageProps<"/[lang]/work">): Promise<Metadata> {
  const lang = (await params).lang as Lang;
  return {
    title: { absolute: dictionaries[lang].projectsPage.meta },
    description: dictionaries[lang].projectsPage.metaDescription,
    alternates: { canonical: localePath(lang, "/work"), languages: { pl: "/work", en: "/en/work" } },
  };
}

/** All projects on their own page (they left the landing in stage 2). */
export default async function Work({ params }: PageProps<"/[lang]/work">) {
  const lang = (await params).lang as Lang;
  const p = dictionaries[lang].projectsPage;
  const cta = dictionaries[lang].workCta;
  const projects = localizedProjects(lang).filter((x) => x.onLine !== false);
  const step = (n: number) => ({ "--d": n }) as CSSProperties;
  return (
    <>
      <SiteHeader lang={lang} alternate={localePath(lang === "en" ? "pl" : "en", "/work")} />
      <JsonLd data={[workList(lang, projects, p.meta), breadcrumbs(lang, [[p.title, localePath(lang, "/work")]])]} />
      <main id="main" className="on-rail px-[var(--gutter)] pt-36 pb-28 md:pt-44 md:pb-40">
        <div className="page-head">
          <p className="strand-anchor tech" data-strand-anchor>
            {p.label} / {p.count(projects.length)}
          </p>
          <h1 className="page-title enter" style={step(0)}>
            {p.title}
          </h1>
          <p className="statement statement-sm enter" style={step(1)}>
            {p.lead}
          </p>
        </div>
        <div className="mt-16 md:mt-24">
          <WorkIndex projects={projects} lang={lang} />
        </div>
        <div className="work-cta strand-anchor" data-strand-anchor>
          <p className="statement statement-sm">{cta.text}</p>
          <a href="#contact" className="btn btn-primary btn-lg">
            {cta.cta}
            <span className="btn-arrow" aria-hidden="true">
              →
            </span>
          </a>
        </div>
      </main>
      <ContactSection lang={lang} />
    </>
  );
}
