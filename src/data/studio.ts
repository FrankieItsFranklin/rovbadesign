// Studio facts. Empty strings are "do uzupełnienia": anything empty is simply not shown on the site.
// Fill them in here and redeploy; nothing else needs to change.

export const SITE_URL = "https://www.rovbadesign.pl";

export const studio = {
  name: "ROVBA Design",
  city: "Warszawa",
  /** Placeholder until the real mailbox exists (see README). */
  email: "hello@rovba.design",
  /** Legal details for the privacy policy and the footer. */
  owner: "", // imię i nazwisko właściciela / nazwa firmy
  nip: "", // NIP
  regon: "",
  address: "", // adres rejestrowy, np. "ul. …, 00-000 Warszawa"
  /** Contact shortcuts. */
  whatsapp: "", // numer w formacie 48500100200 (bez + i spacji)
  phone: "", // do wyświetlenia, np. "+48 500 100 200"
  calendarUrl: "", // link Cal.com / Calendly
  /** About page. */
  photo: "", // ścieżka w /public, np. "/studio/portrait.jpg"
  bio: { en: "", pl: "" },
};

export const hasLegalDetails = Boolean(studio.owner && studio.nip);
