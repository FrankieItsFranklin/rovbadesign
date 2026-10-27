// Polish copy for each project, keyed by project id. Missing entries fall back to English.

type PolishCopy = {
  category: string;
  city: string;
  description: string;
  challenge: string;
  approach: string;
  /** Same order as `details` in projects.ts. */
  details: string[];
};

export const polishProjects: Record<string, PolishCopy> = {
  szkliwo: {
    category: "Gabinet stomatologiczny",
    city: "Warszawa",
    description:
      "Mały gabinet na Żoliborzu, wydrukowany jak polskie ulotki farmaceutyczne z lat 60. i 70. Każdy zabieg to osobna ulotka w jednej płaskiej farbie, z lekarzem, ceną i prostym następnym krokiem.",
    challenge: "Strony dentystów w Warszawie wyglądają jak ten sam biały gabinet z uśmiechem ze stocku. Szkliwo potrzebowało głosu, którego nie skopiuje sąsiad.",
    approach:
      "Sięgnęliśmy po język ulotek, które polskie zakłady farmaceutyczne rozsyłały do rejonowych przychodni: płaskie plamy koloru, wysokie wąskie nazwy dzielone na sylaby i jeden czarny pas.",
    details: [
      "Wersaliki League Gothic dzielone na sylaby, jak na ulotce z lat 70., i prosty grotesk do wszystkiego, co pacjent czyta.",
      "Szary papier offsetowy i siedem płaskich farb, po jednej na zabieg, nadrukowanych na siebie jak w druku dwukolorowym.",
      "Osiem ulotek rozkłada się ze stosu, a najbliższe wolne terminy z pierwszego ekranu otwierają już wypełniony formularz zapisu.",
    ],
  },
  halong: {
    category: "Restauracja wietnamska",
    city: "Warszawa",
    description:
      "Wietnamska restauracja, której sala sama jest osobnym światem: lampiony, laka i obraz zatoki Ha Long na ścianie. Strona przenosi tę salę do sieci i pozwala właścicielom samodzielnie zmieniać menu.",
    challenge: "Menu często się zmienia, a właściciele nie są technikami. Marką jest sala, więc to jej zdjęcia musiały nieść stronę.",
    approach:
      "Sala na pełną szerokość w pierwszym ekranie, obraz zatoki jako opowieść i edytor w przeglądarce do dań, cen i godzin.",
    details: [
      "Ciężki grotesk w złocie i bieli, równie głośny jak sala.",
      "Własne zdjęcia wnętrza, ciepłe, nigdy nie pocięte na miniatury.",
      "Menu, godziny i galerię właściciele edytują przez /admin; zmiany są online w kilka minut.",
    ],
  },
  "north-barber": {
    category: "Barbershop",
    city: "Warszawa",
    description:
      "Koncept studia dla barbershopu z trzema fotelami na Pradze. Głośny, wąski krój, czarne wnętrze i jedna sygnałowa czerwień, żeby cennik dało się przeczytać z drugiej strony ulicy.",
    challenge: "Strony barberów wyglądają tak samo: ciemne zdjęcia, logo w skrypcie i widget rezerwacji w zupełnie innym stylu.",
    approach: "Typografia stała się wnętrzem: nazwa biegnie przez całą szerokość ekranu, a cennik złożony jest jak szyld.",
    details: [
      "Anton do wszystkiego, co krzyczy, prosty grotesk do wszystkiego, co informuje.",
      "Czerń, kość i jedna czerwona kropka, która staje się znakiem.",
      "Tablica terminów pokazuje najbliższy wolny fotel, więc nagłówek „Wtorek?” sam sobie odpowiada.",
    ],
  },
  fiszka: {
    category: "Gabinet stomatologiczny",
    city: "Warszawa",
    description:
      "Gabinet na Mokotowie, którego nazwa to fiszka z kartoteki, a strona jest kartoteką pacjentów: każda sekcja to kolorowa przekładka z indeksem, a pierwszy ekran to karta wizyty. Dotknij zęba, który niepokoi, a formularz już wie, gdzie boli.",
    challenge: "Pacjenci rzadko znają nazwę swojego problemu. Wiedzą za to, który to ząb.",
    approach:
      "Interaktywny schemat zębów zamienia objaw w wypełnioną prośbę o wizytę, a cennik odpowiada na pytania przed telefonem.",
    details: [
      "Ząb, objaw, rezerwacja: trzy dotknięcia od pierwszego ekranu do wypełnionego formularza.",
      "Karty katalogowe z czerwoną linią nagłówka i niebieskimi liniami; lekarze to karty z kartoteki, z inicjałami zamiast portretów.",
      "Wybrany ząb jest zakreskowany czerwonym ołówkiem, tak jak dentysta zaznacza ząb do leczenia na karcie.",
    ],
  },
  ventotto: {
    category: "Ristorante, pizzeria, caffè",
    city: "Warszawa",
    description:
      "Koncept studia dla włoskiej restauracji, która od 1987 roku stoi na tym samym rogu. Butelkowa zieleń, Bodoni i menu, które czyta się jak drukowaną kartę na stole.",
    challenge: "Strony włoskich restauracji sięgają po obrusy w kratkę i flagi. Ventotto jest cichsze i starsze.",
    approach: "Powściągliwość starych pieniędzy: jeden szeryf, trzy kolory, piec jako bohater i poranny bar espresso jako osobny rozdział.",
    details: [
      "Bodoni Moda w nazwie i daniach, Libre Franklin w cenach i godzinach.",
      "Butelkowa zieleń, kremowy karton i jedna głęboka czerwień wina.",
      "Karta idzie za zegarem: rano bar espresso, w południe obiad, wieczorem pełna kolacja.",
    ],
  },
  tilia: {
    category: "Gabinet stomatologiczny",
    city: "Warszawa",
    description:
      "Mały gabinet na Żoliborzu, który chce być spokojny, a nie kliniczny. Strona czyta się jak drukowana ulotka dla pacjenta: cichy szeryf, szerokie marginesy i każdy krok pierwszej wizyty wyjaśniony, zanim ktokolwiek musi zadzwonić.",
    challenge: "Większość stron dentystów w mieście zaczyna się od zdjęcia uśmiechu ze stocku i przycisku rezerwacji. Osiedlowy gabinet musi najpierw zdobyć zaufanie.",
    approach:
      "Zaczęliśmy od rozmowy, a nie od zabiegu: trzy proste kroki, prawdziwe godziny otwarcia i cennik, który da się przeczytać na telefonie.",
    details: [
      "Lekki, redakcyjny szeryf w nagłówkach, duży i lekko pochylony w jedynym zdaniu, które naprawdę się liczy.",
      "Kolor kości, głęboka zieleń sosny dla akcji i nic więcej.",
      "Formularz rezerwacji, który mówi wprost, co się stanie po wysłaniu.",
    ],
  },
  rubryka: {
    category: "Biuro rachunkowe",
    city: "Kraków",
    description:
      "Demonstracyjne biuro rachunkowe z Krakowa, nazwane od rubryki w księdze. Nowi klienci mają znać cenę przed pierwszym spotkaniem, więc strona jest zbudowana wokół kalkulatora, który zamienia liczbę dokumentów w miesięczny abonament.",
    challenge: "Biura rachunkowe chowają ceny za formularzem kontaktowym. Małe firmy wychodzą, zanim zapytają.",
    approach: "Jasna obietnica w nagłówku i działający kalkulator abonamentu tuż pod nim.",
    details: [
      "Przesuń liczbę dokumentów i pracowników, przeczytaj dokładną cenę miesięczną.",
      "Precyzyjny grotesk z cyframi tabelarycznymi, żeby każda cena trzymała linię.",
      "Znak to kartka księgi z rubrykami i jedną wypełnioną komórką: każda złotówka ma już swoje miejsce.",
    ],
  },
  "atelier-17": {
    category: "Studio fryzur",
    city: "Warszawa",
    description:
      "Koncept studia dla salonu na Powiślu, który przyjmuje jedną klientkę naraz. Powściągliwość magazynu modowego: włoskowy szeryf, kamienne tło i czarno-białe zdjęcia.",
    challenge: "Strony beauty bywają różowe, tłoczne i pełne promocji. Ten salon sprzedaje czas i uwagę.",
    approach: "Numer drzwi stał się identyfikacją: ogromny i blady za nazwą, a pod spodem usługi z prostymi cenami.",
    details: [
      "Instrument Serif w dużych rozmiarach, z wyraźnymi polskimi znakami, i Manrope we wszystkim, co klientka musi przeczytać.",
      "Archiwalne zdjęcie lustra w salonie z 1953 roku buduje nastrój, dopóki studio nie ma własnej sesji.",
      "Wybierz usługi i zobacz, jak wizyta układa się na jednej linii dnia: jedna klientka naraz.",
    ],
  },
  kotwica: {
    category: "Klinika implantologii",
    city: "Lublin",
    description:
      "Wielostronicowa demonstracyjna strona kliniki implantologii w Lublinie. Kotwica, bo tym właśnie jest implant. Wyróżnikiem jest implant, który rozkłada się przy przewijaniu: korona, łącznik, dziąsło i kość, każdy z ceną.",
    challenge: "Leczenie implantologiczne jest drogie i trudne do wyobrażenia. Pacjent musi zobaczyć, za co płaci.",
    approach: "Rozkładany przy przewijaniu implant, pełny cennik i kalkulator kosztów na ciemnym, klinicznym granacie.",
    details: [
      "Implant rozkłada się część po części; na telefonie zostaje przypięty rysunek z jedną kartą.",
      "Nocny granat i tytanowe szarości, z cyjanem linii skanu dla akcji.",
      "Osiem podstron; każda cena i każdy etap leczenia zapisane jako edytowalne dane.",
    ],
  },
  korzenna: {
    category: "Restauracja",
    city: "Toruń",
    description:
      "Polska restauracja przy ulicy Podmurnej, pod średniowiecznymi murami Torunia, z piernikiem jako cichym podpisem. Nazwa wlewa się lukrem w pierwszym ekranie, a rezerwacja przychodzi jako drukowany bilecik na mosiężnej szynie.",
    challenge: "Restauracja z mocną lokalną historią i kartą, która zmienia się z sezonem.",
    approach: "Ciepła, piernikowa sala, jesienna karta jako dane do przeglądania i bilet rezerwacji, który wygląda jak papier.",
    details: [
      "Formularz rezerwacji to dwuetapowy bilet z pieczątką na końcu.",
      "Cała sezonowa karta z cenami, z filtrem składników.",
      "Pędzelkowa nazwa, która wypełnia się lukrem jak forma, nad solidnym, książkowym szeryfem.",
    ],
  },
  przystan: {
    category: "Rodzinny gabinet stomatologiczny",
    city: "Białystok",
    description:
      "Rodzinny gabinet w centrum Białegostoku, w którym mama i syn leczą pacjentów obok siebie. Strona od razu odpowiada na prawdziwe pytania: kto, za ile i jak się zapisać.",
    challenge: "Sześćdziesiąt pozycji cennika, cztery osoby w zespole i zapisy przez telefon.",
    approach: "Głęboki morski pierwszy ekran, prawdziwe liczby zamiast haseł i pełny cennik w sześciu rozdziałach.",
    details: [
      "Liczby zamiast przymiotników: lata praktyki, cena pierwszej wizyty, znieczulenie w cenie.",
      "Głęboki morski z delikatną brzoskwinią, spokojny dla dzieci i ich dziadków.",
      "Jedna długa strona z cennikiem, zespołem, opiniami i pytaniami w osobnych rozdziałach.",
    ],
  },
  szprycha: {
    category: "Warsztat rowerowy",
    city: "Kraków",
    description:
      "Koncept studia dla warsztatu rowerowego na Podgórzu, który naprawia rower w jeden dzień: oddajesz rano, odbierasz po siedemnastej. Nagłówek mówi dokładnie to, a koło stoi w miejscu słowa.",
    challenge: "Warsztaty ukrywają ceny i nikt nie wie, kiedy rower będzie gotowy.",
    approach: "Kartonowa przywieszka, która wisi na każdym rowerze w warsztacie, stała się zapisem: zaznaczasz, co nie działa, a przywieszka wpisuje cenę i godzinę odbioru.",
    details: [
      "Przywieszka liczy cenę i dzień odbioru według godziny na Twoim telefonie i kołysze się, gdy coś się zmienia.",
      "Big Shoulders w oliwkowych wersalikach, w rozmiarze plakatu, nad Public Sans.",
      "Kość i jedna oliwkowa zieleń, kolor starej ramy.",
    ],
  },
  ostrozka: {
    category: "Kwiaciarnia",
    city: "Poznań",
    description:
      "Koncept studia dla kwiaciarni przy Rynku Wildeckim w Poznaniu, nazwanej od ostróżki. Strona jest bilecikiem, który wkłada się do każdego bukietu, a bukiety wychodzą w szarym papierze i sznurku.",
    challenge: "Strony kwiaciarni sprzedają te same róże ze stocku. Ten stragan sprzedaje to, co rano przyjechało z giełdy.",
    approach: "Pierwszy ekran to sam bilecik; pod nim sześć karteczek z bukietami tygodnia i kreator, który owija łodygi w papier, gdy je dodajesz.",
    details: [
      "Dodawaj łodygi po jednej, a bukiet rośnie w szarym papierze, z ceną i Twoimi słowami na bileciku.",
      "XIX-wieczne ryciny botaniczne ostróżki obok zdjęć targu.",
      "Trzy kamienne szarości i jedna szałwiowa zieleń, żeby cały kolor niosły kwiaty.",
    ],
  },
  kruszon: {
    category: "Cukiernia",
    city: "Łódź",
    description:
      "Koncept studia dla rodzinnej cukierni w Łodzi, nazwanej od maślanej kruszonki, którą sypie na wszystko. Pięć stron, po których przy przewijaniu przelatują ciastka i pączki, witryna z koszykiem i pracownia tortów, która rysuje tort piętro po piętrze.",
    challenge: "Trzy cukiernie, które mają pachnieć kuchnią babci, a przy tym przyjmować zamówienia jak sklep.",
    approach: "Witryna z koszykiem do odbioru tego samego dnia i pracownia tortów: piętra, biszkopt, krem, nadzienie, boki, polewa i dekoracje, rysowane na żywo z przekrojem i ceną od wagi.",
    details: [
      "Pracownia rysuje do trzech pięter z polewą, owocami, świeczkami i tabliczką, pokazuje przekrój i zapisuje projekt w linku.",
      "Ciastka sfotografowane na białym tle i wycięte, więc unoszą się nad stroną jak na tacy.",
      "Ciastka przelatują przez pasy bez tekstu, a nagłówki i liczby zawsze zostają czyste.",
    ],
  },
};

/** Service names and detail labels shared by many projects. */
export const polishTerms: Record<string, string> = {
  "Art Direction": "Art direction",
  "UX/UI": "UX/UI",
  "Web Design": "Projekt strony",
  Development: "Programowanie",
  "Responsive Design": "Wersja mobilna",
  CMS: "Panel edycji treści",
  "Bilingual Site": "Strona dwujęzyczna",
  Identity: "Identyfikacja",
  "Interactive Element": "Element interaktywny",
  "Pricing Calculator": "Kalkulator cen",
  Booking: "Rezerwacje",
  Motion: "Animacja",
  Typography: "Typografia",
  Palette: "Paleta",
  Interaction: "Interakcja",
  Imagery: "Zdjęcia",
  Content: "Treść",
  Illustration: "Ilustracja",
  Pricing: "Cennik",
  Menu: "Menu",
  Tone: "Ton",
  Layout: "Układ",
  Structure: "Struktura",
};
