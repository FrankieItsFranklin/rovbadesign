import type { Metadata, Viewport } from "next";
import { Newsreader, Schibsted_Grotesk } from "next/font/google";
import { notFound } from "next/navigation";
import { Splash } from "@/components/Splash";
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
    metadataBase: new URL("https://rovbadesign.pl"),
    title: { default: d.meta.title, template: "%s — ROVBA Design" },
    description: d.meta.description,
  };
}

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
        {children}
      </body>
    </html>
  );
}
