import type { Metadata } from "next";
import { Saira } from "next/font/google";
import Link from "next/link";
import { LogoMark } from "@/components/LogoMark";
import { dictionaries } from "@/i18n/dictionaries";
import "./[lang]/globals.css";

const saira = Saira({ subsets: ["latin", "latin-ext"], axes: ["wdth"], variable: "--font-saira", display: "swap" });

export const metadata: Metadata = { title: "404 — ROVBA Design" };

// Rendered outside the [lang] layout, so it speaks Polish with an English line underneath.
export default function GlobalNotFound() {
  const { en, pl } = dictionaries;
  return (
    <html lang="pl" className={saira.variable}>
      <body>
        <main className="flex min-h-svh flex-col justify-between px-[var(--gutter)] py-6">
          <Link href="/" aria-label="ROVBA Design" className="logo-link self-start">
            <LogoMark className="h-[30px] w-auto md:h-[34px]" />
          </Link>
          <div>
            <h1 className="text-[clamp(48px,9vw,140px)] leading-[0.92] font-light uppercase">{pl.notFound.title}</h1>
            <p lang="en" className="mt-4 text-[20px] text-muted">
              {en.notFound.title}
            </p>
            <div className="label mt-8 flex gap-8">
              <Link href="/" className="link-quiet">
                {pl.notFound.back}
              </Link>
              <Link href="/en" lang="en" className="link-quiet">
                {en.notFound.back}
              </Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
