import type { Metadata } from "next";
import { Newsreader, Schibsted_Grotesk } from "next/font/google";
import Link from "next/link";
import { dictionaries } from "@/i18n/dictionaries";
import "./[lang]/globals.css";

const grotesk = Schibsted_Grotesk({ subsets: ["latin", "latin-ext"], variable: "--font-grotesk", display: "swap" });
const newsreader = Newsreader({ subsets: ["latin", "latin-ext"], variable: "--font-newsreader", display: "swap" });

export const metadata: Metadata = { title: "404 — ROVBA Design" };

// Rendered outside the [lang] layout, so it speaks English with a Polish line underneath.
export default function GlobalNotFound() {
  const { en, pl } = dictionaries;
  return (
    <html lang="en" className={`${grotesk.variable} ${newsreader.variable}`}>
      <body>
        <main className="flex min-h-svh flex-col justify-between px-[var(--gutter)] py-6">
          <Link href="/" className="label text-[13px] font-bold tracking-[0.08em]">
            ROVBA Design
          </Link>
          <div>
            <h1 className="text-[clamp(48px,9vw,140px)] leading-[0.88] font-bold tracking-[-0.045em]">{en.notFound.title}</h1>
            <p lang="pl" className="mt-4 text-[20px] text-muted">
              {pl.notFound.title}
            </p>
            <div className="label mt-8 flex gap-8">
              <Link href="/" className="link-quiet">
                {en.notFound.back}
              </Link>
              <Link href="/pl" lang="pl" className="link-quiet">
                {pl.notFound.back}
              </Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
