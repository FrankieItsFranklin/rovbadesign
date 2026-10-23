import { LOGO_VIEWBOX, MARK_PIECES, WORD_DESIGN, WORD_LETTERS } from "./brand-logo";

/** The horizontal ROVBA Design logo, drawn in the current text colour. Parts are classed for the hover. */
export function Logo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox={LOGO_VIEWBOX} fill="currentColor" aria-hidden="true" focusable="false">
      {MARK_PIECES.map((d, i) => (
        <path key={`m${i}`} className={`logo-piece logo-piece-${i + 1}`} d={d} />
      ))}
      {WORD_LETTERS.map((d, i) => (
        <path key={`l${i}`} className="logo-letter" style={{ ["--i" as string]: i }} d={d} />
      ))}
      <path d={WORD_DESIGN} />
    </svg>
  );
}
