import type { Metadata } from "next";
import Link from "next/link";
import { InnerPage } from "@/components/InnerPage";
import { journal } from "@/data/journal";
import type { Lang } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionaries";
import { pagePath } from "@/i18n/routes";

export async function generateMetadata({ params }: PageProps<"/[lang]/journal">): Promise<Metadata> {
  const lang = (await params).lang as Lang;
  const d = dictionaries[lang].journal;
  return {
    title: d.title,
    description: d.lead,
    alternates: { canonical: pagePath(lang, "journal"), languages: { en: pagePath("en", "journal"), pl: pagePath("pl", "journal") } },
  };
}

const dateFmt = (lang: Lang, iso: string) => new Date(iso).toLocaleDateString(lang === "pl" ? "pl-PL" : "en-GB", { day: "numeric", month: "long", year: "numeric" });

export default async function Journal({ params }: PageProps<"/[lang]/journal">) {
  const lang = (await params).lang as Lang;
  const d = dictionaries[lang].journal;
  return (
    <InnerPage lang={lang} alternate={pagePath(lang === "en" ? "pl" : "en", "journal")} label={d.title} title={d.title} lead={d.lead}>
      <ul className="md:ml-[25%]">
        {journal.map((a) => (
          <li key={a.id} className="border-t border-ink">
            <Link href={pagePath(lang, "journal", a[lang].slug)} className="group grid gap-3 py-8 md:grid-cols-[1fr_auto] md:gap-10 md:py-10">
              <div>
                <h2 className="text-[28px] leading-[1.08] font-semibold tracking-[-0.02em] md:text-[40px]">{a[lang].title}</h2>
                <p className="mt-3 max-w-[56ch] text-[17px] leading-[1.5] text-ink/75">{a[lang].description}</p>
              </div>
              <p className="label text-muted md:text-right">
                {dateFmt(lang, a.date)}
                <br />
                {d.minutes(a.minutes)}
                <span className="mt-4 hidden text-ink transition-transform duration-300 group-hover:translate-x-1 md:block">{d.read} →</span>
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </InnerPage>
  );
}
