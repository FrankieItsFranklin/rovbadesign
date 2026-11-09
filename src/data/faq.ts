// Questions clients ask before they order a site, answered from facts the site already states elsewhere (packages,
// prices, the about page). Shown on the home page and the niche pages, and published as FAQPage structured data.
// Keep every answer true: no promised deadlines, rankings or numbers that are not ours.
import type { Niche } from "./projects";
import type { Lang } from "@/i18n/config";

export type Qa = { q: string; a: string };

export const generalFaq: Record<Lang, Qa[]> = {
  pl: [
    {
      q: "Ile trwa wykonanie strony?",
      a: "Projekt jako działającą wersję widzisz na swoim telefonie po kilku dniach. Gotowa strona powstaje zwykle w 1–3 tygodnie; dokładny termin zależy od zakresu i od tego, jak szybko mamy teksty i zdjęcia, dlatego ustalamy go przed startem.",
    },
    {
      q: "Czy strona i domena będą moje?",
      a: "Tak. Strona działa na Twojej domenie, a po zakończeniu prac przenosimy na Ciebie autorskie prawa majątkowe do strony. Jeśli kiedyś zechcesz pracować z kimś innym, zabierasz wszystko ze sobą.",
    },
    {
      q: "Czy strona ma gwarancję?",
      a: "Tak, każda strona ma rok gwarancji. Jeśli w tym czasie coś przestanie działać tak, jak zostało oddane, poprawiamy to bez dodatkowych opłat.",
    },
    {
      q: "Czy będę mógł sam zmieniać treści?",
      a: "Strona firmowa i strona z narzędziem mają edytor treści dla właściciela: menu, ceny, godziny i zdjęcia zmieniasz w przeglądarce, bez programisty. Przy przekazaniu strony pokazujemy, jak z niego korzystać.",
    },
    {
      q: "Na czym zbudowana jest strona?",
      a: "Budujemy szybkie strony na nowoczesnych frameworkach (Next.js, Astro), bez ciężkich wtyczek. Każdą stronę sprawdzamy na prawdziwych telefonach, bo stamtąd przychodzi większość gości.",
    },
    {
      q: "Czy strona będzie widoczna w Google?",
      a: "Każdą stronę budujemy pod wyszukiwarki: szybkie ładowanie, poprawne nagłówki i opisy, dane strukturalne. W pakiecie strona firmowa konfigurujemy też profil firmy w Google. Nikt uczciwy nie obieca pierwszego miejsca od pierwszego dnia: pozycja rośnie z czasem, z opiniami i z treściami, które odpowiadają na pytania klientów.",
    },
    {
      q: "Czy robicie strony w kilku językach?",
      a: "Tak. Już wizytówka ma wersję polską i angielską. Kolejne języki dodajemy w wycenie, z osobnymi adresami dla każdego języka, żeby Google pokazywał właściwą wersję.",
    },
    {
      q: "Czy możecie odświeżyć moją obecną stronę?",
      a: "Tak, modernizacja to jedna z naszych usług. Możesz też zacząć od bezpłatnego przeglądu: obejrzymy Twoją stronę na telefonie, tak jak Twoi klienci, i odpiszemy krótką listą konkretnych poprawek. Bez zobowiązań.",
    },
  ],
  en: [
    {
      q: "How long does it take?",
      a: "You see the design as a working version on your own phone within a few days. The finished site is usually ready in 1 to 3 weeks; the exact date depends on the scope and on how quickly we get texts and photos, so we agree on it before we start.",
    },
    {
      q: "Will the site and the domain be mine?",
      a: "Yes. The site runs on your domain, and when the work is done we transfer the economic copyright in the site to you. If you ever want to work with someone else, you take everything with you.",
    },
    {
      q: "Is there a guarantee?",
      a: "Yes, every site comes with a one-year guarantee. If something stops working the way it was handed over during that time, we fix it at no extra cost.",
    },
    {
      q: "Can I change the content myself?",
      a: "The business site and the site with a tool come with an editor for the owner: the menu, prices, hours and photos are changed in a browser, without a developer. We show you how to use it when we hand the site over.",
    },
    {
      q: "What is the site built on?",
      a: "We build fast sites on modern frameworks (Next.js, Astro), without heavy plugins. Every site is tested on real phones, because that is where most visitors come from.",
    },
    {
      q: "Will the site be visible on Google?",
      a: "Every site is built for search: fast loading, proper headings and descriptions, structured data. In the business site package we also set up your Google Business Profile. No honest studio promises first place on day one: ranking grows over time, with reviews and with content that answers clients' questions.",
    },
    {
      q: "Do you build sites in more than one language?",
      a: "Yes. Even the one-page site comes in Polish and English. More languages are quoted separately, each with its own addresses so Google shows the right version.",
    },
    {
      q: "Can you refresh my current site?",
      a: "Yes, modernisation is one of our services. You can also start with a free review: we look at your site on a phone, the way your clients do, and reply with a short list of concrete fixes. No strings attached.",
    },
  ],
};

