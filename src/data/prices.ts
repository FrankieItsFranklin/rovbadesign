import type { Lang } from "@/i18n/config";

/** The pricing page (/cennik) is a draft until the studio's details are in: what is excluded from the price.
 *  While true it is hidden from search engines (noindex, not in the sitemap) and shows its gaps. */
export const PRICING_DRAFT = true;

/** Starting prices in PLN net of VAT (netto), one per package (Wizytówka, Strona firmowa, Strona z narzędziem); null = quoted after a call.
 *  Shared by the offer section, the FAQ answers and the structured data, so they never disagree. */
export const PACKAGE_PRICES: (number | null)[] = [1500, 3500, 6000];

// Grouping by hand: Polish Intl leaves four-digit numbers ungrouped ("1500"), and the space must not break.
const group = (n: number, sep: string) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, sep);
/** "od 1 500 zł netto" / "from PLN 1,500 + VAT": prices are net of VAT, as is usual for business clients in Poland. */
export const formatPrice = (n: number, lang: Lang) => (lang === "pl" ? `od ${group(n, "\u00a0")} zł netto` : `from PLN ${group(n, ",")} + VAT`);
