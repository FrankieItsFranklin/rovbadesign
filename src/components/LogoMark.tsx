import { MARK_PIECES } from "./brand-logo";

// The three pieces of the sign occupy x 0–177.8, y 0–154 in the logo's coordinates.
const MARK_VIEWBOX = "-2 -2 181.82 158";

/** The ROVBA sign on its own, in the current text colour. Pieces are classed for the hover. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox={MARK_VIEWBOX} fill="currentColor" aria-hidden="true" focusable="false">
      {MARK_PIECES.map((d, i) => (
        <path key={i} className={`logo-piece logo-piece-${i + 1}`} d={d} />
      ))}
    </svg>
  );
}