// The services page: packages and prices, the questions people type into Google before they order ("ile kosztuje
// strona internetowa", "wizytówka czy strona firmowa"). The pricing page shows the first four.
export const offerFaq: Record<Lang, Qa[]> = {
  pl: [
    {
      q: "Ile kosztuje strona internetowa dla firmy?",
      a: "Wizytówka kosztuje od 1 500 zł netto, strona firmowa od 3 500 zł netto, a strona z interaktywnym narzędziem od 6 000 zł netto. Ostateczna cena zależy od liczby podstron i od tego, ile tekstów i zdjęć już masz. Przed rozpoczęciem pracy dostajesz wycenę na piśmie.",
    },
    {
      q: "Ile kosztuje utrzymanie strony?",
      a: "Domenę i hosting na pierwszy rok masz w cenie strony. Później domena kosztuje zwykle 80–150 zł rocznie, a hosting 300–400 zł rocznie. Zmiany treści robisz sam w edytorze, więc nie płacisz za nie abonamentu.",
    },
    {
      q: "Czym różni się wizytówka od strony firmowej?",
      a: "Wizytówka to jedna długa strona z najważniejszym: co oferujesz, menu lub cennik, godziny, adres, mapa i telefon. Strona firmowa ma do 8 podstron, własny dobór zdjęć, rezerwację albo formularz, edytor treści dla właściciela i skonfigurowany profil firmy w Google.",
    },
    {
      q: "Który pakiet wybrać dla restauracji, gabinetu albo salonu?",
      a: "Najczęściej stronę firmową: menu albo cennik, zespół i dojazd dostają osobne podstrony, a godziny i ceny zmieniasz sam. Wizytówka sprawdzi się przy nowym miejscu, a strona z narzędziem wtedy, gdy strona ma liczyć cenę, pokazywać wolne terminy albo przeszukiwać menu.",
    },
    {
      q: "Czy ceny zawierają VAT?",
      a: "Nie. Wszystkie ceny na stronie są cenami netto; do faktury doliczamy VAT według stawki 23%.",
    },
    {
      q: "Czy mogę zamówić jedną usługę zamiast pakietu?",
      a: "Tak. Modernizację, SEO techniczne albo kolejną wersję językową wyceniamy osobno, po krótkiej rozmowie albo po bezpłatnym przeglądzie Twojej obecnej strony.",
    },
    {
      q: "Czy mogę później rozbudować stronę?",
      a: "Tak. Wizytówkę można rozbudować o kolejne podstrony, edytor albo narzędzie, a do strony firmowej dodać nowe sekcje i języki. Każdą rozbudowę wyceniamy na piśmie, zanim zaczniemy.",
    },
    {
      q: "Co się dzieje po uruchomieniu strony?",
      a: "Strona działa na Twojej domenie, a autorskie prawa majątkowe przechodzą na Ciebie. Przez rok obowiązuje gwarancja. Od pakietu Strona firmowa treści zmieniasz sam w edytorze, a w pakiecie Strona z narzędziem przez trzy miesiące wprowadzamy też drobne zmiany na Twoją prośbę.",
    },
    {
      q: "Jak wygląda wycena?",
      a: "Wypełniasz formularz albo piszesz kilka zdań o swoim miejscu. Odpowiadamy w ciągu dwóch dni roboczych, a przed rozpoczęciem pracy dostajesz wycenę na piśmie z zakresem i ceną.",
    },
  ],
  en: [
    {
      q: "How much does a business website cost?",
      a: "A one-page site starts at PLN 1,500, a business site at PLN 3,500 and a site with an interactive tool at PLN 6,000, all plus VAT. The final price depends on the number of pages and on how much text and photography you already have. You get a written quote before any work starts.",
    },
    {
      q: "How much does it cost to keep the site running?",
      a: "The domain and hosting for the first year are included in the price of the site. After that, a domain usually costs PLN 80–150 a year and hosting PLN 300–400 a year. You change the content yourself in the editor, so there is no subscription for edits.",
    },
    {
      q: "What is the difference between a one-page site and a business site?",
      a: "A one-page site is one long page with the essentials: what you offer, the menu or price list, hours, address, map and phone. A business site has up to 8 pages, art-directed photos, booking or a form, a content editor for the owner and a Google Business Profile set up.",
    },
    {
      q: "Which package suits a restaurant, a clinic or a salon?",
      a: "Most often the business site: the menu or price list, the team and directions get pages of their own, and you change hours and prices yourself. The one-page site suits a new place, and the site with a tool fits when the site has to work out a price, show free slots or search the menu.",
    },
    {
      q: "Do the prices include VAT?",
      a: "No. All prices on the site are net; VAT at the 23% rate is added to the invoice.",
    },
    {
      q: "Can I order a single service instead of a package?",
      a: "Yes. A redesign, technical SEO or another language version is quoted separately, after a short call or a free review of your current site.",
    },
    {
      q: "Can I extend the site later?",
      a: "Yes. A one-page site can grow with more pages, an editor or a tool, and a business site can take new sections and languages. Every extension is quoted in writing before we start.",
    },
    {
      q: "What happens after the site goes live?",
      a: "The site runs on your domain and the economic copyright passes to you. A one-year guarantee applies. From the Business site package you change the content yourself in the editor, and with the Site with a tool package we also make small changes on request for three months.",
    },
    {
      q: "How does the quote work?",
      a: "You fill in the form or write a few lines about your place. We reply within two working days, and before any work starts you get a written quote with the scope and the price.",
    },
  ],
};

