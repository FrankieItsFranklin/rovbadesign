import type { ReactNode } from "react";
import { ContactSection } from "@/components/portfolio/ContactSection";
import { CaseHeader } from "@/components/projects/CaseHeader";
import type { Lang } from "@/i18n/config";

/** Shared frame of the text pages: the case header, a title block, the page, then the contact footer. */
export function InnerPage({ lang, alternate, label, title, lead, children }: { lang: Lang; alternate: string; label: string; title: string; lead?: string; children: ReactNode }) {
  return (
    <>
      <CaseHeader lang={lang} alternate={alternate} />
      <main className="px-[var(--gutter)] pt-36 md:pt-44">
        <div className="grid gap-8 md:grid-cols-12 md:gap-8">
          <p className="label md:col-span-3 md:pt-4">{label}</p>
          <div className="md:col-span-9">
            <h1 className="max-w-[18ch] text-[44px] leading-[0.98] font-semibold tracking-[-0.035em] md:text-[84px]">{title}</h1>
            {lead && <p className="mt-8 max-w-[34ch] font-serif text-[24px] leading-[1.22] tracking-[-0.01em] md:text-[30px]">{lead}</p>}
          </div>
        </div>
        <div className="pt-20 pb-28 md:pt-28 md:pb-40">{children}</div>
      </main>
      <ContactSection lang={lang} />
    </>
  );
}
