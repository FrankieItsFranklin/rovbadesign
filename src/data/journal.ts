// Studio journal. Each article exists in both languages under its own slug.
import type { Lang } from "@/i18n/config";

type Block = { h?: string; p?: string; list?: string[] };
type Article = { slug: string; title: string; description: string; blocks: Block[] };

export type JournalEntry = { id: string; date: string; minutes: number } & Record<Lang, Article>;

export const journal: JournalEntry[] = [
  {
    id: "dental-site",
    date: "2026-10-24",
    minutes: 4,
    pl: {
      slug: "co-musi-byc-na-stronie-gabinetu-stomatologicznego",
      title: "Co musi być na stronie gabinetu stomatologicznego",
      description: "Pięć rzeczy, których pacjent szuka na stronie dentysty, zanim zadzwoni: cena, lekarz, pierwsza wizyta, zapis i dojazd.",
      blocks: [
        { p: "Pacjent rzadko porównuje gabinety po wyglądzie. Porównuje je po tym, czy w ciągu minuty znalazł odpowiedź na swoje pytanie. A pytania są prawie zawsze te same." },
        { h: "1. Ile to kosztuje", p: "Cennik to najczęściej odwiedzana podstrona każdego gabinetu. Nie musi być pełny, ale musi być uczciwy: konsultacja, przegląd, wypełnienie, leczenie kanałowe, higienizacja. Widełki są lepsze niż „cena ustalana indywidualnie”, bo pacjent i tak ich szuka, tylko u konkurencji." },
        { h: "2. Kto mnie będzie leczył", p: "Imię, nazwisko, czym się zajmuje i zdjęcie. Prawdziwe zdjęcie, nawet zrobione telefonem przy oknie, buduje więcej zaufania niż najładniejszy stock." },
        { h: "3. Jak wygląda pierwsza wizyta", p: "Wielu dorosłych boi się dentysty. Trzy proste kroki: rozmowa, badanie, plan i koszt, zanim cokolwiek zaczniemy. To jeden akapit, a zmienia decyzję." },
        { h: "4. Jak się zapisać", p: "Telefon klikalny na telefonie, w nagłówku i na dole ekranu. Jeśli gabinet ma ZnanyLekarz albo inny kalendarz, link do niego. Formularz tylko wtedy, gdy ktoś naprawdę oddzwania." },
        { h: "5. Gdzie to jest", p: "Adres, godziny, dojazd i parking. Plus aktualny profil firmy w Google, bo stamtąd przychodzi połowa pacjentów." },
        { h: "Czego nie potrzeba", list: ["Suwaka z pięcioma zdjęciami uśmiechów", "Listy wszystkich zabiegów świata, których gabinet nie robi", "Opinii bez źródła i daty"] },
        { p: "Dobra strona gabinetu jest spokojna jak dobra poczekalnia: wszystko jest tam, gdzie się tego spodziewasz." },
      ],
    },
    en: {
      slug: "what-a-dental-clinic-website-needs",
      title: "What a dental clinic website needs",
      description: "Five things patients look for on a dentist's site before they call: the price, the doctor, the first visit, booking and how to get there.",
      blocks: [
        { p: "Patients rarely compare clinics by looks. They compare them by whether they found an answer within a minute. And the questions are almost always the same." },
        { h: "1. How much does it cost", p: "The price list is the most visited page of every clinic site. It does not have to be complete, but it has to be honest: consultation, check-up, filling, root canal, hygiene. Ranges beat 'priced individually', because patients will look for them anyway, at the clinic next door." },
        { h: "2. Who will treat me", p: "Name, what they do and a photo. A real photo, even taken on a phone by a window, builds more trust than the nicest stock image." },
        { h: "3. What happens at the first visit", p: "Many adults are afraid of the dentist. Three plain steps: a conversation, an examination, a plan and a price before anything starts. One paragraph that changes the decision." },
        { h: "4. How to book", p: "A tappable phone number in the header and at the bottom of the screen. A link to the clinic's online calendar if it has one. A form only if someone really calls back." },
        { h: "5. Where it is", p: "Address, hours, how to get there and where to park. And an up-to-date Google Business Profile, because half of the patients come from there." },
        { h: "What it does not need", list: ["A slider of five stock smiles", "A list of every treatment in the world the clinic does not do", "Reviews without a source or a date"] },
        { p: "A good clinic site is as calm as a good waiting room: everything is where you expect it." },
      ],
    },
  },
  {
    id: "menu-pdf",
    date: "2026-10-24",
    minutes: 3,
    pl: {
      slug: "menu-restauracji-pdf-czy-strona",
      title: "Menu restauracji: PDF czy strona?",
      description: "Dlaczego menu w PDF traci gości na telefonie i jak zrobić menu, które właściciel zmienia sam w pięć minut.",
      blocks: [
        { p: "Większość gości otwiera menu na telefonie, często stojąc przed lokalem albo w tramwaju. PDF w takiej chwili oznacza powiększanie, przesuwanie i czekanie na plik." },
        { h: "Co tracisz z PDF", list: ["Google nie widzi dań, więc nie trafiasz na „pho Żoliborz”", "Każda zmiana ceny to nowy plik od grafika", "Na telefonie tekst jest za mały, a plik za duży"] },
        { h: "Jak wygląda dobre menu na stronie", p: "Kategorie jako zakładki, dania z ceną i jedną linijką o składnikach, alergeny przy daniu. Wyszukiwarka, jeśli pozycji jest dużo. Zdjęcia tylko tam, gdzie naprawdę pomagają wybrać." },
        { h: "Zmiany bez grafika", p: "Menu trzymamy jako dane, a nie jako obrazek. Właściciel loguje się w przeglądarce, zmienia cenę albo dodaje danie dnia i po kilku minutach jest online. Tak działa strona Ha Long Curry." },
        { p: "PDF może zostać jako dodatek do druku. Ale główne menu powinno być stroną." },
      ],
    },
    en: {
      slug: "restaurant-menu-pdf-or-page",
      title: "Restaurant menu: a PDF or a page?",
      description: "Why a PDF menu loses guests on phones, and how to make a menu the owner changes in five minutes.",
      blocks: [
        { p: "Most guests open the menu on a phone, often standing outside or on the tram. A PDF at that moment means zooming, panning and waiting for a file." },
        { h: "What a PDF costs you", list: ["Google cannot see the dishes, so you do not show up for 'pho near me'", "Every price change is a new file from a designer", "On a phone the text is too small and the file too big"] },
        { h: "What a good menu page looks like", p: "Categories as tabs, dishes with a price and one line on what is in them, allergens next to the dish. A search box if the list is long. Photos only where they really help to choose." },
        { h: "Changes without a designer", p: "We keep the menu as data, not as a picture. The owner logs in in a browser, changes a price or adds today's special, and a few minutes later it is online. That is how the Ha Long Curry site works." },
        { p: "Keep the PDF for printing if you like. The main menu should be a page." },
      ],
    },
  },
  {
    id: "template-or-custom",
    date: "2026-10-24",
    minutes: 4,
    pl: {
      slug: "szablon-czy-wlasny-projekt",
      title: "Szablon czy własny projekt strony?",
      description: "Kiedy gotowy szablon wystarczy małej firmie, a kiedy własny projekt naprawdę się zwraca.",
      blocks: [
        { p: "Szablon nie jest zły. Jest szybki, tani i sprawdzony. Problem zaczyna się wtedy, gdy Twoja strona wygląda dokładnie jak strona konkurenta z tej samej ulicy." },
        { h: "Szablon wystarczy, gdy", list: ["potrzebujesz strony na jutro, a treść jeszcze się zmienia", "klienci i tak przychodzą z polecenia, a strona ma tylko potwierdzić adres i telefon", "budżet jest naprawdę mały"] },
        { h: "Własny projekt się zwraca, gdy", list: ["konkurujesz z kilkoma podobnymi miejscami w okolicy i ludzie wybierają po wrażeniu", "masz coś, czego inni nie mają: salę, historię, sposób pracy", "strona ma robić konkretną rzecz: rezerwować, liczyć cenę, zapisywać na wizytę"] },
        { h: "Jak pracujemy my", p: "Zaczynamy od Twojego miejsca, a nie od szablonu: jego materiałów, ulicy, papierów, w których żyje branża. Z tego powstaje jeden kierunek wizualny, który uzasadniamy, a potem działający prototyp w kilka dni. Strona i kod należą do Ciebie." },
        { p: "Jeśli nie wiesz, co wybrać, napisz. Powiemy uczciwie, kiedy szablon wystarczy." },
      ],
    },
    en: {
      slug: "template-or-custom-website",
      title: "A template or a custom website?",
      description: "When a ready-made template is enough for a small business, and when a custom design really pays off.",
      blocks: [
        { p: "A template is not bad. It is fast, cheap and proven. The trouble starts when your site looks exactly like the one of a competitor on the same street." },
        { h: "A template is enough when", list: ["you need a site tomorrow and the content is still changing", "clients come by word of mouth anyway and the site only confirms the address and phone", "the budget is genuinely tiny"] },
        { h: "A custom design pays off when", list: ["you compete with a few similar places nearby and people choose by impression", "you have something others do not: a room, a story, a way of working", "the site has a specific job: take bookings, calculate a price, schedule visits"] },
        { h: "How we work", p: "We start from your place, not from a template: its materials, its street, the paperwork your trade lives in. That gives one visual direction we argue for, then a working prototype within days. You own the site and the code." },
        { p: "If you are not sure which to choose, write to us. We will tell you honestly when a template is enough." },
      ],
    },
  },
];

export const articleBySlug = (lang: Lang, slug: string) => journal.find((a) => a[lang].slug === slug);
