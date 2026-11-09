// Studio facts. Empty strings are "do uzupełnienia": anything empty is simply not shown on the site.
// Fill them in here and redeploy; nothing else needs to change.

export const SITE_URL = "https://www.rovbadesign.pl";

export const studio = {
  name: "ROVBA Design",
  city: "Warszawa",
  email: "rovbadesign@gmail.com",
  /** Legal details for the privacy policy and the footer. */
  owner: "", // imię i nazwisko właściciela / nazwa firmy
  nip: "", // NIP
  regon: "",
  address: "ul. Cichociemnych 3", // adres studia (ten sam co w profilu firmy w Google)
  district: "Praga-Południe",
  postalCode: "", // kod pocztowy, np. "04-000"
  /** Contact shortcuts. */
  whatsapp: "", // numer w formacie 48500100200 (bez + i spacji)
  phone: "+48 572 772 218",
  calendarUrl: "", // link Cal.com / Calendly
  /** The people behind the studio: the about page and the authors of the journal. */
  team: ["Yevhen Rovba", "Aliaksei Shkuratau"],
  /** About page. */
  photo: "", // ścieżka w /public, np. "/studio/portrait.jpg"
  bio: { en: "", pl: "" },
};

export const telHref = (phone: string) => `tel:${phone.replace(/\s/g, "")}`;

/** "ul. Cichociemnych 3, Praga-Południe, Warszawa" */
export const studioAddress = [studio.address, studio.district, [studio.postalCode, studio.city].filter(Boolean).join(" ")].filter(Boolean).join(", ");
/** Google Maps search for the studio by name and address; it opens the studio's business profile. */
export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${studio.name}, ${studio.address}, ${studio.city}`)}`;

export const hasLegalDetails = Boolean(studio.owner && studio.nip);
