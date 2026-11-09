export const LANGS = ["pl", "en"] as const;
export type Lang = (typeof LANGS)[number];

export const isLang = (value: string): value is Lang => (LANGS as readonly string[]).includes(value);

/** Polish lives at the root, English under /en (since 2026-11; before that it was the other way round). */
export const localePath = (lang: Lang, path: string) => (lang === "pl" ? path : path === "/" ? "/en" : `/en${path}`);
