import { LOGO_VIEWBOX, MARK_PIECES, WORD_DESIGN, WORD_LETTERS } from "./brand-logo";

/** The horizontal ROVBA Design logo, drawn in the current text colour. */
export function Logo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox={LOGO_VIEWBOX} fill="currentColor" aria-hidden="true" focusable="false">
      {[...MARK_PIECES, ...WORD_LETTERS, WORD_DESIGN].map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}
