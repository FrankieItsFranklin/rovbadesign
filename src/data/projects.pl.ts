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
  finir: {
    category: "Gabinet stomatologiczny",
    city: "Warszawa",
    description:
      "Mały gabinet na Żoliborzu, który chciał być spokojny, a nie kliniczny. Strona czyta się jak drukowana ulotka dla pacjenta: cichy szeryf, szerokie marginesy i każdy krok pierwszej wizyty wyjaśniony, zanim ktokolwiek musi zadzwonić.",
    challenge: "Większość stron dentystów w mieście zaczyna się od zdjęcia uśmiechu ze stocku i przycisku rezerwacji. Finir musiał najpierw zdobyć zaufanie.",
    approach:
      "Zaczęliśmy od rozmowy, a nie od zabiegu: trzy proste kroki, prawdziwe godziny otwarcia i cennik, który da się przeczytać na telefonie.",
    details: [
      "Lekki, redakcyjny szeryf w nagłówkach, duży i lekko pochylony w jedynym zdaniu, które naprawdę się liczy.",
      "Kolor kości, głęboka zieleń sosny dla akcji i nic więcej.",
      "Formularz rezerwacji, który mówi wprost, co się stanie po wysłaniu.",
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
      "Archiwalne zdjęcia starych foteli fryzjerskich, odbarwione do poziomu typografii.",
    ],
  },
  lident: {
    category: "Gabinet stomatologiczny",
    city: "Warszawa",
    description:
      "Prototyp dla gabinetu na Mokotowie, zrobiony, żeby zacząć rozmowę z klientem. Pierwszy ekran to narysowany uśmiech: dotknij zęba, który niepokoi, a formularz rezerwacji już wie, gdzie boli.",
    challenge: "Pacjenci rzadko znają nazwę swojego problemu. Wiedzą za to, który to ząb.",
    approach:
      "Interaktywny schemat zębów zamienia objaw w wypełnioną prośbę o wizytę, a cennik odpowiada na pytania przed telefonem.",
    details: [
      "Ząb, objaw, rezerwacja: trzy dotknięcia od pierwszego ekranu do wypełnionego formularza.",
      "Każdy rysunek powstał w kodzie, w porcelanowych i szałwiowych kolorach gabinetu.",
      "Cennik z wyszukiwarką i bez gwiazdek, tak jak obiecuje nagłówek.",
    ],
  },
  milanovo: {
    category: "Ristorante, pizzeria, caffè",
    city: "Warszawa",
    description:
      "Koncept studia dla włoskiej restauracji, która od 1987 roku stoi na tym samym rogu. Butelkowa zieleń, Bodoni i menu, które czyta się jak drukowaną kartę na stole.",
    challenge: "Strony włoskich restauracji sięgają po obrusy w kratkę i flagi. Milanovo jest cichsze i starsze.",
    approach: "Powściągliwość starych pieniędzy: jeden szeryf, trzy kolory, piec jako bohater i poranny bar espresso jako osobny rozdział.",
    details: [
      "Bodoni Moda w nazwie i daniach, Libre Franklin w cenach i godzinach.",
      "Butelkowa zieleń, kremowy karton i jedna głęboka czerwień wina.",
      "Każde danie z ceną i jedną linijką o składnikach, bez PDF do pobrania.",
    ],
  },
  luka: {
    category: "Biuro rachunkowe",
    city: "Kraków",
    description:
      "Biuro rachunkowe z Krakowa, działające od 1993 roku, które chciało, żeby nowi klienci znali cenę przed pierwszym spotkaniem. Strona zbudowana jest wokół kalkulatora, który zamienia liczbę dokumentów w miesięczny abonament.",
    challenge: "Biura rachunkowe chowają ceny za formularzem kontaktowym. Małe firmy wychodzą, zanim zapytają.",
    approach: "Jasna obietnica w nagłówku i działający kalkulator abonamentu tuż pod nim.",
    details: [
      "Przesuń liczbę dokumentów i pracowników, przeczytaj dokładną cenę miesięczną.",
      "Precyzyjny grotesk z cyframi tabelarycznymi, żeby każda cena trzymała linię.",
      "Prosty polski, bez podatkowego żargonu na pierwszym ekranie.",
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
      "Italiana w dużych rozmiarach, Manrope we wszystkim, co klientka musi przeczytać.",
      "Archiwalne zdjęcie lustra w salonie z 1953 roku buduje nastrój, dopóki studio nie ma własnej sesji.",
      "Asymetryczne połowy, zdjęcie zawsze wyższe od tekstu obok.",
    ],
  },
  adp: {
    category: "Klinika implantologii",
    city: "Lublin",
    description:
      "Wielostronicowa strona kliniki implantologii w Lublinie, działającej od 1993 roku. Wyróżnikiem jest implant, który rozkłada się przy przewijaniu: korona, łącznik, tytanowy wszczep, każdy z ceną.",
    challenge: "Leczenie implantologiczne jest drogie i trudne do wyobrażenia. Pacjent musi zobaczyć, za co płaci.",
    approach: "Rozkładany przy przewijaniu implant, pełny cennik i kalkulator kosztów na ciemnym, klinicznym granacie.",
    details: [
      "Implant rozkłada się część po części; na telefonie zostaje przypięty rysunek z jedną kartą.",
      "Nocny granat i tytanowe szarości, z cyjanem linii skanu dla akcji.",
      "Osiem podstron; każda cena i każdy etap leczenia zapisane jako edytowalne dane.",
    ],
  },
  piernicova: {
    category: "Restauracja",
    city: "Toruń",
    description:
      "Polska restauracja przy średniowiecznych murach Torunia, z piernikiem jako cichym podpisem. Rezerwacja przychodzi jako drukowany bilecik zawieszony na mosiężnej szynie.",
    challenge: "Restauracja z mocną lokalną historią i kartą, która zmienia się z sezonem.",
    approach: "Ciepła, piernikowa sala, jesienna karta jako dane do przeglądania i bilet rezerwacji, który wygląda jak papier.",
    details: [
      "Formularz rezerwacji to dwuetapowy bilet z pieczątką na końcu.",
      "Cała sezonowa karta z cenami, z filtrem składników.",
      "Pędzelkowa nazwa nad solidnym, książkowym szeryfem.",
    ],
  },
  sobaniec: {
    category: "Rodzinny gabinet stomatologiczny",
    city: "Białystok",
    description:
      "Wspólny gabinet w centrum Białegostoku, w którym mama i syn leczą pacjentów obok siebie. Nowa strona zastępuje stary WordPress i odpowiada na prawdziwe pytania: kto, za ile i jak się zapisać.",
    challenge: "Sześćdziesiąt pozycji cennika, troje lekarzy i zapisy podzielone między telefon a zewnętrzny kalendarz.",
    approach: "Głęboki morski pierwszy ekran, prawdziwe liczby zamiast haseł i pełny cennik w sześciu rozdziałach.",
    details: [
      "Każda liczba na stronie pochodzi od gabinetu: oceny z datą, lata doświadczenia, ceny.",
      "Głęboki morski z delikatną brzoskwinią, spokojny dla dzieci i ich dziadków.",
      "Jedna długa strona z cennikiem, zespołem, opiniami i pytaniami w osobnych rozdziałach.",
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
