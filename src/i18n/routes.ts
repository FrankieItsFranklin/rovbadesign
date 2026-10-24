// Public, localised URLs of the inner pages. Internally every page lives under /[lang]/<key>;
// next.config.ts maps these public paths onto it.
import type { Lang } from "./config";

export const SEGMENTS = {
  about: { en: "about", pl: "o-studiu" },
  privacy: { en: "privacy", pl: "polityka-prywatnosci" },
  journal: { en: "journal", pl: "dziennik" },
  for: { en: "for", pl: "dla" },
} as const satisfies Record<string, Record<Lang, string>>;

export type PageKey = keyof typeof SEGMENTS;

/** Public path of an inner page, with an optional trailing slug. */
export const pagePath = (lang: Lang, key: PageKey, slug?: string) => {
  const base = `${lang === "en" ? "" : "/pl"}/${SEGMENTS[key][lang]}`;
  return slug ? `${base}/${slug}` : base;
};
