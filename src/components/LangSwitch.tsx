import Link from "next/link";
import { LANGS, type Lang } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionaries";

/** EN / PL: the current language is plain text, the other one links to the same page in that language. */
export function LangSwitch({ lang, alternate, className = "" }: { lang: Lang; alternate: string; className?: string }) {
  return (
    <p className={`label flex gap-2 ${className}`} aria-label={dictionaries[lang].nav.language}>
      {LANGS.map((l, i) => (
        <span key={l} className="flex gap-2">
          {i > 0 && <span aria-hidden="true" className="text-muted">/</span>}
          {l === lang ? (
            <span aria-current="true">{l.toUpperCase()}</span>
          ) : (
            <Link href={alternate} hrefLang={l} lang={l} className="link-quiet text-muted transition-colors hover:text-ink">
              {l.toUpperCase()}
            </Link>
          )}
        </span>
      ))}
    </p>
  );
}
