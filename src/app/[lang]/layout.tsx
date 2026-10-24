import type { Metadata, Viewport } from "next";
import { Newsreader, Schibsted_Grotesk } from "next/font/google";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import { Splash } from "@/components/Splash";
import { SITE_URL, studio } from "@/data/studio";
import { NICHES, niches } from "@/data/niches";
import { LANGS, isLang } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionaries";
import "./globals.css";

const grotesk = Schibsted_Grotesk({ subsets: ["latin", "latin-ext"], variable: "--font-grotesk", display: "swap" });
const newsreader = Newsreader({
  subsets: ["latin", "latin-ext"],
  variable: "--font-newsreader",
  style: ["normal", "italic"],
  display: "swap",
});

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

// The studio as a local business; only facts that are filled in on data/studio.ts are published.
const studioLd = (lang: string) => ({
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#studio`,
  name: studio.name,
  url: SITE_URL,
  image: `${SITE_URL}/opengraph-image`,
  description: dictionaries[lang === "pl" ? "pl" : "en"].meta.description,
  areaServed: [{ "@type": "City", name: "Warszawa" }, { "@type": "Country", name: "Polska" }],
  address: { "@type": "PostalAddress", addressLocality: "Warszawa", addressCountry: "PL", ...(studio.address ? { streetAddress: studio.address } : {}) },
  ...(studio.phone ? { telephone: studio.phone } : {}),
  ...(studio.nip ? { taxID: studio.nip } : {}),
  knowsAbout: NICHES.map((n) => niches[n].en.title),
  inLanguage: ["pl", "en"],
});

export const viewport: Viewport = { themeColor: "#f3f1ec" };

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  return (
    // The splash script sets data-splash on <html> before React hydrates.
    <html lang={lang} className={`${grotesk.variable} ${newsreader.variable}`} suppressHydrationWarning>
      <head>
        {/* Without JS the line stays a plain scrolling row, so it must not wait for the engine. */}
        <noscript>
          <style>{".line:not(.is-ready) .card, .line:not(.is-ready) .rope { opacity: 1 }"}</style>
        </noscript>
      </head>
      <body>
        <Splash />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(studioLd(lang)) }} />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
