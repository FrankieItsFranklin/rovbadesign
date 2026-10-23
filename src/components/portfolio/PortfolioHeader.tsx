import Link from "next/link";
import { LangSwitch } from "@/components/LangSwitch";
import { LogoMark } from "@/components/LogoMark";
import { type Lang, localePath } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionaries";

export function PortfolioHeader({ lang, alternate }: { lang: Lang; alternate: string }) {
  const d = dictionaries[lang];
  const home = localePath(lang, "/");
  const nav = [
    // On phones the line is the first screen, so "Work" is dropped to keep the bar on one row.
    { href: `${home}#work`, label: d.nav.work, wide: true },
    { href: `${home}#studio`, label: d.nav.studio },
    { href: `${home}#contact`, label: d.nav.contact },
  ];
  return (
    <header className="intro-fade pointer-events-none absolute inset-x-0 top-0 z-10 grid grid-cols-[1fr_auto] items-start gap-6 px-[var(--gutter)] pt-5 md:grid-cols-[1fr_auto_1fr] md:pt-6">
      <Link href={home} aria-label="ROVBA Design" className="logo-link pointer-events-auto">
        <LogoMark className="h-[30px] w-auto md:h-[34px]" />
      </Link>
      <nav aria-label={d.nav.main} className="pointer-events-auto flex items-start gap-5 md:gap-8">
        <ul className="label flex gap-4 md:gap-8">
          {nav.map((n) => (
            <li key={n.href} className={"wide" in n ? "hidden md:block" : undefined}>
              <Link href={n.href} className="link-quiet">
                {n.label}
              </Link>
            </li>
          ))}
        </ul>
        <LangSwitch lang={lang} alternate={alternate} className="md:hidden" />
      </nav>
      <div className="pointer-events-auto hidden justify-self-end text-right md:flex md:gap-8">
        <LangSwitch lang={lang} alternate={alternate} />
        <p className="label text-muted">
          {d.place}
          <br />
          {d.craft}
        </p>
      </div>
    </header>
  );
}
