import type { Qa } from "@/data/faq";
import { SectionHead } from "./SectionHead";

/**
 * Questions and answers as a list of disclosure rows (native <details>, so it works without script and every answer
 * stays in the page for search engines). The first one starts open. `inner` renders it inside an inner page's body,
 * without the section's own padding.
 */
export function FaqSection({ num, title, lead, items, inner = false }: { num?: number; title: string; lead?: string; items: Qa[]; inner?: boolean }) {
  const list = (
    <div className="faq">
      {items.map((x, i) => (
        <details key={x.q} className="faq-item" open={i === 0}>
          <summary>
            <span className="faq-num" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="faq-q">{x.q}</span>
            <span className="faq-mark" aria-hidden="true" />
          </summary>
          <p className="faq-a">{x.a}</p>
        </details>
      ))}
    </div>
  );
  if (inner)
    return (
      <section aria-labelledby="faq-title" className="mt-28 md:mt-40">
        <div className="faq-head">
          <h2 id="faq-title" className="strand-anchor label" data-strand-anchor>
            {title}
          </h2>
        </div>
        <div className="mt-8">{list}</div>
      </section>
    );
  return (
    <section id="faq" aria-labelledby="faq-title" className="on-rail scroll-mt-6 px-[var(--gutter)] py-28 md:py-40">
      <SectionHead num={num} title={title} id="faq-title">
        {lead}
      </SectionHead>
      <div className="mt-16 md:mt-20">{list}</div>
    </section>
  );
}
