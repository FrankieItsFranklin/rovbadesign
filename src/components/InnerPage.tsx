import type { ReactNode } from "react";
import { ContactSection } from "@/components/portfolio/ContactSection";
import { SiteHeader } from "@/components/space/SiteHeader";
import type { Lang } from "@/i18n/config";

/** Shared frame of the text pages: the case header, a title block, the page, then the contact footer. */
export function InnerPage({
  lang,
  alternate,
  label,
  title,
  lead,
  read = false,
  children,
}: {
  lang: Lang;
  alternate: string;
  label: string;
  title: string;
  lead?: string;
  /** A long read (an article, the privacy policy): its body stays left-aligned for reading. */
  read?: boolean;
  children: ReactNode;
}) {
  return (
    <>
      <SiteHeader lang={lang} alternate={alternate} />
      <main id="main" className="on-rail px-[var(--gutter)] pt-36 md:pt-44">
        <div className="page-head">
          <p className="strand-anchor tech" data-strand-anchor>
            {label}
          </p>
          <h1 className="page-title">{title}</h1>
          {lead && <p className="statement statement-sm">{lead}</p>}
        </div>
        <div className={`pt-20 pb-28 md:pt-28 md:pb-40${read ? "" : " inner-center"}`}>{children}</div>
      </main>
      <ContactSection lang={lang} />
    </>
  );
}
