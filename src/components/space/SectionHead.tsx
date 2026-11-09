import type { ReactNode } from "react";

/**
 * Head of a section (DESIGN.md §5), centred on the page: the section's number wired to the strand, a large title and
 * its statement. The number is the strand anchor, so the strand marks the section while it is in view.
 */
export function SectionHead({ num, mark, title, id, children }: { num?: number; mark?: string; title: string; id: string; children?: ReactNode }) {
  return (
    <div className="sec-head">
      <p className="strand-anchor tech" data-strand-anchor aria-hidden="true">
        {mark ?? String(num).padStart(2, "0")}
      </p>
      <h2 id={id} className="sec-title">
        {title}
      </h2>
      {children && <div className="statement">{children}</div>}
    </div>
  );
}
