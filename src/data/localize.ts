import type { Lang } from "@/i18n/config";
import { getNextProject, getProject, projects, type Project } from "./projects";
import { polishProjects, polishTerms } from "./projects.pl";

const term = (value: string) => polishTerms[value] ?? value;

export function localizeProject(project: Project, lang: Lang): Project {
  const pl = polishProjects[project.id];
  if (lang === "en" || !pl) return project;
  return {
    ...project,
    category: pl.category,
    city: pl.city,
    description: pl.description,
    challenge: pl.challenge,
    approach: pl.approach,
    services: project.services.map(term),
    details: project.details.map((d, i) => ({ label: term(d.label), text: pl.details[i] ?? d.text })),
  };
}

export const localizedProjects = (lang: Lang) => projects.map((p) => localizeProject(p, lang));

export function localizedProject(slug: string, lang: Lang) {
  const p = getProject(slug);
  return p && localizeProject(p, lang);
}

export const localizedNextProject = (slug: string, lang: Lang) => localizeProject(getNextProject(slug), lang);
