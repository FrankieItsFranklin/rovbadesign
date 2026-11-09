// The five services of the first screen, each with its own page (DESIGN.md, SEO stage 2).
// The order matches dictionaries.space.services, so the hero's item i links to SERVICES[i].
// Keep every line true, as in data/faq.ts: only facts the studio already states (packages, prices, process),
// no promised deadlines, rankings or numbers that are not ours.
import type { Qa } from "./faq";
import type { Lang } from "@/i18n/config";

type ServicePage = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  /** The lead under the title: what the service is, in two or three sentences. */
  intro: string;
  /** What you get. */
  includes: string[];
  /** When it is worth ordering. */
  when: string[];
  /** How it goes: step name, what happens. */
  steps: [string, string][];
  /** The price line; the packages themselves are on the services page. */
  price: string;
  faq: Qa[];
};

export const SERVICES: Record<Lang, ServicePage>[] = [
  {
    pl: {
      slug: "projektowanie-stron",
      title: "Projektowanie stron internetowych",
      metaTitle: "Projektowanie stron internetowych i UX/UI, Warszawa | ROVBA",
      metaDescription: "Projekt strony z własnym kierunkiem wizualnym i układem, w którym klient szybko znajdzie menu, cennik albo termin. Prototyp na telefonie po kilku dniach.",
      intro: "Projektujemy jednocześnie wygląd strony i jej układ (UI i UX): kolory, krój pisma i zdjęcia wynikają z Twojego miejsca, a każda podstrona prowadzi gościa do celu, czyli rezerwacji, telefonu albo menu. Projekt pokazujemy od razu jako działającą stronę na Twoim telefonie.",
      includes: [
        "Kierunek wizualny: paleta, krój pisma, styl zdjęć i pierwszy ekran",
        "Mapa strony: jakie podstrony i sekcje są potrzebne i w jakiej kolejności",
        "Układ zaczynający się od telefonu, z rezerwacją albo telefonem w zasięgu kciuka",
        "Menu, cennik i godziny jako tekst na stronie, a nie PDF czy zdjęcie",
        "Dostępność: kontrast, czytelny rozmiar tekstu i przyciski wygodne do dotknięcia",
        "Działający prototyp z Twoimi treściami zamiast statycznych makiet",
        "Dobór i kadrowanie zdjęć (od pakietu Strona firmowa)",
      ],
      when: [
        "Otwierasz nowe miejsce i potrzebujesz pierwszej strony.",
        "Obecna strona wygląda jak szablon i nie pokazuje, czym się wyróżniasz.",
        "Klienci dzwonią z pytaniami, na które odpowiedź jest na stronie, tylko nikt jej nie znajduje.",
        "Menu albo cennik jest w PDF albo na zdjęciu.",
      ],
      steps: [
        ["Rozmowa", "Czym jest miejsce, kto do niego przychodzi i co gość ma zrobić na stronie."],
        ["Kierunek i układ", "Pierwszy ekran z prawdziwymi kolorami i krojem pisma oraz kolejność podstron i sekcji."],
        ["Prototyp", "Klikalna strona z Twoimi treściami na Twoim telefonie: drogę do rezerwacji sprawdzasz sam."],
        ["Gotowa strona", "Poprawiamy to, co okazało się niewygodne, a prototyp staje się gotową stroną na Twojej domenie."],
      ],
      price: "Projekt wyglądu i układu jest częścią każdego pakietu: wizytówka od 1 500 zł netto, strona firmowa od 3 500 zł netto.",
      faq: [
        {
          q: "Czym różni się UX od UI?",
          a: "UX to układ i droga do celu: co jest gdzie i ile kroków dzieli gościa od rezerwacji. UI to wygląd tych elementów: kolory, typografia, przyciski. Projektujemy jedno i drugie razem, bo jedno bez drugiego nie działa.",
        },
        {
          q: "Co, jeśli kierunek wizualny mi się nie spodoba?",
          a: "Mówisz, co zmienić, a my poprawiamy go, zanim powstaną kolejne podstrony. Kierunek oceniasz na działającej stronie, a nie na obrazku, więc od początku wiesz, co dostaniesz.",
        },
        {
          q: "Czy projekt uwzględni moje logo i kolory?",
          a: "Tak. Jeśli masz identyfikację wizualną, kierunek z niej wychodzi. Jeśli jej nie masz, proponujemy paletę i krój pisma dopasowane do miejsca i do tego, kto do Ciebie przychodzi.",
        },
        {
          q: "Czy strona będzie dobrze wyglądać na telefonie?",
          a: "Tak. Projektujemy najpierw wersję na telefon, bo stamtąd przychodzi większość gości, i sprawdzamy ją na prawdziwych urządzeniach, a nie tylko w oknie przeglądarki na komputerze.",
        },
      ],
    },
    en: {
      slug: "web-design",
      title: "Website design",
      metaTitle: "Website design and UX/UI, Warsaw | ROVBA",
      metaDescription: "Website design with a visual direction of its own and a layout in which clients quickly find the menu, prices or a free slot. A prototype on your phone within days.",
      intro: "We design the look of a site and its layout together (UI and UX): the colours, type and photographs come from your place, and every page leads the guest to the goal, a booking, a call or the menu. We show the design straight away as a working site on your phone.",
      includes: [
        "Visual direction: palette, typeface, photo style and the first screen",
        "A site map: which pages and sections are needed and in what order",
        "A phone-first layout with booking or a call within thumb's reach",
        "The menu, price list and hours as text on the page, not a PDF or a photo",
        "Accessibility: contrast, legible text sizes and buttons easy to tap",
        "A working prototype with your content instead of static mock-ups",
        "Photo selection and cropping (from the Business site package)",
      ],
      when: [
        "You are opening a new place and need a first website.",
        "Your current site looks like a template and does not show what sets you apart.",
        "Clients call with questions the site already answers, but nobody finds the answer.",
        "The menu or price list is a PDF or a photo.",
      ],
      steps: [
        ["Conversation", "What the place is, who comes in and what a guest should do on the site."],
        ["Direction and layout", "The first screen with real colours and type, and the order of pages and sections."],
        ["Prototype", "A clickable site with your content on your phone: you try the way to a booking yourself."],
        ["Finished site", "We fix whatever turned out awkward, and the prototype becomes the finished site on your domain."],
      ],
      price: "Design of the look and layout is part of every package: a one-page site from PLN 1,500 + VAT, a business site from PLN 3,500 + VAT.",
      faq: [
        {
          q: "What is the difference between UX and UI?",
          a: "UX is the layout and the way to the goal: what is where and how many steps lead to a booking. UI is how those elements look: colours, type, buttons. We design both together, because one does not work without the other.",
        },
        {
          q: "What if I don't like the visual direction?",
          a: "You tell us what to change and we adjust it before the other pages are built. You judge the direction on a working site, not a picture, so you know from the start what you will get.",
        },
        {
          q: "Will the design use my logo and colours?",
          a: "Yes. If you have a visual identity, the direction grows out of it. If you don't, we propose a palette and typeface that fit the place and the people who come to it.",
        },
        {
          q: "Will the site look good on a phone?",
          a: "Yes. We design the phone version first, because that is where most visitors come from, and test it on real devices rather than only in a desktop browser window.",
        },
      ],
    },
  },
  {
    pl: {
      slug: "tworzenie-stron",
      title: "Tworzenie stron internetowych",
      metaTitle: "Tworzenie stron internetowych, Warszawa | ROVBA",
      metaDescription: "Szybkie strony internetowe na Next.js, sprawdzane na prawdziwych telefonach. Kod, treści i domena należą do Ciebie. Od 1 500 zł netto.",
      intro: "Budujemy szybkie strony na Next.js albo Astro i uruchamiamy je na Twojej domenie. Każdą sprawdzamy na prawdziwych telefonach, a po uruchomieniu kod, treści i domena należą do Ciebie.",
      includes: [
        "Strona zbudowana na Next.js albo Astro, bez ciężkich wtyczek",
        "Wersja na telefon, tablet i komputer, sprawdzona na prawdziwych urządzeniach",
        "Formularz kontaktowy albo przycisk rezerwacji podłączony do Twojego systemu",
        "Edytor treści w przeglądarce dla właściciela (od pakietu Strona firmowa)",
        "Podstawy SEO technicznego: nagłówki, opisy, mapa strony, dane strukturalne",
        "Uruchomienie na Twojej domenie, z domeną i hostingiem na pierwszy rok w cenie",
      ],
      when: [
        "Strona ma działać szybko na telefonie, także przy słabym zasięgu.",
        "Chcesz sam zmieniać menu, ceny i godziny, bez dzwonienia do programisty.",
        "Chcesz, żeby kod i domena były Twoje, a nie zamknięte w abonamencie kreatora stron.",
      ],
      steps: [
        ["Prototyp", "Strona powstaje od razu w kodzie, więc prototyp jest już jej pierwszą wersją."],
        ["Treści", "Wstawiamy teksty, zdjęcia, menu albo cennik i podłączamy rezerwacje lub formularz."],
        ["Testy", "Sprawdzamy stronę na prawdziwych telefonach i komputerach: szybkość, czytelność, formularze."],
        ["Uruchomienie", "Strona startuje na Twojej domenie, a my pokazujemy, jak korzystać z edytora."],
      ],
      price: "W każdym pakiecie: wizytówka od 1 500 zł netto, strona firmowa od 3 500 zł netto, strona z narzędziem od 6 000 zł netto.",
      faq: [
        {
          q: "Dlaczego Next.js albo Astro, a nie WordPress?",
          a: "Takie strony szybko się ładują, nie wymagają ciągłego aktualizowania wtyczek i mają mniej miejsc, przez które można je zaatakować. Treści i tak zmieniasz w prostym edytorze w przeglądarce.",
        },
        {
          q: "Czy mogę później przenieść stronę do innej firmy?",
          a: "Tak. Przenosimy na Ciebie autorskie prawa majątkowe do strony, a domena jest Twoja, więc możesz przekazać wszystko innemu wykonawcy bez naszej zgody i bez dodatkowych opłat.",
        },
        {
          q: "Czy podłączycie mój system rezerwacji?",
          a: "Tak. Przycisk rezerwacji może prowadzić do systemu, którego już używasz, na przykład Booksy albo ZnanyLekarz, do telefonu albo do formularza na stronie.",
        },
      ],
    },
    en: {
      slug: "web-development",
      title: "Website development",
      metaTitle: "Website development, Warsaw | ROVBA",
      metaDescription: "Fast websites built on Next.js and tested on real phones. The code, content and domain are yours. From PLN 1,500 + VAT.",
      intro: "We build fast sites on Next.js or Astro and launch them on your domain. Every one is tested on real phones, and after launch the code, content and domain belong to you.",
      includes: [
        "A site built on Next.js or Astro, without heavy plugins",
        "Phone, tablet and desktop versions, tested on real devices",
        "A contact form or a booking button connected to your system",
        "A browser-based content editor for the owner (from the Business site package)",
        "Technical SEO basics: headings, descriptions, sitemap, structured data",
        "Launch on your domain, with the domain and hosting for the first year included",
      ],
      when: [
        "The site has to be fast on a phone, even on a weak signal.",
        "You want to change the menu, prices and hours yourself, without calling a developer.",
        "You want the code and domain to be yours, not locked into a site-builder subscription.",
      ],
      steps: [
        ["Prototype", "The site is built in code from the start, so the prototype is already its first version."],
        ["Content", "We add the texts, photos, menu or price list and connect booking or a form."],
        ["Testing", "We check the site on real phones and computers: speed, legibility, forms."],
        ["Launch", "The site goes live on your domain and we show you how to use the editor."],
      ],
      price: "In every package: a one-page site from PLN 1,500 + VAT, a business site from PLN 3,500 + VAT, a site with a tool from PLN 6,000 + VAT.",
      faq: [
        {
          q: "Why Next.js or Astro and not WordPress?",
          a: "Sites built this way load fast, don't need constant plugin updates and leave fewer ways in for attackers. You still change the content in a simple editor in your browser.",
        },
        {
          q: "Can I move the site to another company later?",
          a: "Yes. We transfer the economic copyright in the site to you and the domain is yours, so you can hand everything to another developer without our permission and without extra fees.",
        },
        {
          q: "Will you connect my booking system?",
          a: "Yes. The booking button can lead to the system you already use, such as Booksy or ZnanyLekarz, to your phone or to a form on the site.",
        },
      ],
    },
  },
  {
    pl: {
      slug: "modernizacja-stron",
      title: "Modernizacja stron internetowych",
      metaTitle: "Modernizacja i odświeżenie strony internetowej | ROVBA",
      metaDescription: "Odświeżenie starej strony: nowy wygląd, szybkość na telefonie i porządek w treściach. Zacznij od bezpłatnego przeglądu obecnej strony.",
      intro: "Odświeżamy strony, które wyglądają staro, wolno się ładują albo źle wyświetlają się na telefonie. Zaczynamy od bezpłatnego przeglądu i dbamy o to, żeby nie stracić tego, co strona już wypracowała: adresów, treści i obecności w Google.",
      includes: [
        "Bezpłatny przegląd obecnej strony na telefonie, z listą konkretnych poprawek",
        "Nowy wygląd we własnym kierunku wizualnym",
        "Przeniesienie i uporządkowanie treści: teksty, zdjęcia, menu, cennik",
        "Przekierowania starych adresów na nowe, żeby nie zgubić linków i wyników w Google",
        "Szybsze ładowanie i poprawne wyświetlanie na telefonie",
        "Edytor treści, jeśli dotąd każda zmiana wymagała programisty (od pakietu Strona firmowa)",
      ],
      when: [
        "Strona ma kilka lat i źle wygląda na telefonie.",
        "Ładuje się długo albo pokazuje błędy.",
        "Nie możesz sam zmienić godzin, cen ani menu.",
        "Firma się zmieniła, a strona nadal opowiada starą historię.",
      ],
      steps: [
        ["Przegląd", "Oglądamy stronę na telefonie i w ciągu dwóch dni roboczych odpisujemy listą poprawek."],
        ["Plan", "Ustalamy, co zostaje, co zmieniamy i co przenosimy. Wycenę dostajesz na piśmie."],
        ["Prototyp", "Nowa wersja działa obok starej, więc porównujesz je na swoim telefonie."],
        ["Przeniesienie", "Nowa strona zastępuje starą pod tym samym adresem, z przekierowaniami."],
      ],
      price: "Cena zależy od zakresu i liczby podstron; pakiety od 1 500 zł netto. Zaczynamy od bezpłatnego przeglądu.",
      faq: [
        {
          q: "Czy po zmianie strony stracę pozycje w Google?",
          a: "Największe ryzyko pojawia się, gdy znikają stare adresy. Dlatego każdą starą podstronę przekierowujemy na jej nowy odpowiednik i zachowujemy treści, które przynoszą ruch. Nikt uczciwy nie zagwarantuje pozycji, ale można nie zepsuć tego, co już działa.",
        },
        {
          q: "Czy możecie poprawić tylko część strony?",
          a: "Tak. Czasem wystarczy nowy pierwszy ekran, menu jako tekst albo lżejsze zdjęcia. Bezpłatny przegląd pokazuje, co da najwięcej przy najmniejszym zakresie.",
        },
        {
          q: "Moja strona jest na WordPressie albo w kreatorze. Czy to problem?",
          a: "Nie. Treści przenosimy z platformy, na której jest dziś strona, a nowa wersja działa na Twojej domenie i należy do Ciebie.",
        },
      ],
    },
    en: {
      slug: "website-redesign",
      title: "Website redesign",
      metaTitle: "Website redesign and refresh | ROVBA",
      metaDescription: "Refreshing an old site: a new look, speed on the phone and order in the content. Start with a free review of your current site.",
      intro: "We refresh sites that look dated, load slowly or display badly on a phone. We start with a free review and make sure nothing the site has already earned gets lost: its addresses, its content and its presence on Google.",
      includes: [
        "A free review of your current site on a phone, with a list of concrete fixes",
        "A new look in a visual direction of its own",
        "Content moved over and put in order: texts, photos, menu, price list",
        "Redirects from the old addresses to the new ones, so links and Google results are kept",
        "Faster loading and correct display on the phone",
        "A content editor, if every change used to need a developer (from the Business site package)",
      ],
      when: [
        "The site is a few years old and looks wrong on a phone.",
        "It loads slowly or shows errors.",
        "You cannot change the hours, prices or menu yourself.",
        "The business has changed, but the site still tells the old story.",
      ],
      steps: [
        ["Review", "We look at the site on a phone and reply with a list of fixes within two working days."],
        ["Plan", "We agree on what stays, what changes and what moves. You get a written quote."],
        ["Prototype", "The new version runs alongside the old one, so you compare them on your phone."],
        ["Switch-over", "The new site replaces the old one at the same address, with redirects."],
      ],
      price: "The price depends on the scope and the number of pages; packages from PLN 1,500 + VAT. We start with a free review.",
      faq: [
        {
          q: "Will I lose my Google rankings after the redesign?",
          a: "The biggest risk comes when old addresses disappear. So we redirect every old page to its new counterpart and keep the content that brings visitors. No honest studio can guarantee rankings, but you can avoid breaking what already works.",
        },
        {
          q: "Can you fix only part of the site?",
          a: "Yes. Sometimes a new first screen, a menu as text or lighter photos is enough. The free review shows what gives the most for the smallest scope.",
        },
        {
          q: "My site runs on WordPress or a site builder. Is that a problem?",
          a: "No. We move the content from whatever platform the site is on today, and the new version runs on your domain and belongs to you.",
        },
      ],
    },
  },
  {
    pl: {
      slug: "seo-techniczne",
      title: "SEO techniczne stron",
      metaTitle: "SEO techniczne strony internetowej, Warszawa | ROVBA",
      metaDescription: "Szybkość, poprawne nagłówki, dane strukturalne i profil firmy w Google: techniczne podstawy, dzięki którym strona może być widoczna w wyszukiwarce.",
      intro: "SEO techniczne to fundament, bez którego Google źle rozumie stronę: szybkość, poprawne nagłówki i opisy, mapa strony i dane strukturalne. Robimy je w każdym projekcie, a w pakiecie Strona firmowa konfigurujemy też profil firmy w Google.",
      includes: [
        "Szybkie ładowanie na telefonie: lekkie zdjęcia i kod bez zbędnych skryptów",
        "Jeden nagłówek H1 i logiczna struktura nagłówków na każdej podstronie",
        "Tytuły i opisy stron pisane pod to, czego szukają Twoi klienci",
        "Mapa strony (sitemap.xml), plik robots.txt i poprawne adresy kanoniczne",
        "Dane strukturalne schema.org: firma, usługi, ceny, pytania i okruszki",
        "Oznaczenia języka (hreflang) dla stron wielojęzycznych",
        "Profil firmy w Google spójny ze stroną (od pakietu Strona firmowa)",
      ],
      when: [
        "Strona nie pojawia się w Google pod nazwą Twojej firmy albo usługi.",
        "W wynikach wyszukiwania widać zły tytuł albo przypadkowy opis.",
        "Strona ładuje się wolno na telefonie.",
        "Masz kilka wersji językowych, a Google pokazuje nie tę.",
      ],
      steps: [
        ["Audyt", "Sprawdzamy szybkość, indeksowanie, nagłówki, opisy i dane strukturalne."],
        ["Poprawki", "Naprawiamy to, co blokuje albo myli wyszukiwarkę."],
        ["Google", "Zgłaszamy mapę strony do Google i porządkujemy profil firmy."],
        ["Pomiar", "Po uruchomieniu widać, po jakich frazach strona się pojawia i co warto dopisać."],
      ],
      price: "Podstawy SEO technicznego są w każdym pakiecie od 1 500 zł netto. Profil firmy w Google: od pakietu Strona firmowa, od 3 500 zł netto.",
      faq: [
        {
          q: "Czym różni się SEO techniczne od pozycjonowania?",
          a: "SEO techniczne sprawia, że Google może szybko odczytać i zrozumieć stronę. Pozycjonowanie to dłuższa praca nad treściami, opiniami i linkami. Bez technicznych podstaw ta dalsza praca przynosi znacznie mniej.",
        },
        {
          q: "Czy zagwarantujecie pierwsze miejsce w Google?",
          a: "Nie. Nikt uczciwy tego nie zagwarantuje, bo wyniki zależą od konkurencji, opinii i czasu. Dbamy o to, żeby strona była technicznie gotowa i odpowiadała na pytania klientów, bo to warunek, żeby w ogóle rosła.",
        },
        {
          q: "Czym są dane strukturalne?",
          a: "To opis strony w języku zrozumiałym dla wyszukiwarek: nazwa firmy, adres, godziny, usługi, ceny, pytania. Dzięki nim Google może pokazać część tych informacji bezpośrednio w wynikach wyszukiwania.",
        },
        {
          q: "Czy profil firmy w Google jest ważny?",
          a: "Dla lokalnej firmy bardzo: to on pojawia się na mapie i w wynikach z okolicy. Dlatego nazwa, adres, godziny i telefon na stronie i w profilu muszą być takie same.",
        },
      ],
    },
    en: {
      slug: "technical-seo",
      title: "Technical SEO",
      metaTitle: "Technical SEO for websites, Warsaw | ROVBA",
      metaDescription: "Speed, proper headings, structured data and a Google Business Profile: the technical basis that lets a site be found in search.",
      intro: "Technical SEO is the foundation without which Google misreads a site: speed, correct headings and descriptions, a sitemap and structured data. We do it in every project, and in the Business site package we also set up your Google Business Profile.",
      includes: [
        "Fast loading on a phone: light images and code without needless scripts",
        "One H1 and a logical heading structure on every page",
        "Page titles and descriptions written for what your clients search for",
        "A sitemap (sitemap.xml), robots.txt and correct canonical addresses",
        "schema.org structured data: business, services, prices, questions and breadcrumbs",
        "Language tags (hreflang) for multilingual sites",
        "A Google Business Profile consistent with the site (from the Business site package)",
      ],
      when: [
        "The site does not show up on Google for your business name or service.",
        "Search results show the wrong title or a random description.",
        "The site loads slowly on a phone.",
        "You have several language versions and Google shows the wrong one.",
      ],
      steps: [
        ["Audit", "We check speed, indexing, headings, descriptions and structured data."],
        ["Fixes", "We fix whatever blocks or confuses search engines."],
        ["Google", "We submit the sitemap to Google and tidy up the business profile."],
        ["Measuring", "After launch you can see which searches the site appears for and what is worth adding."],
      ],
      price: "Technical SEO basics are in every package from PLN 1,500 + VAT. The Google Business Profile: from the Business site package, from PLN 3,500 + VAT.",
      faq: [
        {
          q: "How is technical SEO different from ongoing SEO work?",
          a: "Technical SEO lets Google read and understand the site quickly. Ongoing SEO is longer work on content, reviews and links. Without the technical basis, that later work brings far less.",
        },
        {
          q: "Will you guarantee first place on Google?",
          a: "No. No honest studio can, because rankings depend on competitors, reviews and time. We make sure the site is technically ready and answers clients' questions, which is the condition for it to grow at all.",
        },
        {
          q: "What is structured data?",
          a: "A description of the site in a language search engines understand: the business name, address, hours, services, prices, questions. With it, Google can show some of this information directly in search results.",
        },
        {
          q: "Does the Google Business Profile matter?",
          a: "For a local business, a lot: it is what appears on the map and in nearby results. So the name, address, hours and phone must be the same on the site and in the profile.",
        },
      ],
    },
  },
  {
    pl: {
      slug: "strony-wielojezyczne",
      title: "Strony wielojęzyczne",
      metaTitle: "Strony wielojęzyczne dla firm, Warszawa | ROVBA",
      metaDescription: "Strona w kilku językach z osobnymi adresami dla każdej wersji, żeby Google pokazywał właściwą. Każdy pakiet ma od razu wersję polską i angielską.",
      intro: "Każdą stronę robimy od razu po polsku i po angielsku. Każdy język ma własne adresy i oznaczenia dla wyszukiwarek, więc Google pokazuje gościowi z zagranicy wersję angielską, a klientowi z Warszawy polską.",
      includes: [
        "Wersja polska i angielska w każdym pakiecie, także w wizytówce",
        "Osobne adresy dla każdego języka, na przykład /en/…",
        "Oznaczenia hreflang, dzięki którym Google pokazuje właściwą wersję",
        "Przełącznik języka, który prowadzi do tej samej podstrony w drugim języku",
        "Przetłumaczone tytuły, opisy i dane strukturalne, a nie tylko teksty na stronie",
        "Kolejne języki, na przykład ukraiński albo niemiecki, w osobnej wycenie",
      ],
      when: [
        "Przychodzą do Ciebie turyści albo obcokrajowcy mieszkający w Warszawie.",
        "Obsługujesz klientów lub pacjentów po angielsku i chcesz, żeby o tym wiedzieli.",
        "Masz dziś tylko tłumaczenie automatyczne albo jedną mieszaną wersję.",
      ],
      steps: [
        ["Języki", "Ustalamy, które języki i które podstrony są potrzebne."],
        ["Adresy", "Każdy język dostaje własne adresy i oznaczenia dla wyszukiwarek."],
        ["Treści", "Wstawiamy wersje językowe tekstów, tytułów i opisów."],
        ["Sprawdzenie", "Sprawdzamy przełącznik, adresy i to, czy każda wersja ma komplet danych dla Google."],
      ],
      price: "Polski i angielski w każdym pakiecie od 1 500 zł netto. Kolejne języki wyceniamy osobno.",
      faq: [
        {
          q: "Czy wersja angielska jest w cenie?",
          a: "Tak, w każdym pakiecie, także w wizytówce. Kolejne języki dodajemy w osobnej wycenie.",
        },
        {
          q: "Czy nie wystarczy automatyczne tłumaczenie w przeglądarce?",
          a: "Gościowi czasem wystarczy, ale Google go nie widzi: w wynikach po angielsku taka strona się nie pojawi. Osobna wersja z własnymi adresami może się w nich pojawić.",
        },
        {
          q: "Czy mogę dodać kolejny język później?",
          a: "Tak. Strona od początku jest przygotowana na kilka języków, więc kolejny dodajemy bez przebudowy.",
        },
      ],
    },
    en: {
      slug: "multilingual-websites",
      title: "Multilingual websites",
      metaTitle: "Multilingual websites for businesses, Warsaw | ROVBA",
      metaDescription: "A site in several languages, each version with its own addresses so Google shows the right one. Every package comes in Polish and English.",
      intro: "Every site we build comes in Polish and English from day one. Each language has its own addresses and tags for search engines, so Google shows a visitor from abroad the English version and a client from Warsaw the Polish one.",
      includes: [
        "Polish and English in every package, the one-page site included",
        "Separate addresses for each language, for example /en/…",
        "hreflang tags, so Google shows the right version",
        "A language switch that leads to the same page in the other language",
        "Translated titles, descriptions and structured data, not only the text on the page",
        "More languages, for example Ukrainian or German, quoted separately",
      ],
      when: [
        "Tourists or foreigners living in Warsaw come to you.",
        "You serve clients or patients in English and want them to know.",
        "Today you only have browser translation or one mixed version.",
      ],
      steps: [
        ["Languages", "We agree on which languages and which pages are needed."],
        ["Addresses", "Each language gets its own addresses and tags for search engines."],
        ["Content", "We add the language versions of the texts, titles and descriptions."],
        ["Check", "We check the switch, the addresses and that every version has complete data for Google."],
      ],
      price: "Polish and English in every package from PLN 1,500 + VAT. More languages are quoted separately.",
      faq: [
        {
          q: "Is the English version included in the price?",
          a: "Yes, in every package, the one-page site included. More languages are quoted separately.",
        },
        {
          q: "Isn't browser translation enough?",
          a: "It sometimes works for the visitor, but Google does not see it: such a site will not appear in English results. A separate version with its own addresses can.",
        },
        {
          q: "Can I add another language later?",
          a: "Yes. The site is prepared for several languages from the start, so we add another one without rebuilding it.",
        },
      ],
    },
  },
];

export const serviceBySlug = (lang: Lang, slug: string) => SERVICES.findIndex((s) => s[lang].slug === slug);
