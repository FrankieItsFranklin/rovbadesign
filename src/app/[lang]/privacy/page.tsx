import type { Metadata } from "next";
import { InnerPage } from "@/components/InnerPage";
import { hasLegalDetails, studio } from "@/data/studio";
import type { Lang } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionaries";
import { pagePath } from "@/i18n/routes";

// Template written for this site's actual processing (contact form via Resend, hosting and cookie-free
// analytics on Vercel). It has not been reviewed by a lawyer; the controller's details come from data/studio.ts.

const controller = (lang: Lang) =>
  hasLegalDetails
    ? `${studio.owner}, NIP ${studio.nip}${studio.address ? `, ${studio.address}` : ""}`
    : lang === "pl"
      ? "ROVBA Design, Warszawa (pełne dane rejestrowe zostaną tu uzupełnione)"
      : "ROVBA Design, Warsaw (full registration details will be added here)";

const content = (lang: Lang) =>
  lang === "pl"
    ? [
        { h: "Administrator danych", p: `Administratorem danych osobowych jest ${controller(lang)}. Kontakt w sprawie danych: ${studio.email}.` },
        { h: "Jakie dane i po co", p: "Przetwarzamy dane, które sam podajesz w formularzu kontaktowym albo w wiadomości e-mail: imię, adres e-mail lub numer telefonu, nazwę firmy, adres strony i treść wiadomości. Używamy ich wyłącznie, aby odpowiedzieć na zapytanie i przygotować ofertę (art. 6 ust. 1 lit. b i f RODO)." },
        { h: "Komu przekazujemy dane", p: "Wiadomość z formularza jest wysyłana do nas przez usługę Resend (Resend, Inc.). Strona jest hostowana przez Vercel Inc. Obie firmy przetwarzają dane w naszym imieniu na podstawie umów powierzenia i mogą przetwarzać je poza EOG na podstawie standardowych klauzul umownych." },
        { h: "Jak długo", p: "Korespondencję przechowujemy przez czas potrzebny do odpowiedzi i ewentualnej współpracy, a potem nie dłużej niż 2 lata, chyba że przepisy wymagają dłużej (np. dokumenty księgowe)." },
        { h: "Cookies i statystyki", p: "Strona nie używa cookies reklamowych ani śledzących. Statystyki odwiedzin zbieramy przez Vercel Web Analytics, które nie zapisuje cookies i nie identyfikuje osób. Przeglądarka zapisuje jedynie techniczną informację w pamięci sesji, czy animacja powitalna została już pokazana." },
        { h: "Twoje prawa", p: "Masz prawo dostępu do swoich danych, ich sprostowania, usunięcia, ograniczenia przetwarzania, przeniesienia oraz sprzeciwu. Możesz też złożyć skargę do Prezesa Urzędu Ochrony Danych Osobowych (uodo.gov.pl)." },
        { h: "Zmiany", p: "Ta polityka może się zmienić, gdy zmieni się sposób działania strony. Aktualna wersja jest zawsze tutaj. Wersja z 24 października 2026." },
      ]
    : [
        { h: "Controller", p: `The controller of personal data is ${controller(lang)}. Contact on data matters: ${studio.email}.` },
        { h: "What data and why", p: "We process the data you give us in the contact form or by e-mail: name, e-mail address or phone number, business name, website address and your message. We use it only to reply and to prepare an offer (Art. 6(1)(b) and (f) GDPR)." },
        { h: "Who receives it", p: "Messages from the form are delivered to us by Resend (Resend, Inc.). The site is hosted by Vercel Inc. Both process data on our behalf under data processing agreements and may process it outside the EEA under standard contractual clauses." },
        { h: "How long", p: "We keep correspondence for as long as needed to reply and for any work that follows, and then no longer than 2 years, unless the law requires longer (e.g. accounting records)." },
        { h: "Cookies and statistics", p: "The site uses no advertising or tracking cookies. Visit statistics come from Vercel Web Analytics, which sets no cookies and does not identify people. The browser only keeps a technical note in session storage on whether the opening animation has already played." },
        { h: "Your rights", p: "You have the right to access, rectify and erase your data, to restrict processing, to data portability and to object. You may also complain to the Polish supervisory authority, the President of UODO (uodo.gov.pl)." },
        { h: "Changes", p: "This policy may change when the way the site works changes. The current version is always here. Version of 24 October 2026." },
      ];

export async function generateMetadata({ params }: PageProps<"/[lang]/privacy">): Promise<Metadata> {
  const lang = (await params).lang as Lang;
  return {
    title: dictionaries[lang].legal.privacy,
    alternates: { canonical: pagePath(lang, "privacy"), languages: { en: pagePath("en", "privacy"), pl: pagePath("pl", "privacy") } },
  };
}

export default async function Privacy({ params }: PageProps<"/[lang]/privacy">) {
  const lang = (await params).lang as Lang;
  const title = dictionaries[lang].legal.privacy;
  return (
    <InnerPage lang={lang} alternate={pagePath(lang === "en" ? "pl" : "en", "privacy")} label={title} title={title}>
      <div className="max-w-[68ch] text-[17px] leading-[1.6] md:ml-[25%]">
        {content(lang).map((s) => (
          <section key={s.h} className="mt-10 first:mt-0">
            <h2 className="text-[22px] font-semibold tracking-[-0.015em]">{s.h}</h2>
            <p className="mt-3">{s.p}</p>
          </section>
        ))}
      </div>
    </InnerPage>
  );
}
