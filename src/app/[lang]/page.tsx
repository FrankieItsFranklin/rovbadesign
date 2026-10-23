import type { Metadata } from "next";
import { ContactSection } from "@/components/portfolio/ContactSection";
import { PortfolioFooter } from "@/components/portfolio/PortfolioFooter";
import { PortfolioHeader } from "@/components/portfolio/PortfolioHeader";
import { ProjectLine } from "@/components/portfolio/ProjectLine";
import { StudioSection } from "@/components/portfolio/StudioSection";
import { localizedProjects } from "@/data/localize";
import { type Lang, localePath } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionaries";

export const metadata: Metadata = {
  alternates: { languages: { en: "/", pl: "/pl" } },
};

export default async function Home({ params }: PageProps<"/[lang]">) {
  const lang = (await params).lang as Lang;
  const d = dictionaries[lang];
  const projects = localizedProjects(lang);
  return (
    <>
      <main>
        <section id="work" className="home-hero" aria-labelledby="work-title">
          <h1 id="work-title" className="sr-only">
            {d.home.heading}
          </h1>
          <PortfolioHeader lang={lang} alternate={localePath(lang === "en" ? "pl" : "en", "/")} />
          <ProjectLine projects={projects} lang={lang} />
          <PortfolioFooter count={projects.length} lang={lang} />
        </section>
        <StudioSection lang={lang} />
      </main>
      <ContactSection lang={lang} />
    </>
  );
}
