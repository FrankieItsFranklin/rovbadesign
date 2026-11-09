import type { Metadata, Viewport } from "next";
import { Saira } from "next/font/google";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import { SITE_URL } from "@/data/studio";
import { JsonLd, siteGraph } from "@/lib/jsonld";
import { LANGS, isLang } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionaries";
import "./globals.css";
import { PressFeedback } from "@/components/PressFeedback";
import { DigitalEnvironment } from "@/components/space/DigitalEnvironment";
import { EnterScript } from "@/components/space/EnterScript";
import { Intro } from "@/components/space/Intro";
import { StrandCanvas } from "@/components/space/StrandCanvas";

// Digital Space type (DESIGN.md §3): one variable family for the whole site; its width axis gives the narrow labels.
const saira = Saira({ subsets: ["latin", "latin-ext"], axes: ["wdth"], variable: "--font-saira", display: "swap" });

export const dynamicParams = false;

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  const d = dictionaries[isLang(lang) ? lang : "en"];
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: d.meta.title, template: "%s — ROVBA Design" },
    description: d.meta.description,
    openGraph: { siteName: "ROVBA Design", locale: lang === "pl" ? "pl_PL" : "en_GB", type: "website" },
    twitter: { card: "summary_large_image" },
  };
}

export const viewport: Viewport = { themeColor: "#f3f2f0" };

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  return (
    // EnterScript may set data-seen on <html> before React hydrates.
    <html lang={lang} className={saira.variable} suppressHydrationWarning>
      <body>
        <a href="#main" className="skip-link">
          {lang === "pl" ? "Przejdź do treści" : "Skip to content"}
        </a>
        <EnterScript />
        <Intro />
        <PressFeedback />
        <JsonLd data={siteGraph(lang)} />
        {/* Every page stands in the same room, with the strand down its left rail (DESIGN.md §2, §5). */}
        <DigitalEnvironment />
        <div className="strand-rail" data-strand-rail aria-hidden="true" />
        <StrandCanvas />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
