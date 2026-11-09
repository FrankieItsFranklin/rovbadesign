// Structured data (schema.org JSON-LD). One graph per page: the studio and the site everywhere (layout), plus what the
// page is about. Only facts stated on the site go in; empty studio details (phone, address, NIP) are simply left out.
import { niches, NICHES } from "@/data/niches";
import { PACKAGE_PRICES } from "@/data/prices";
import type { Project } from "@/data/projects";
import { mapsUrl, SITE_URL, studio } from "@/data/studio";
import type { Qa } from "@/data/faq";
import { SERVICES } from "@/data/services";
import { type Lang, localePath } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionaries";
import { pagePath } from "@/i18n/routes";

type Thing = Record<string, unknown>;

export const STUDIO_ID = `${SITE_URL}/#studio`;
export const SITE_ID = `${SITE_URL}/#website`;
const abs = (path: string) => (path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`);

/** Renders one JSON-LD script. `<` is escaped so text can never close the script tag. */
export function JsonLd({ data }: { data: Thing | Thing[] }) {
  const graph = Array.isArray(data) ? { "@context": "https://schema.org", "@graph": data } : { "@context": "https://schema.org", ...data };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }} />;
}

/** The three packages as offers of the studio's services, priced from their starting price. */
function offerCatalog(lang: Lang): Thing {
  const d = dictionaries[lang].offer;
  return {
    "@type": "OfferCatalog",
    name: dictionaries[lang].servicesPage.packages,
    itemListElement: d.packages.map((p, i) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: p.name, description: `${p.for}. ${p.items.join(", ")}.` },
      ...(PACKAGE_PRICES[i] != null
        ? { priceSpecification: { "@type": "PriceSpecification", minPrice: PACKAGE_PRICES[i], priceCurrency: "PLN", valueAddedTaxIncluded: false } }
        : {}),
    })),
  };
}

/** The studio as a local professional service, and the website it publishes. On every page. */
export function siteGraph(lang: Lang): Thing[] {
  const d = dictionaries[lang];
  return [
    {
      "@type": "ProfessionalService",
      "@id": STUDIO_ID,
      name: studio.name,
      url: SITE_URL,
      logo: `${SITE_URL}/icon.svg`,
      image: `${SITE_URL}/opengraph-image`,
      description: d.meta.description,
      email: studio.email,
      ...(studio.phone ? { telephone: studio.phone } : {}),
      ...(studio.nip ? { taxID: studio.nip } : {}),
      address: {
        "@type": "PostalAddress",
        streetAddress: studio.address,
        addressLocality: "Warszawa",
        ...(studio.postalCode ? { postalCode: studio.postalCode } : {}),
        addressCountry: "PL",
      },
      hasMap: mapsUrl,
      member: studio.team.map(person),
      areaServed: [
        { "@type": "City", name: "Warszawa" },
        { "@type": "Country", name: "Polska" },
      ],
      priceRange: lang === "pl" ? "od 1 500 zł netto" : "from PLN 1,500 + VAT",
      knowsAbout: NICHES.map((n) => niches[n][lang].title),
      knowsLanguage: ["pl", "en"],
      hasOfferCatalog: offerCatalog(lang),
    },
    {
      "@type": "WebSite",
      "@id": SITE_ID,
      url: SITE_URL,
      name: studio.name,
      inLanguage: lang,
      publisher: { "@id": STUDIO_ID },
    },
  ];
}

/** A person of the studio (the about page, the authors of the journal). */
export const person = (name: string): Thing => ({ "@type": "Person", name, worksFor: { "@id": STUDIO_ID } });

/** Questions and answers shown on the page. */
export const faqPage = (items: Qa[], path: string): Thing => ({
  "@type": "FAQPage",
  "@id": `${abs(path)}#faq`,
  mainEntity: items.map((x) => ({ "@type": "Question", name: x.q, acceptedAnswer: { "@type": "Answer", text: x.a } })),
});

/** Where the page sits: the home page, then each step (name, path). */
export function breadcrumbs(lang: Lang, steps: [string, string][]): Thing {
  const all: [string, string][] = [[dictionaries[lang].nav.main, localePath(lang, "/")], ...steps];
  return {
    "@type": "BreadcrumbList",
    itemListElement: all.map(([name, path], i) => ({ "@type": "ListItem", position: i + 1, name, item: abs(path) })),
  };
}

/** A service page for one kind of business (the niche pages). */
export const nicheService = (lang: Lang, name: string, description: string, path: string): Thing => ({
  "@type": "Service",
  "@id": `${abs(path)}#service`,
  name,
  description,
  serviceType: lang === "pl" ? "Projektowanie i tworzenie stron internetowych" : "Website design and development",
  provider: { "@id": STUDIO_ID },
  areaServed: { "@type": "City", name: "Warszawa" },
  url: abs(path),
  offers: { "@type": "Offer", priceSpecification: { "@type": "PriceSpecification", minPrice: PACKAGE_PRICES[0], priceCurrency: "PLN", valueAddedTaxIncluded: false } },
});

/** A case study: the site as a creative work by the studio. Prototypes and concepts say so in their description. */
export function caseStudy(lang: Lang, p: Project): Thing {
  const path = localePath(lang, `/work/${p.slug}`);
  const status = dictionaries[lang].work.statuses[p.status];
  return {
    "@type": "CreativeWork",
    "@id": `${abs(path)}#work`,
    name: p.title,
    headline: `${p.title}: ${p.category}`,
    description: p.description,
    genre: p.category,
    url: abs(path),
    image: abs(p.desktopImages[0]),
    dateCreated: String(p.year),
    inLanguage: lang,
    creator: { "@id": STUDIO_ID },
    locationCreated: { "@type": "Place", name: p.city },
    creativeWorkStatus: status,
    ...(p.liveUrl ? { sameAs: p.liveUrl } : {}),
  };
}

/** The list of all projects on the work page. */
export const workList = (lang: Lang, projects: Project[], name: string): Thing => ({
  "@type": "CollectionPage",
  "@id": `${abs(localePath(lang, "/work"))}#page`,
  name,
  url: abs(localePath(lang, "/work")),
  isPartOf: { "@id": SITE_ID },
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: projects.length,
    itemListElement: projects.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: abs(localePath(lang, `/work/${p.slug}`)), name: p.title })),
  },
});

/** The services page: the five services, each with its own page. */
export const serviceList = (lang: Lang, name: string, path: string): Thing => ({
  "@type": "CollectionPage",
  "@id": `${abs(path)}#page`,
  name,
  url: abs(path),
  isPartOf: { "@id": SITE_ID },
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: SERVICES.length,
    itemListElement: SERVICES.map((s, i) => ({ "@type": "ListItem", position: i + 1, url: abs(pagePath(lang, "services", s[lang].slug)), name: s[lang].title })),
  },
});
