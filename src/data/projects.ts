// Every project on the line. To add one: drop its images into public/work/<id>/
// (or run `npm run shots <id>` after adding it to scripts/capture.mjs) and append an entry here.

export type CardAspect = "4/5" | "1/1" | "3/4" | "16/10";
export type ProjectStatus = "Live" | "Prototype" | "Concept";
export type Niche = "restaurants" | "dental" | "beauty" | "services";

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
  /** A public copy of the prototype or concept, hosted by the portfolio under /demo. */
  demoUrl?: string;
  niche: Niche;
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
    id: "szkliwo",
    demoUrl: "/demo/szkliwo",
    niche: "dental",
    slug: "szkliwo",
    title: "Szkliwo",
    client: "Szkliwo Gabinet Stomatologiczny",
    category: "Dental Clinic",
    city: "Warsaw",
    year: 2026,
    status: "Prototype",
    services: ["Art Direction", "Identity", "UX/UI", "Web Design", "Development"],
    description:
      "A small dental practice in Żoliborz, printed like the Polish pharmaceutical leaflets of the 1960s and 70s. Every treatment is its own leaflet in one flat ink, with a doctor, a price and a plain next step.",
    challenge: "Dental sites in Warsaw all look like the same white clinic with a stock smile. Szkliwo needed a voice no neighbour could copy.",
    approach:
      "We borrowed the visual language of the leaflets Polish drug makers once sent to every local clinic: flat colour fields, tall condensed names broken by syllable and a single black band.",
    details: [
      { label: "Typography", text: "League Gothic caps stacked by syllable, as on a 1970s leaflet, over a plain grotesk for everything a patient reads." },
      { label: "Palette", text: "Grey offset paper and seven flat inks, one per treatment, printed over each other like a two-colour run." },
      { label: "Interaction", text: "Eight leaflets are dealt out of a stack, and the next free slots on the first screen open a booking form that is already filled in." },
    ],
    ...shots("szkliwo"),
    coverPosition: "0% 0%",
    accent: "#2b4fc4",
    accentInk: "#ece9e2",
    cardRotation: -2.4,
    cardDrop: 0,
    cardScale: 1,
    cardAspectRatio: "16/10",
    featured: true,
  },
  {
    id: "halong",
    niche: "restaurants",
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
    cardAspectRatio: "16/10",
    featured: true,
  },
  {
    id: "north-barber",
    demoUrl: "/demo/concepts/north-barber.html",
    niche: "beauty",
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
      { label: "Interaction", text: "A slot board shows the nearest free chair, so the headline \"Tuesday?\" answers itself." },
    ],
    ...shots("north-barber"),
    coverPosition: "50% 0%",
    accent: "#141414",
    accentInk: "#ecebe6",
    cardRotation: -0.7,
    cardDrop: -4,
    cardScale: 0.92,
    cardAspectRatio: "16/10",
    featured: false,
  },
  {
    id: "fiszka",
    demoUrl: "/demo/fiszka",
    niche: "dental",
    slug: "fiszka",
    title: "Fiszka",
    client: "Gabinet Stomatologiczny Fiszka",
    category: "Dental Clinic",
    city: "Warsaw",
    year: 2026,
    status: "Prototype",
    services: ["UX/UI", "Web Design", "Development", "Interactive Element"],
    description:
      "A dental practice in Mokotów whose name means an index card, and whose site is its patient card file: every section is a coloured divider with an index tab, and the first screen is a visit card. Tap the tooth that worries you and the booking form already knows where it hurts.",
    challenge: "Patients rarely know the name of their problem. They know which tooth.",
    approach:
      "An interactive dental chart turns a symptom into a pre-filled booking request, and the price list answers before the phone call.",
    details: [
      { label: "Interaction", text: "Tooth, symptom, booking: three taps from the first screen to a filled form." },
      { label: "Material", text: "Index cards with a red header rule and blue lines; the doctors are cards from the file, with initials instead of portraits." },
      { label: "Marking", text: "The chosen tooth is hatched in red pencil, the way dentists mark a tooth to treat on a chart." },
    ],
    ...shots("fiszka"),
    coverPosition: "0% 0%",
    accent: "#f1e3ae",
    accentInk: "#1b2333",
    cardRotation: 2,
    cardDrop: 3,
    cardScale: 1.08,
    cardAspectRatio: "16/10",
    featured: false,
  },
  {
    id: "ventotto",
    demoUrl: "/demo/concepts/ventotto.html",
    niche: "restaurants",
    slug: "ventotto",
    title: "Ventotto",
    client: "Ventotto",
    category: "Ristorante, Pizzeria, Caffè",
    city: "Warsaw",
    year: 2026,
    status: "Concept",
    services: ["Art Direction", "Identity", "Web Design"],
    description:
      "A studio concept for an Italian restaurant that has been on the same corner since 1987. Bottle green, Bodoni and a menu you can read like the printed card on the table.",
    challenge: "Italian restaurant sites reach for checked tablecloths and flags. Ventotto is quieter than that, and older.",
    approach: "Old-money restraint: one serif, three colours, the oven as the hero and the morning espresso bar as its own chapter.",
    details: [
      { label: "Typography", text: "Bodoni Moda for the name and the dishes, Libre Franklin for prices and hours." },
      { label: "Palette", text: "Bottle green, cream card stock and one deep wine red." },
      { label: "Interaction", text: "The menu follows the clock: espresso bar in the morning, lunch at noon, the full card in the evening." },
    ],
    ...shots("ventotto"),
    coverPosition: "50% 0%",
    accent: "#1d3428",
    accentInk: "#efe7d4",
    cardRotation: -1.5,
    cardDrop: 8,
    cardScale: 1,
    cardAspectRatio: "16/10",
    featured: true,
  },
  {
    id: "tilia",
    demoUrl: "/demo/tilia",
    niche: "dental",
    slug: "tilia",
    title: "Tilia",
    client: "Tilia Gabinet Stomatologiczny",
    category: "Dental Clinic",
    city: "Warsaw",
    year: 2026,
    status: "Prototype",
    services: ["Art Direction", "UX/UI", "Web Design", "Development", "Responsive Design"],
    description:
      "A small practice in Żoliborz that wants to feel calm rather than clinical. The site reads like a printed patient leaflet: a quiet serif, generous margins, and every step of a first visit explained before anyone has to call.",
    challenge: "Most dental sites in the city open with stock smiles and a booking button. A neighbourhood practice has to earn trust first.",
    approach:
      "We led with the conversation instead of the treatment: three plain steps, real opening hours, and a price list that stays readable on a phone.",
    details: [
      { label: "Typography", text: "A light editorial serif for headlines, set large and slightly italic for the one sentence that matters." },
      { label: "Palette", text: "Bone paper, a deep pine green for actions and nothing else." },
      { label: "Interaction", text: "A booking form that says plainly what happens after you press send." },
    ],
    ...shots("tilia"),
    coverPosition: "50% 0%",
    accent: "#2f4a3f",
    accentInk: "#f3efe6",
    cardRotation: 1.7,
    cardDrop: -3,
    cardScale: 0.97,
    cardAspectRatio: "16/10",
    featured: false,
  },
  {
    id: "rubryka",
    demoUrl: "/demo/rubryka",
    niche: "services",
    slug: "rubryka",
    title: "Rubryka",
    client: "Rubryka Biuro Rachunkowe",
    category: "Accounting Office",
    city: "Kraków",
    year: 2026,
    status: "Prototype",
    services: ["UX/UI", "Web Design", "Development", "Pricing Calculator"],
    description:
      "A demo accounting office in Kraków, named after the ruled column of a ledger. New clients should understand the price before the first meeting, so the site is built around a calculator that turns a number of documents into a monthly fee.",
    challenge: "Accounting firms hide their prices behind a contact form. Small businesses leave before they ask.",
    approach: "A clear service promise in the headline and a live subscription calculator directly under it.",
    details: [
      { label: "Interaction", text: "Slide the number of documents and employees, read the exact monthly price." },
      { label: "Typography", text: "A precise grotesk with tabular figures, so every price lines up." },
      { label: "Identity", text: "A ledger sheet with its rubrics as the mark, and one filled cell: every złoty already has its place." },
    ],
    ...shots("rubryka"),
    coverPosition: "50% 0%",
    accent: "#e9e9e4",
    accentInk: "#151515",
    cardRotation: 0.6,
    cardDrop: -2,
    cardScale: 0.94,
    cardAspectRatio: "16/10",
    featured: false,
  },
  {
    id: "atelier-17",
    demoUrl: "/demo/concepts/atelier-17.html",
    niche: "beauty",
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
      { label: "Typography", text: "Instrument Serif at display sizes, sturdy enough for Polish accents, Manrope for everything a client needs to read." },
      { label: "Imagery", text: "A 1953 archive photograph of a salon mirror sets the mood until the studio is shot." },
      { label: "Interaction", text: "Pick the services and watch the visit settle on a single line of the day, one client at a time." },
    ],
    ...shots("atelier-17"),
    coverPosition: "50% 0%",
    accent: "#dcd7cf",
    accentInk: "#151515",
    cardRotation: -1.9,
    cardDrop: 5,
    cardScale: 1.02,
    cardAspectRatio: "16/10",
    featured: false,
  },
  {
    id: "kotwica",
    demoUrl: "/demo/kotwica",
    niche: "dental",
    slug: "kotwica",
    title: "Kotwica",
    client: "Kotwica Klinika Implantologii",
    category: "Implant Clinic",
    city: "Lublin",
    year: 2026,
    status: "Prototype",
    services: ["Art Direction", "UX/UI", "Web Design", "Development", "Motion"],
    description:
      "A multi-page demo site for an implant clinic in Lublin. Kotwica means anchor, which is what an implant is. The signature is an implant that comes apart as you scroll: crown, abutment, gum and bone, each with its price.",
    challenge: "Implant treatment is expensive and hard to picture. Patients need to see what they are paying for.",
    approach: "A scroll-driven exploded implant, a full price list and a cost calculator, all on a dark clinical night-blue.",
    details: [
      { label: "Motion", text: "The implant explodes part by part on scroll; on phones it becomes a pinned drawing with one card." },
      { label: "Palette", text: "Night blue and titanium greys, with a scan-line cyan for actions." },
      { label: "Structure", text: "Eight pages, every price and treatment step stored as editable data." },
    ],
    ...shots("kotwica"),
    coverPosition: "30% 0%",
    accent: "#0d1b24",
    accentInk: "#e8edef",
    cardRotation: 1.4,
    cardDrop: 0,
    cardScale: 1,
    cardAspectRatio: "16/10",
    featured: true,
  },
  {
    id: "korzenna",
    demoUrl: "/demo/korzenna",
    niche: "restaurants",
    slug: "korzenna",
    title: "Korzenna",
    client: "Restauracja Korzenna",
    category: "Restaurant",
    city: "Toruń",
    year: 2026,
    status: "Prototype",
    services: ["Art Direction", "Web Design", "Development", "Booking"],
    description:
      "A Polish restaurant on Podmurna street by the medieval walls of Toruń, with gingerbread as a quiet signature. The name is poured in icing on the first screen, and reservations arrive as a printed ticket hanging from a brass rail.",
    challenge: "A restaurant with a strong local story and a menu that changes with the season.",
    approach: "A warm gingerbread-brown room, the autumn menu as browsable data, and a booking ticket that feels like paper.",
    details: [
      { label: "Interaction", text: "The booking form is a two-step ticket with a stamp at the end." },
      { label: "Menu", text: "The whole seasonal card with prices, filterable by ingredient." },
      { label: "Typography", text: "A brush-script name that fills with icing like a mould, over a sturdy, bookish serif." },
    ],
    ...shots("korzenna"),
    coverPosition: "50% 0%",
    accent: "#3a2418",
    accentInk: "#f1e3cf",
    cardRotation: -0.9,
    cardDrop: -5,
    cardScale: 1.06,
    cardAspectRatio: "16/10",
    featured: false,
  },
  {
    id: "przystan",
    demoUrl: "/demo/przystan",
    niche: "dental",
    slug: "przystan",
    title: "Przystań",
    client: "Przystań Stomatologia Rodzinna",
    category: "Family Dental Practice",
    city: "Białystok",
    year: 2026,
    status: "Prototype",
    services: ["UX/UI", "Web Design", "Development"],
    description:
      "A family practice in central Białystok where a mother and son treat patients side by side. The site answers the real questions straight away: who, how much and how to book.",
    challenge: "Sixty price positions, four people on the team and booking that happens by phone.",
    approach: "A deep sea-green first screen, real numbers instead of slogans, and the full price list in six chapters.",
    details: [
      { label: "Content", text: "Figures instead of adjectives: years in practice, the price of a first visit, anaesthesia included." },
      { label: "Palette", text: "Deep teal with a soft peach, calm enough for children and their grandparents." },
      { label: "Structure", text: "One long page with the price list, team, reviews and questions in their own chapters." },
    ],
    ...shots("przystan"),
    coverPosition: "0% 0%",
    accent: "#0f3a3e",
    accentInk: "#eaf3f1",
    cardRotation: -1.2,
    cardDrop: 2,
    cardScale: 0.98,
    cardAspectRatio: "16/10",
    featured: false,
  },
  {
    id: "szprycha",
    demoUrl: "/demo/concepts/szprycha.html",
    niche: "services",
    slug: "szprycha",
    title: "Szprycha",
    client: "Szprycha Warsztat Rowerowy",
    category: "Bike Workshop",
    city: "Kraków",
    year: 2026,
    status: "Concept",
    services: ["Art Direction", "Web Design", "Interactive Element"],
    description:
      "A studio concept for a bike workshop in Podgórze that fixes bikes in a day: drop it off in the morning, ride it home after five. Dark, loud and priced up front, the way bike brands sell bikes, not the way workshops hide repairs.",
    challenge: "Repair shops hide their prices and nobody knows when the bike will be ready.",
    approach: "Five fixed-price services, like a model line-up, and a bike you can click: tap the brakes or the wheel, and the cardboard repair tag fills in the price and the pick-up time.",
    details: [
      { label: "Interaction", text: "A clickable bike in outline. The repair tag counts the price, bike type and pick-up day from the time on your phone, and swings when it changes." },
      { label: "Typography", text: "Archivo, stretched wide for the poster headlines and the phone number, normal width for everything else." },
      { label: "Palette", text: "Workshop black, bone white and one signal lime, the colour of a hi-vis vest." },
    ],
    ...shots("szprycha"),
    coverPosition: "50% 0%",
    accent: "#d4f53c",
    accentInk: "#0f100d",
    cardRotation: 1.3,
    cardDrop: -2,
    cardScale: 0.96,
    cardAspectRatio: "16/10",
    featured: false,
  },
  {
    id: "ostrozka",
    demoUrl: "/demo/concepts/ostrozka.html",
    niche: "services",
    slug: "ostrozka",
    title: "Ostróżka",
    client: "Ostróżka Kwiaciarnia",
    category: "Florist",
    city: "Poznań",
    year: 2026,
    status: "Concept",
    services: ["Art Direction", "Web Design", "Interactive Element"],
    description:
      "A studio concept for a florist at the Rynek Wildecki market in Poznań, named after the larkspur. The page is built as the little card tucked into every bouquet, and the bouquets come wrapped in grey paper and twine.",
    challenge: "Florist sites sell the same stock roses. This stall sells what came from the market that morning.",
    approach: "The first screen is the gift card itself; below it, six slips with this week's bouquets and a builder that wraps your stems in paper as you add them.",
    details: [
      { label: "Interaction", text: "Add stems one by one and the bouquet grows in grey paper, with the price and your words on the card." },
      { label: "Imagery", text: "Nineteenth-century botanical plates of larkspur next to photographs of the market." },
      { label: "Palette", text: "Three stone greys and one sage green, so the flowers carry all the colour." },
    ],
    ...shots("ostrozka"),
    coverPosition: "50% 0%",
    accent: "#5c6b54",
    accentInk: "#faf8f4",
    cardRotation: -1.8,
    cardDrop: 4,
    cardScale: 1.02,
    cardAspectRatio: "16/10",
    featured: false,
  },
  {
    id: "kruszon",
    demoUrl: "/demo/concepts/kruszon.html",
    niche: "restaurants",
    slug: "kruszon",
    title: "Kruszon",
    client: "Kruszon Cukiernia Rodzinna",
    category: "Pastry Shop",
    city: "Łódź",
    year: 2026,
    status: "Concept",
    services: ["Art Direction", "Web Design", "Interactive Element", "Booking", "Motion"],
    description:
      "A studio concept for a family pastry shop in Łódź, named after the butter crumble it puts on everything. Five pages where cakes and doughnuts fly past as you scroll, a shop window with a basket, and a cake studio that draws your cake tier by tier.",
    challenge: "A small chain of three shops that has to feel like a grandmother's kitchen and still take orders like a shop.",
    approach: "A shop window with a basket for same-day pick-up, and a cake studio: tiers, sponge, cream, filling, sides, drip and decorations, drawn live with a cross-section of the inside and a price by weight.",
    details: [
      { label: "Interaction", text: "The cake studio draws up to three tiers with drips, fruit, candles and a plaque, shows the cross-section and saves the design in a link." },
      { label: "Imagery", text: "Pastries photographed on white and cut out of their backgrounds, so they float over the page like on a tray." },
      { label: "Motion", text: "Pastries fly across text-free bands as the page scrolls; headlines and numbers always stay clear." },
    ],
    ...shots("kruszon"),
    coverPosition: "50% 0%",
    accent: "#5b3a29",
    accentInk: "#d7263d",
    cardRotation: -1.1,
    cardDrop: 2,
    cardScale: 1.04,
    cardAspectRatio: "16/10",
    featured: true,
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const getNextProject = (slug: string) => {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
};

export const imageCredits = [
  {
    project: "ventotto",
    title: "Castel del Piano, cucina con forno a legna",
    author: "Wikimedia Commons",
    licence: "CC BY-SA 3.0",
    url: "https://commons.wikimedia.org/wiki/File:Castel_del_Piano-Cucina_con_forno_a_legna.jpg",
  },
  {
    project: "ventotto",
    title: "Cornetto e cappuccino",
    author: "Ensahequ",
    licence: "CC BY-SA 4.0",
    url: "https://commons.wikimedia.org/wiki/File:Cornetto_e_cappuccino.jpg",
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
  {
    project: "szprycha",
    title: "Bicycle wheel",
    author: "Dhodges",
    licence: "CC BY-SA 3.0",
    url: "https://commons.wikimedia.org/wiki/File:Bicycle_wheel.jpg",
  },
  {
    project: "ostrozka",
    title: "Delphinium elatum, Edwards's Botanical Register (1838)",
    author: "Sarah Ann Drake",
    licence: "public domain",
    url: "https://commons.wikimedia.org/wiki/File:Delphinium_elatum_var._palmatifidum_as_Delphinium_intermedium_var._palmatifidum_by_S._A._Drake._Edwards%27s_Botanical_Register_vol._24,_t._38_(1838).tif",
  },
];
