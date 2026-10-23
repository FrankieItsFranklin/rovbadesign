// Every project on the line. To add one: drop its images into public/work/<id>/
// (or run `npm run shots <id>` after adding it to scripts/capture.mjs) and append an entry here.

export type CardAspect = "4/5" | "1/1" | "3/4";
export type ProjectStatus = "Live" | "Prototype" | "Concept";

export type Project = {
  id: string;
  slug: string;
  title: string;
  client: string;
  category: string;
  city: string;
  year: number;
  status: ProjectStatus;
  services: string[];
  description: string;
  challenge: string;
  approach: string;
  details: { label: string; text: string }[];
  cover: string;
  coverPosition: string;
  desktopImages: string[];
  mobileImages: string[];
  liveUrl?: string;
  /** Field colour behind the phone screens on the case study. */
  accent: string;
  accentInk: string;
  /** Curated irregularity: fixed per project so every visit hangs the same way. */
  cardRotation: number;
  cardDrop: number;
  cardScale: number;
  cardAspectRatio: CardAspect;
  featured: boolean;
};

const shots = (id: string) => ({
  cover: `/work/${id}/cover.jpg`,
  desktopImages: [1, 2, 3].map((n) => `/work/${id}/desktop-${n}.jpg`),
  mobileImages: [1, 2, 3].map((n) => `/work/${id}/mobile-${n}.jpg`),
});

