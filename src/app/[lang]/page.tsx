import type { Metadata } from "next";
import { ContactSection } from "@/components/portfolio/ContactSection";
import { StudioSection } from "@/components/portfolio/StudioSection";
import { FaqSection } from "@/components/space/FaqSection";
import { generalFaq } from "@/data/faq";
import { dictionaries } from "@/i18n/dictionaries";
import { faqPage, JsonLd } from "@/lib/jsonld";
import { Hero } from "@/components/space/Hero";
import { ProcessSection } from "@/components/space/ProcessSection";
import { SiteHeader } from "@/components/space/SiteHeader";
import { type Lang, localePath } from "@/i18n/config";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const lang = (await params).lang as Lang;
  return { alternates: { canonical: localePath(lang, "/"), languages: { pl: "/", en: "/en", "x-default": "/" } } };
}

// The work (/work) and the offer (/uslugi) have their own pages; the landing is the first screen, the process, the
// studio, the questions and contact.
export default async function Home({ params }: PageProps<"/[lang]">) {
  const lang = (await params).lang as Lang;
  const faq = dictionaries[lang].faq;
  return (
    <>
      <SiteHeader lang={lang} alternate={localePath(lang === "en" ? "pl" : "en", "/")} />
      <main id="main">
        <Hero lang={lang} />
        <ProcessSection lang={lang} />
        <StudioSection lang={lang} />
        <FaqSection num={4} title={faq.title} lead={faq.lead} items={generalFaq[lang]} />
      </main>
      <JsonLd data={faqPage(generalFaq[lang], localePath(lang, "/"))} />
      <ContactSection lang={lang} />
    </>
  );
}
