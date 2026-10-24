// Landing pages per trade: what a site for that business needs, with the work that shows it.
import type { Niche } from "./projects";
import type { Lang } from "@/i18n/config";

type Copy = {
  slug: string;
  label: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  lead: string;
  needs: { title: string; text: string }[];
  approach: string;
};

export const NICHES: Niche[] = ["restaurants", "dental", "beauty", "services"];

export const niches: Record<Niche, Record<Lang, Copy>> = {
  restaurants: {
    en: {
      slug: "restaurants",
      label: "Restaurants",
      title: "Websites for restaurants and cafés",
      metaTitle: "Websites for restaurants in Warsaw",
      metaDescription: "Restaurant websites from a Warsaw studio: the menu as a real page, opening hours on the first screen, reservations and an editor the owner can use.",
      lead: "Guests open a restaurant site for three things: the menu, the hours and a way to book. Everything else has to earn its place around them.",
      needs: [
        { title: "The menu as a page, not a PDF", text: "Dishes with prices and a line on what is in them, readable on a phone and indexed by Google." },
        { title: "Hours and address up front", text: "Open now or not, and how to get there, without scrolling." },
        { title: "Booking that fits how you work", text: "A phone link, your existing reservation system or a simple request form." },
        { title: "Photos of your room", text: "Your own interior and dishes, large, never cut into thumbnails." },
        { title: "Edits without calling us", text: "Prices, dishes and hours changed by the owner in a browser editor." },
      ],
      approach: "We start from the room: its light, its materials, what is on the walls. The site should feel like the place before anyone walks in.",
    },
    pl: {
      slug: "restauracji",
      label: "Restauracje",
      title: "Strony internetowe dla restauracji i kawiarni",
      metaTitle: "Strony dla restauracji w Warszawie",
      metaDescription: "Strony restauracji od warszawskiego studia: menu jako prawdziwa strona, godziny na pierwszym ekranie, rezerwacje i edytor dla właściciela.",
      lead: "Gość otwiera stronę restauracji po trzy rzeczy: menu, godziny i sposób na rezerwację. Wszystko inne musi zasłużyć na miejsce obok nich.",
      needs: [
        { title: "Menu jako strona, nie PDF", text: "Dania z cenami i jedną linijką o składnikach, czytelne na telefonie i widoczne w Google." },
        { title: "Godziny i adres od razu", text: "Czy teraz otwarte i jak dojechać, bez przewijania." },
        { title: "Rezerwacja po Twojemu", text: "Telefon, Twój obecny system rezerwacji albo prosty formularz." },
        { title: "Zdjęcia Twojej sali", text: "Własne wnętrze i dania, duże, nigdy pocięte na miniatury." },
        { title: "Zmiany bez dzwonienia do nas", text: "Ceny, dania i godziny właściciel zmienia sam w edytorze w przeglądarce." },
      ],
      approach: "Zaczynamy od sali: jej światła, materiałów, tego, co wisi na ścianach. Strona ma przypominać miejsce, zanim ktoś do niego wejdzie.",
    },
  },
  dental: {
    en: {
      slug: "dental-clinics",
      label: "Dental clinics",
      title: "Websites for dental clinics",
      metaTitle: "Websites for dental clinics in Warsaw",
      metaDescription: "Dental clinic websites from a Warsaw studio: prices patients can read, the team by name, a calm first visit explained and booking in a few taps.",
      lead: "Patients come anxious and with one question: who will treat me, how much will it cost and how do I book. A good clinic site answers before they have to call.",
      needs: [
        { title: "Prices that can be read", text: "The full price list or honest ranges, grouped by treatment, searchable on a phone." },
        { title: "The team by name", text: "Who treats what, with real portraits once you have them." },
        { title: "The first visit explained", text: "What happens step by step, for people who are afraid of the chair." },
        { title: "Booking in a few taps", text: "Phone, your online calendar (ZnanyLekarz, Booksy) or a request form." },
        { title: "Trust without stock smiles", text: "Your rooms, your equipment, your reviews with their source, nothing invented." },
      ],
      approach: "We have built five very different dental sites, from a calm editorial leaflet to an interactive smile. Each one starts from what that practice is like inside.",
    },
    pl: {
      slug: "gabinetow-stomatologicznych",
      label: "Stomatologia",
      title: "Strony internetowe dla gabinetów stomatologicznych",
      metaTitle: "Strony dla dentystów w Warszawie",
      metaDescription: "Strony gabinetów stomatologicznych od warszawskiego studia: czytelny cennik, zespół z nazwiska, spokojnie opisana pierwsza wizyta i zapis w kilku dotknięciach.",
      lead: "Pacjent przychodzi zestresowany i z jednym pytaniem: kto mnie wyleczy, ile to kosztuje i jak się zapisać. Dobra strona gabinetu odpowiada, zanim trzeba zadzwonić.",
      needs: [
        { title: "Cennik, który da się przeczytać", text: "Pełny cennik albo uczciwe widełki, w grupach, z wyszukiwarką na telefonie." },
        { title: "Zespół z nazwiska", text: "Kto czym się zajmuje, z prawdziwymi portretami, gdy już będą." },
        { title: "Pierwsza wizyta krok po kroku", text: "Co się wydarzy, dla osób, które boją się fotela." },
        { title: "Zapis w kilku dotknięciach", text: "Telefon, Twój kalendarz online (ZnanyLekarz, Booksy) albo formularz." },
        { title: "Zaufanie bez uśmiechów ze stocku", text: "Twoje gabinety, sprzęt i opinie ze źródłem, nic wymyślonego." },
      ],
      approach: "Zrobiliśmy już pięć bardzo różnych stron gabinetów: od spokojnej ulotki po interaktywny uśmiech. Każda zaczyna się od tego, jak ten gabinet wygląda w środku.",
    },
  },
  beauty: {
    en: {
      slug: "barbers-and-salons",
      label: "Barbers & salons",
      title: "Websites for barbers and hair salons",
      metaTitle: "Websites for barbers and salons in Warsaw",
      metaDescription: "Websites for barbershops and hair salons: the price list as a sign, the next free slot on the page and a look that is yours, not the booking widget's.",
      lead: "Clients choose a barber or a salon by look and by the next free slot. The site has to show both in seconds.",
      needs: [
        { title: "A price list you can read across the street", text: "Every service with its price and time, no 'from' tricks." },
        { title: "The next free slot", text: "Linked to Booksy or your own calendar, shown on the page, not hidden in a widget." },
        { title: "The people behind the chair", text: "Who cuts, who colours, on which days." },
        { title: "A look of your own", text: "Your interior and type, not the default template of a booking app." },
        { title: "Where and when", text: "Address, hours and walk-in rules on the first screen." },
      ],
      approach: "We treat the shop front as the brand: its sign, its chairs, its street. The page is set like the place, so regulars recognise it.",
    },
    pl: {
      slug: "barberow-i-salonow",
      label: "Barberzy i salony",
      title: "Strony internetowe dla barberów i salonów fryzjerskich",
      metaTitle: "Strony dla barberów i salonów w Warszawie",
      metaDescription: "Strony barbershopów i salonów fryzjerskich: cennik jak szyld, najbliższy wolny termin na stronie i wygląd Twój, a nie widgetu rezerwacji.",
      lead: "Klienci wybierają barbera albo salon po wyglądzie i po najbliższym wolnym terminie. Strona musi pokazać jedno i drugie w kilka sekund.",
      needs: [
        { title: "Cennik czytelny z drugiej strony ulicy", text: "Każda usługa z ceną i czasem, bez sztuczek z „od”." },
        { title: "Najbliższy wolny termin", text: "Połączony z Booksy albo Twoim kalendarzem, widoczny na stronie, a nie schowany w widgecie." },
        { title: "Ludzie przy fotelu", text: "Kto strzyże, kto koloryzuje, w które dni." },
        { title: "Własny wygląd", text: "Twoje wnętrze i litery, a nie domyślny szablon aplikacji do rezerwacji." },
        { title: "Gdzie i kiedy", text: "Adres, godziny i zasady wejścia bez zapisu na pierwszym ekranie." },
      ],
      approach: "Traktujemy witrynę lokalu jak markę: szyld, fotele, ulicę. Strona jest złożona jak to miejsce, żeby stali klienci od razu je rozpoznali.",
    },
  },
  services: {
    en: {
      slug: "local-services",
      label: "Local services",
      title: "Websites for local service firms",
      metaTitle: "Websites for local businesses in Warsaw",
      metaDescription: "Websites for accounting offices and other local service firms: a clear promise, the price before the first meeting and an easy first contact.",
      lead: "Small firms lose clients who leave before they ask. A clear promise, the price and one simple next step keep them.",
      needs: [
        { title: "One clear promise", text: "What you do and for whom, in the first sentence." },
        { title: "The price before the meeting", text: "A calculator or plain ranges instead of 'contact us for a quote'." },
        { title: "How working together looks", text: "The month, the documents, the deadlines, in plain words." },
        { title: "An easy first contact", text: "Phone, e-mail and a short form that says what happens next." },
        { title: "Found on Google", text: "Local search, Google Business Profile and pages that answer real questions." },
      ],
      approach: "We take the paperwork of your trade, a ledger, a form, a timetable, and turn it into the page's structure, so the site reads like your service.",
    },
    pl: {
      slug: "firm-uslugowych",
      label: "Usługi lokalne",
      title: "Strony internetowe dla lokalnych firm usługowych",
      metaTitle: "Strony dla lokalnych firm w Warszawie",
      metaDescription: "Strony biur rachunkowych i innych lokalnych firm usługowych: jasna obietnica, cena przed pierwszym spotkaniem i łatwy pierwszy kontakt.",
      lead: "Małe firmy tracą klientów, którzy odchodzą, zanim zapytają. Jasna obietnica, cena i jeden prosty następny krok ich zatrzymują.",
      needs: [
        { title: "Jedna jasna obietnica", text: "Co robisz i dla kogo, w pierwszym zdaniu." },
        { title: "Cena przed spotkaniem", text: "Kalkulator albo proste widełki zamiast „zapytaj o wycenę”." },
        { title: "Jak wygląda współpraca", text: "Miesiąc, dokumenty, terminy, prostymi słowami." },
        { title: "Łatwy pierwszy kontakt", text: "Telefon, e-mail i krótki formularz, który mówi, co będzie dalej." },
        { title: "Widoczność w Google", text: "Wyszukiwanie lokalne, profil firmy w Google i strony, które odpowiadają na prawdziwe pytania." },
      ],
      approach: "Bierzemy papiery Twojej branży: księgę, formularz, harmonogram, i robimy z nich strukturę strony, żeby czytała się jak Twoja usługa.",
    },
  },
};

export const nicheBySlug = (lang: Lang, slug: string) => NICHES.find((n) => niches[n][lang].slug === slug);
