import { SplashScript } from "./SplashScript";
import { LOGO_VIEWBOX, MARK_PIECES, WORD_DESIGN, WORD_LETTERS } from "./brand-logo";

/** The logo assembles on white, after the Skyrise reference: pieces fly in, the mark settles, the name follows. */
export function Splash() {
  return (
    <>
      <SplashScript />
      <div className="splash" aria-hidden="true">
        <svg className="splash-logo" viewBox={LOGO_VIEWBOX}>
          <g className="splash-mark">
            {MARK_PIECES.map((d, i) => (
              <path key={i} className={`splash-piece splash-piece-${i + 1}`} d={d} />
            ))}
          </g>
          {WORD_LETTERS.map((d, i) => (
            <path key={i} className="splash-letter" style={{ ["--i" as string]: i }} d={d} />
          ))}
          <path className="splash-design" d={WORD_DESIGN} />
        </svg>
      </div>
    </>
  );
}
