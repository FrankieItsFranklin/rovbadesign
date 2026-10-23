import Link from "next/link";
import { LangSwitch } from "@/components/LangSwitch";
import { Logo } from "@/components/Logo";
import { type Lang, localePath } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionaries";

export function CaseHeader({ lang, alternate }: { lang: Lang; alternate: string }) {
  const d = dictionaries[lang];
  const home = localePath(lang, "/");
  return (
    <header className="absolute inset-x-0 top-0 z-10 grid grid-cols-[1fr_auto] items-start gap-6 px-[var(--gutter)] pt-5 md:grid-cols-[1fr_auto_1fr] md:pt-6">
      <Link href={home} aria-label="ROVBA Design" className="logo-link">
        <Logo className="h-[26px] w-auto md:h-[30px]" />
      </Link>
      <div className="flex items-start gap-5">
        <Link href={home} className="label link-quiet">
          {d.work.allWork}
        </Link>
        <LangSwitch lang={lang} alternate={alternate} className="md:hidden" />
      </div>
      <div className="hidden justify-self-end text-right md:flex md:gap-8">
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
