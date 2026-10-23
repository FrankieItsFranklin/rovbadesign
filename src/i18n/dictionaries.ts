import type { ProjectStatus } from "@/data/projects";
import type { Lang } from "./config";

const en = {
  meta: {
    title: "ROVBA Design — web studio, Warsaw",
    description:
      "Independent web studio from Warsaw designing distinctive websites for restaurants, clinics, barbers, salons and local businesses.",
  },
  nav: { work: "Work", studio: "Studio", contact: "Contact", main: "Main", language: "Language" },
  place: "Warsaw / Poland",
  craft: "Web design & development",
  home: {
    heading: "ROVBA Design — selected work",
    lineLabel: "Selected work. Drag, swipe or use the arrow keys to move along the line.",
    statement: "Digital places for real businesses.",
    selected: "Selected work",
    count: (n: number) => `${n} projects, 2026`,
    drag: "Drag to explore",
    swipe: "Swipe",
    studio: "Independent web studio",
    city: "Warsaw",
  },
  studio: {
    title: "Studio",
    statement:
      "ROVBA is a small web studio in Warsaw. We design and build websites for restaurants, clinics, barbers and salons, and every one of them gets a visual world of its own instead of a template.",
    columns: [
      { title: "What we make", items: ["Art direction", "Web design", "Development", "Content editing for owners", "Launch and handover"] },
      {
        title: "Who we make it for",
        items: ["Restaurants and cafés", "Dental clinics", "Barbers and hair salons", "Local services", "Small and mid-sized companies"],
      },
      {
        title: "How a project runs",
        items: [
          "We study the business and its street",
          "One visual direction, argued",
          "A working prototype in days",
          "Build, test on real phones",
          "You own the site and the code",
        ],
      },
    ],
  },
  contact: {
    title: "Contact",
    statement: "Tell us about your place: what it is, where it is and who comes in. We reply within two working days.",
    subject: "New website",
    signature: "ROVBA Design, Warsaw, 2026",
    credits: "Photographs in the concept projects:",
    by: "by",
    via: ", via Wikimedia Commons.",
  },
  card: { alt: (title: string) => `${title} website, first screen` },
  work: {
    allWork: "← All work",
    category: "Category",
    location: "Location",
    year: "Year",
    status: "Status",
    country: "Poland",
    statuses: { Live: "Live", Prototype: "Prototype", Concept: "Concept" } satisfies Record<ProjectStatus, string>,
    services: "Services",
    visit: "Visit the live site ↗",
    conceptNote: "A studio concept: names, prices and photographs are illustrative.",
    prototypeNote: "A working prototype built with the client; it is not public yet.",
    heroAlt: (title: string) => `${title} website, first screen on a desktop`,
    desktopLabel: "Desktop screens",
    desktopAlt: [(t: string) => `${t} website, a section further down the page`, (t: string) => `${t} website, a later section on a desktop`],
    phoneTitle: "On the phone",
    phoneText:
      "Designed as its own composition at 390 pixels, not a shrunken desktop: the first screen still answers what, where and when.",
    phoneAlt: (title: string, i: number) => `${title} on a phone, screen ${i} of 3`,
    details: "Design details",
    task: "The task",
    next: "Next project",
  },
  notFound: { title: "Not on the line.", back: "← Back to the work" },
};

export type Dictionary = typeof en;

// Polish plural: 1 projekt, 2–4 projekty (but 12–14 projektów), otherwise projektów.
const projekty = (n: number) => {
  if (n === 1) return "projekt";
  const tens = n % 100;
  return n % 10 >= 2 && n % 10 <= 4 && (tens < 12 || tens > 14) ? "projekty" : "projektów";
};

const pl: Dictionary = {
  meta: {
    title: "ROVBA Design — studio stron, Warszawa",
    description:
      "Niezależne studio z Warszawy. Projektujemy wyraziste strony dla restauracji, gabinetów, barberów, salonów i lokalnych firm.",
  },
  nav: { work: "Prace", studio: "Studio", contact: "Kontakt", main: "Główna", language: "Język" },
  place: "Warszawa / Polska",
  craft: "Projektowanie i wdrażanie stron",
  home: {
    heading: "ROVBA Design — wybrane prace",
    lineLabel: "Wybrane prace. Przeciągnij, przesuń palcem albo użyj strzałek, aby przesuwać linię.",
    statement: "Cyfrowe miejsca dla prawdziwych firm.",
    selected: "Wybrane prace",
    count: (n: number) => `${n} ${projekty(n)}, 2026`,
    drag: "Przeciągnij, aby zobaczyć",
    swipe: "Przesuń",
    studio: "Niezależne studio stron",
    city: "Warszawa",
  },
  studio: {
    title: "Studio",
    statement:
      "ROVBA to małe studio stron w Warszawie. Projektujemy i budujemy strony dla restauracji, gabinetów, barberów i salonów — każda dostaje własny wizualny świat zamiast szablonu.",
    columns: [
      { title: "Co robimy", items: ["Art direction", "Projekt strony", "Programowanie", "Edycja treści przez właściciela", "Wdrożenie i przekazanie"] },
      {
        title: "Dla kogo",
        items: ["Restauracje i kawiarnie", "Gabinety stomatologiczne", "Barberzy i salony fryzjerskie", "Usługi lokalne", "Małe i średnie firmy"],
      },
      {
        title: "Jak pracujemy",
        items: [
          "Poznajemy firmę i jej ulicę",
          "Jeden kierunek wizualny, uzasadniony",
          "Działający prototyp w kilka dni",
          "Budowa i testy na prawdziwych telefonach",
          "Strona i kod należą do Ciebie",
        ],
      },
    ],
  },
  contact: {
    title: "Kontakt",
    statement: "Opowiedz nam o swoim miejscu: czym jest, gdzie jest i kto do niego przychodzi. Odpowiadamy w ciągu dwóch dni roboczych.",
    subject: "Nowa strona",
    signature: "ROVBA Design, Warszawa, 2026",
    credits: "Zdjęcia w projektach koncepcyjnych:",
    by: "autor:",
    via: ", Wikimedia Commons.",
  },
  card: { alt: (title: string) => `Strona ${title}, pierwszy ekran` },
  work: {
    allWork: "← Wszystkie prace",
    category: "Kategoria",
    location: "Miejsce",
    year: "Rok",
    status: "Status",
    country: "Polska",
    statuses: { Live: "Online", Prototype: "Prototyp", Concept: "Koncept" },
    services: "Zakres",
    visit: "Zobacz stronę ↗",
    conceptNote: "Koncept studia: nazwy, ceny i zdjęcia są przykładowe.",
    prototypeNote: "Działający prototyp przygotowany z klientem; jeszcze niepubliczny.",
    heroAlt: (title: string) => `Strona ${title}, pierwszy ekran na komputerze`,
    desktopLabel: "Ekrany na komputerze",
    desktopAlt: [(t: string) => `Strona ${t}, sekcja niżej na stronie`, (t: string) => `Strona ${t}, kolejna sekcja na komputerze`],
    phoneTitle: "Na telefonie",
    phoneText:
      "Osobna kompozycja na 390 pikseli, a nie pomniejszony desktop: pierwszy ekran nadal mówi, co, gdzie i kiedy.",
    phoneAlt: (title: string, i: number) => `${title} na telefonie, ekran ${i} z 3`,
    details: "Szczegóły projektu",
    task: "Zadanie",
    next: "Następny projekt",
  },
  notFound: { title: "Tego nie ma na linii.", back: "← Wróć do prac" },
};

export const dictionaries: Record<Lang, Dictionary> = { en, pl };
