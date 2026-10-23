export const LANGS = ["en", "pl"] as const;
export type Lang = (typeof LANGS)[number];

export const isLang = (value: string): value is Lang => (LANGS as readonly string[]).includes(value);

/** English lives at the root, Polish under /pl. */
export const localePath = (lang: Lang, path: string) => (lang === "en" ? path : path === "/" ? "/pl" : `/pl${path}`);