export const nicheFaq: Record<Niche, Record<Lang, Qa[]>> = {
  restaurants: {
    pl: [
      {
        q: "Czy menu może być na stronie zamiast w PDF?",
        a: "Tak, i to nasz domyślny wybór. Menu jako zwykła strona czyta się wygodnie na telefonie, a Google widzi dania i ceny. PDF trzeba powiększać palcami i wyszukiwarka go prawie nie rozumie.",
      },
      {
        q: "Czy podłączycie mój system rezerwacji?",
        a: "Tak. Rezerwacja może prowadzić do telefonu, do systemu, którego już używasz, albo do prostego formularza. Dopasowujemy ją do tego, jak naprawdę przyjmujesz gości.",
      },
      {
        q: "Czy sam zmienię ceny, dania i godziny?",
        a: "Tak. W stronie firmowej dostajesz edytor w przeglądarce: zmiana ceny albo godzin otwarcia zajmuje minutę i nie wymaga dzwonienia do nas.",
      },
    ],
    en: [
      {
        q: "Can the menu be a page instead of a PDF?",
        a: "Yes, and that is our default. A menu as a page reads well on a phone, and Google can see the dishes and prices. A PDF has to be pinched to read and search engines barely understand it.",
      },
      {
        q: "Will you connect my booking system?",
        a: "Yes. Booking can lead to your phone, to the system you already use or to a simple form. We fit it to how you actually take guests.",
      },
      {
        q: "Can I change prices, dishes and hours myself?",
        a: "Yes. The business site comes with an editor in the browser: changing a price or the opening hours takes a minute and needs no call to us.",
      },
    ],
  },
  dental: {
    pl: [
      {
        q: "Czy strona gabinetu może się reklamować?",
        a: "Przepisy zabraniają lekarzom i lekarzom dentystom reklamy, ale pozwalają informować o zakresie i warunkach usług. Dlatego piszemy rzeczowo: cennik, zespół, przebieg pierwszej wizyty i dojazd, bez obietnic efektów i bez uśmiechów ze stocku.",
      },
      {
        q: "Czy zapis może prowadzić do ZnanyLekarz albo Booksy?",
        a: "Tak. Przycisk zapisu prowadzi do kalendarza, którego już używasz, do telefonu albo do formularza. Pacjent zapisuje się w kilku dotknięciach.",
      },
      {
        q: "Czy na stronie musi być pełny cennik?",
        a: "Nie musi być pełny, ale powinien być uczciwy. Wystarczą najczęstsze zabiegi z cenami albo widełkami, pogrupowane tak, żeby pacjent znalazł swój w kilka sekund.",
      },
    ],
    en: [
      {
        q: "Can a dental clinic's site advertise?",
        a: "Polish law does not allow doctors and dentists to advertise, but it does allow them to inform about the scope and terms of their services. So we write plainly: prices, the team, the first visit and directions, with no promised results and no stock smiles.",
      },
      {
        q: "Can booking go to ZnanyLekarz or Booksy?",
        a: "Yes. The booking button leads to the calendar you already use, to your phone or to a form. Patients book in a few taps.",
      },
      {
        q: "Does the site need the full price list?",
        a: "It does not have to be complete, but it should be honest. The most common treatments with prices or ranges are enough, grouped so a patient finds theirs in seconds.",
      },
    ],
  },
  beauty: {
    pl: [
      {
        q: "Po co strona, skoro mam profil w Booksy?",
        a: "Booksy dobrze przyjmuje rezerwacje, ale wygląda tak samo u wszystkich. Własna strona pokazuje Twoje wnętrze i styl, pojawia się w Google pod nazwą salonu i nadal prowadzi do Twojego kalendarza w Booksy.",
      },
      {
        q: "Czy na stronie będzie widać najbliższy wolny termin?",
        a: "Tak, jeśli Twój kalendarz na to pozwala. Łączymy stronę z Booksy albo z Twoim kalendarzem, tak żeby klient widział termin bez szukania w widgecie.",
      },
      {
        q: "Czy pokażecie, kto pracuje w które dni?",
        a: "Tak. Barberzy i styliści z imienia, z tym, czym się zajmują, i z dniami pracy. Klienci często wybierają osobę, a nie tylko salon.",
      },
    ],
    en: [
      {
        q: "Why a website if I already have a Booksy profile?",
        a: "Booksy takes bookings well, but it looks the same for everyone. Your own site shows your interior and style, appears on Google under your shop's name and still leads to your Booksy calendar.",
      },
      {
        q: "Will the next free slot show on the site?",
        a: "Yes, if your calendar allows it. We connect the site to Booksy or to your own calendar, so clients see a slot without digging through a widget.",
      },
      {
        q: "Will you show who works on which days?",
        a: "Yes. Barbers and stylists by name, with what they do and the days they work. Clients often choose a person, not just a shop.",
      },
    ],
  },
  services: {
    pl: [
      {
        q: "Czy mogę pokazać cenę bez spotkania?",
        a: "Tak. Zamiast „zapytaj o wycenę” możemy pokazać proste widełki albo zbudować kalkulator, który liczy orientacyjną cenę z kilku odpowiedzi. Klient wie, czego się spodziewać, zanim napisze.",
      },
      {
        q: "Czy pomożecie z profilem firmy w Google?",
        a: "Tak. W pakiecie strona firmowa konfigurujemy profil firmy w Google, a strona i profil podają te same dane: nazwę, adres, godziny i telefon.",
      },
      {
        q: "Co się dzieje po wysłaniu formularza?",
        a: "Formularz na stronie mówi to wprost: kto odpowie i kiedy. Klient nie zostaje z pytaniem, czy wiadomość w ogóle dotarła.",
      },
    ],
    en: [
      {
        q: "Can I show a price before the first meeting?",
        a: "Yes. Instead of 'ask for a quote' we can show plain ranges or build a calculator that works out an estimate from a few answers. Clients know what to expect before they write.",
      },
      {
        q: "Will you help with the Google Business Profile?",
        a: "Yes. In the business site package we set up your Google Business Profile, and the site and the profile give the same details: name, address, hours and phone.",
      },
      {
        q: "What happens after someone sends the form?",
        a: "The form says it plainly: who will reply and when. Clients are not left wondering whether the message arrived at all.",
      },
    ],
  },
};
