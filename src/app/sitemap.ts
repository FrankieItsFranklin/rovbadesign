import type { MetadataRoute } from "next";
import { journal } from "@/data/journal";
import { niches, NICHES } from "@/data/niches";
import { projects } from "@/data/projects";
import { SITE_URL } from "@/data/studio";
import { localePath } from "@/i18n/config";
import { pagePath } from "@/i18n/routes";

const pair = (en: string, pl: string, priority: number): MetadataRoute.Sitemap => [
  { url: SITE_URL + en, priority, alternates: { languages: { en: SITE_URL + en, pl: SITE_URL + pl } } },
  { url: SITE_URL + pl, priority, alternates: { languages: { en: SITE_URL + en, pl: SITE_URL + pl } } },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...pair("/", "/pl", 1),
    ...NICHES.flatMap((n) => pair(pagePath("en", "for", niches[n].en.slug), pagePath("pl", "for", niches[n].pl.slug), 0.9)),
    ...projects.flatMap((p) => pair(localePath("en", `/work/${p.slug}`), localePath("pl", `/work/${p.slug}`), 0.7)),
    ...pair(pagePath("en", "about"), pagePath("pl", "about"), 0.6),
    ...pair(pagePath("en", "journal"), pagePath("pl", "journal"), 0.6),
    ...journal.flatMap((a) => pair(pagePath("en", "journal", a.en.slug), pagePath("pl", "journal", a.pl.slug), 0.5)),
    ...pair(pagePath("en", "privacy"), pagePath("pl", "privacy"), 0.2),
  ];
}