export const projects: Project[] = [
  {
    id: "finir",
    slug: "finir",
    title: "Finir",
    client: "Finir Gabinet Stomatologiczny",
    category: "Dental Clinic",
    city: "Warsaw",
    year: 2026,
    status: "Prototype",
    services: ["Art Direction", "UX/UI", "Web Design", "Development", "Responsive Design"],
    description:
      "A small dental practice in Żoliborz that wanted to feel calm rather than clinical. The site reads like a printed patient leaflet: a quiet serif, generous margins, and every step of a first visit explained before anyone has to call.",
    challenge: "Most dental sites in the city open with stock smiles and a booking button. Finir needed to earn trust first.",
    approach:
      "We led with the conversation instead of the treatment: three plain steps, real opening hours, and a price list that stays readable on a phone.",
    details: [
      { label: "Typography", text: "A light editorial serif for headlines, set large and slightly italic for the one sentence that matters." },
      { label: "Palette", text: "Bone paper, a deep pine green for actions and nothing else." },
      { label: "Interaction", text: "A booking form that says plainly what happens after you press send." },
    ],
    ...shots("finir"),
    coverPosition: "50% 0%",
    accent: "#2f4a3f",
    accentInk: "#f3efe6",
    cardRotation: -2.4,
    cardDrop: 0,
    cardScale: 1,
    cardAspectRatio: "4/5",
    featured: true,
  },
  {
    id: "halong",
    slug: "ha-long-curry",
    title: "Ha Long Curry",
    client: "Ha Long Curry",
    category: "Vietnamese Restaurant",
    city: "Warsaw",
    year: 2026,
    status: "Live",
    services: ["Art Direction", "Web Design", "Development", "CMS", "Bilingual Site"],
    description:
      "A Vietnamese restaurant whose dining room is already a world of its own: lanterns, lacquer and a painting of Ha Long Bay on the wall. The site brings that room online and lets the owners change the menu themselves.",
    challenge: "The menu changes often and the owners are not technical. The room is the brand, and photographs of it had to carry the page.",
    approach:
      "A full-bleed dining room hero, the bay painting as the story section, and a browser-based editor for dishes, prices and hours.",
    details: [
      { label: "Typography", text: "A heavy grotesk in gold and white, set as loud as the dining room." },
      { label: "Imagery", text: "The restaurant's own interior, shot warm, never cropped into thumbnails." },
      { label: "Content", text: "Menu, hours and gallery edited by the owners through /admin, published in minutes." },
    ],
    ...shots("halong"),
    liveUrl: "https://halongcurry.pl",
    coverPosition: "50% 0%",
    accent: "#3a1c15",
    accentInk: "#f6e7c9",
    cardRotation: 1.1,
    cardDrop: 6,
    cardScale: 1.04,
    cardAspectRatio: "4/5",
    featured: true,
  },
  {
    id: "north-barber",
    slug: "north-barber",
    title: "North Barber",
    client: "North Barber",
    category: "Barbershop",
    city: "Warsaw",
    year: 2026,
    status: "Concept",
    services: ["Art Direction", "Identity", "Web Design"],
    description:
      "A studio concept for a three-chair barbershop in Praga. Loud condensed type, a black room and one signal red, so the price list reads from across the street.",
    challenge: "Barbershop sites look interchangeable: dark photos, a script logo, a booking widget in a different style.",
    approach: "We made the type the interior: the name runs the full width of the screen and the price list is set like a shop sign.",
    details: [
      { label: "Typography", text: "Anton for everything that shouts, a plain grotesk for everything that informs." },
      { label: "Palette", text: "Black, bone and one red full stop that becomes the mark." },
      { label: "Imagery", text: "Archive photographs of old barber chairs, desaturated until they match the type." },
    ],
    ...shots("north-barber"),
    coverPosition: "50% 0%",
    accent: "#141414",
    accentInk: "#ecebe6",
    cardRotation: -0.7,
    cardDrop: -4,
    cardScale: 0.92,
    cardAspectRatio: "3/4",
    featured: false,
  },
  {
    id: "lident",
    slug: "lident",
    title: "Lident",
    client: "Gabinet Stomatologiczny Lident",
    category: "Dental Clinic",
    city: "Warsaw",
    year: 2026,
    status: "Prototype",
    services: ["UX/UI", "Web Design", "Development", "Interactive Element"],
    description:
      "A prototype for a dental practice in Mokotów, built to start a conversation with the client. Its first screen is a drawn smile: tap the tooth that worries you and the booking form already knows where it hurts.",
    challenge: "Patients rarely know the name of their problem. They know which tooth.",
    approach:
      "An interactive dental chart turns a symptom into a pre-filled booking request, and the price list answers before the phone call.",
    details: [
      { label: "Interaction", text: "Tooth, symptom, booking: three taps from the first screen to a filled form." },
      { label: "Illustration", text: "Every drawing is made in code in the practice's porcelain and sage colours." },
      { label: "Pricing", text: "A searchable price list with no asterisks, as the headline promises." },
    ],
    ...shots("lident"),
    coverPosition: "0% 0%",
    accent: "#dfe8df",
    accentInk: "#1d2a22",
    cardRotation: 2,
    cardDrop: 3,
    cardScale: 1.08,
    cardAspectRatio: "1/1",
    featured: false,
  },
  {
    id: "milanovo",
    slug: "milanovo",
    title: "Milanovo",
    client: "Milanovo",
    category: "Ristorante, Pizzeria, Caffè",
    city: "Warsaw",
    year: 2026,
    status: "Concept",
    services: ["Art Direction", "Identity", "Web Design"],
    description:
      "A studio concept for an Italian restaurant that has been on the same corner since 1987. Bottle green, Bodoni and a menu you can read like the printed card on the table.",
    challenge: "Italian restaurant sites reach for checked tablecloths and flags. Milanovo is quieter than that, and older.",
    approach: "Old-money restraint: one serif, three colours, the oven as the hero and the morning espresso bar as its own chapter.",
    details: [
      { label: "Typography", text: "Bodoni Moda for the name and the dishes, Libre Franklin for prices and hours." },
      { label: "Palette", text: "Bottle green, cream card stock and one deep wine red." },
      { label: "Menu", text: "Every dish with its price and one line of what is in it, no PDF download." },
    ],
    ...shots("milanovo"),
    coverPosition: "50% 0%",
    accent: "#1d3428",
    accentInk: "#efe7d4",
    cardRotation: -1.5,
    cardDrop: 8,
    cardScale: 1,
    cardAspectRatio: "4/5",
    featured: true,
  },
  {
    id: "luka",
    slug: "luka",
    title: "Luka",
    client: "Luka Biuro Rachunkowe",
    category: "Accounting Office",
    city: "Kraków",
    year: 2026,
    status: "Prototype",
    services: ["UX/UI", "Web Design", "Development", "Pricing Calculator"],
    description:
      "An accounting office in Kraków, working since 1993, that wanted new clients to understand the price before the first meeting. The site is built around a calculator that turns a number of documents into a monthly fee.",
    challenge: "Accounting firms hide their prices behind a contact form. Small businesses leave before they ask.",
    approach: "A clear service promise in the headline and a live subscription calculator directly under it.",
    details: [
      { label: "Interaction", text: "Slide the number of documents and employees, read the exact monthly price." },
      { label: "Typography", text: "A precise grotesk with tabular figures, so every price lines up." },
      { label: "Tone", text: "Plain Polish, no tax jargon on the first screen." },
    ],
    ...shots("luka"),
    coverPosition: "50% 0%",
    accent: "#e9e9e4",
    accentInk: "#151515",
    cardRotation: 0.6,
    cardDrop: -2,
    cardScale: 0.94,
    cardAspectRatio: "3/4",
    featured: false,
  },
  {
    id: "atelier-17",
    slug: "atelier-17",
    title: "Atelier 17",
    client: "Atelier 17",
    category: "Hair Studio",
    city: "Warsaw",
    year: 2026,
    status: "Concept",
    services: ["Art Direction", "Web Design"],
    description:
      "A studio concept for a hair salon on Powiśle that takes one client at a time. Fashion-magazine restraint: a hairline serif, a stone ground and black-and-white photography.",
    challenge: "Beauty sites tend to be pink, busy and full of offers. This salon sells time and attention.",
    approach: "The door number became the identity, set huge and pale behind the name, with services priced plainly underneath.",
    details: [
      { label: "Typography", text: "Italiana at display sizes, Manrope for everything a client needs to read." },
      { label: "Imagery", text: "A 1953 archive photograph of a salon mirror sets the mood until the studio is shot." },
      { label: "Layout", text: "Asymmetric halves, the photograph always taller than the text beside it." },
    ],
    ...shots("atelier-17"),
    coverPosition: "50% 0%",
    accent: "#dcd7cf",
    accentInk: "#151515",
    cardRotation: -1.9,
    cardDrop: 5,
    cardScale: 1.02,
    cardAspectRatio: "4/5",
    featured: false,
  },
  {
    id: "adp",
    slug: "adp-clinic",
    title: "ADP Clinic",
    client: "ADP Clinic",
    category: "Implant Clinic",
    city: "Lublin",
    year: 2026,
    status: "Prototype",
    services: ["Art Direction", "UX/UI", "Web Design", "Development", "Motion"],
    description:
      "A multi-page site for a dental implant clinic in Lublin, open since 1993. The signature is an implant that comes apart as you scroll: crown, abutment, titanium fixture, each with its price.",
    challenge: "Implant treatment is expensive and hard to picture. Patients need to see what they are paying for.",
    approach: "A scroll-driven exploded implant, a full price list and a cost calculator, all on a dark clinical night-blue.",
    details: [
      { label: "Motion", text: "The implant explodes part by part on scroll; on phones it becomes a pinned drawing with one card." },
      { label: "Palette", text: "Night blue and titanium greys, with a scan-line cyan for actions." },
      { label: "Structure", text: "Eight pages, every price and treatment step stored as editable data." },
    ],
    ...shots("adp"),
    coverPosition: "30% 0%",
    accent: "#0d1b24",
    accentInk: "#e8edef",
    cardRotation: 1.4,
    cardDrop: 0,
    cardScale: 1,
    cardAspectRatio: "4/5",
    featured: true,
  },
  {
    id: "piernicova",
    slug: "piernicova",
    title: "Piernicova",
    client: "Restauracja Piernicova",
    category: "Restaurant",
    city: "Toruń",
    year: 2026,
    status: "Prototype",
    services: ["Art Direction", "Web Design", "Development", "Booking"],
    description:
      "A Polish restaurant by the medieval walls of Toruń, with gingerbread as a quiet signature. Reservations arrive as a printed ticket hanging from a brass rail.",
    challenge: "A restaurant with a strong local story and a menu that changes with the season.",
    approach: "A warm gingerbread-brown room, the autumn menu as browsable data, and a booking ticket that feels like paper.",
    details: [
      { label: "Interaction", text: "The booking form is a two-step ticket with a stamp at the end." },
      { label: "Menu", text: "The whole seasonal card with prices, filterable by ingredient." },
      { label: "Typography", text: "A brush-script name over a sturdy, bookish serif." },
    ],
    ...shots("piernicova"),
    coverPosition: "50% 0%",
    accent: "#3a2418",
    accentInk: "#f1e3cf",
    cardRotation: -0.9,
    cardDrop: -5,
    cardScale: 1.06,
    cardAspectRatio: "1/1",
    featured: false,
  },
  {
    id: "dental-3d",
    slug: "dental-3d-explorer",
    title: "Dental 3D Explorer",
    client: "ROVBA Lab",
    category: "Interactive Module",
    city: "Warsaw",
    year: 2026,
    status: "Prototype",
    services: ["Creative Development", "3D", "UX/UI"],
    description:
      "A lab piece: an interactive tooth and implant that a clinic can drop into its own site. Rotate it, switch to X-ray, pull the implant apart and read what each part does.",
    challenge: "Patients nod through implant consultations without picturing a single part.",
    approach: "Procedural 3D geometry with no heavy model files, four viewing modes and plain-language notes beside each part.",
    details: [
      { label: "Technology", text: "React Three Fiber with geometry built in code, so it loads fast." },
      { label: "Modes", text: "Surface, anatomy, X-ray and exploded views of the same tooth." },
      { label: "Use", text: "Built as a module for premium dental sites, not as a stand-alone app." },
    ],
    ...shots("dental-3d"),
    coverPosition: "50% 0%",
    accent: "#101714",
    accentInk: "#e4efe9",
    cardRotation: 2.2,
    cardDrop: 4,
    cardScale: 0.9,
    cardAspectRatio: "3/4",
    featured: false,
  },
  {
    id: "sobaniec",
    slug: "sobaniec",
    title: "Stomatologia Sobaniec",
    client: "Stomatologia Dr Stefan Sobaniec",
    category: "Family Dental Practice",
    city: "Białystok",
    year: 2026,
    status: "Prototype",
    services: ["UX/UI", "Web Design", "Development"],
    description:
      "A shared practice in central Białystok where a mother and son treat patients side by side. The redesign replaces an old WordPress site with one that answers the real questions: who, how much and how to book.",
    challenge: "Sixty price positions, three doctors and booking split between the phone and an external calendar.",
    approach: "A deep sea-green first screen, real numbers instead of slogans, and the full price list in six chapters.",
    details: [
      { label: "Content", text: "Every figure on the page comes from the practice: ratings with dates, years of experience, prices." },
      { label: "Palette", text: "Deep teal with a soft peach, calm enough for children and their grandparents." },
      { label: "Structure", text: "One long page with the price list, team, reviews and questions in their own chapters." },
    ],
    ...shots("sobaniec"),
    coverPosition: "0% 0%",
    accent: "#0f3a3e",
    accentInk: "#eaf3f1",
    cardRotation: -1.2,
    cardDrop: 2,
    cardScale: 0.98,
    cardAspectRatio: "4/5",
    featured: false,
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const getNextProject = (slug: string) => {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
};

export const imageCredits = [
  {
    project: "milanovo",
    title: "Wood-fired Pizza Oven at Baronessa Italian Restaurant",
    author: "Zacatillo1",
    licence: "CC BY-SA 4.0",
    url: "https://commons.wikimedia.org/wiki/File:Wood-fired_Pizza_Oven_at_Baronessa_Italian_Restaurant.jpg",
  },
  {
    project: "milanovo",
    title: "Espresso coffee",
    author: "Fraapal",
    licence: "CC BY-SA 4.0",
    url: "https://commons.wikimedia.org/wiki/File:Espresso_coffee.jpg",
  },
  {
    project: "north-barber",
    title: "Vintage red barber chairs in a rustic wooden shop",
    author: "PattayaPatrol",
    licence: "CC BY-SA 4.0",
    url: "https://commons.wikimedia.org/wiki/File:DSCF1083_Vintage_red_barber_chairs_in_a_rustic_wooden_shop_waiting_for_the_next_customer.jpg",
  },
  {
    project: "atelier-17",
    title: "Hairdresser (1953)",
    author: "U. A. Saarinen",
    licence: "CC BY 4.0",
    url: "https://commons.wikimedia.org/wiki/File:Hairdresser_1953_(JOKAUAS2_2203-10).tif",
  },
];
