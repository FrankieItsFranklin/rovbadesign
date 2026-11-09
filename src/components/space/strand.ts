// The strand (DESIGN.md §5): one line of small triangle plates that runs down the left rail of the whole page,
// from the first screen to the footer. Everything on the page is wired to it: the service index in the first screen
// and the heading of every section ([data-strand-anchor]). Its shape is a pure function of the height on the page,
// so the WebGL layer that draws it and the leader lines in the DOM agree on where it is.

export type StrandLayout = {
  /** Centre of the rail, in CSS pixels from the left edge of the page. */
  x: number;
  /** Width of one plate. */
  size: number;
  /** Distance between plates along the strand. */
  gap: number;
  /** How far the strand swings out of the rail centre, and the length of one full swing. */
  sway: number;
  wave: number;
};

/** Reads the rail (the hero's first column, which every section keeps clear) and sizes the strand for it. */
export function strandLayout(): StrandLayout | null {
  const rail = document.querySelector<HTMLElement>("[data-strand-rail]");
  if (!rail) return null;
  const r = rail.getBoundingClientRect();
  const wide = innerWidth >= 1024;
  return {
    x: r.left + r.width / 2,
    size: wide ? 34 : 16,
    gap: wide ? 6 : 3.5,
    sway: wide ? 30 : 5,
    wave: wide ? 1100 : 900,
  };
}

/** Where the strand is at a height on the page (both in CSS pixels, y from the top of the document). */
export const strandX = (l: StrandLayout, y: number) => l.x + Math.sin((y / l.wave) * Math.PI * 2 - 0.9) * l.sway;

/** Height on the page of the middle of an element. */
export const pageY = (el: Element) => {
  const r = el.getBoundingClientRect();
  return r.top + scrollY + r.height / 2;
};

// Selection bus: the service index asks for a level on the strand (or none); the canvas decides when to show it.
type Listener = (y: number | null) => void;
let listener: Listener | null = null;
let pending: number | null = null;

export function selectOnStrand(y: number | null) {
  pending = y;
  listener?.(y);
}

export function onStrandSelect(fn: Listener) {
  listener = fn;
  fn(pending);
  return () => {
    if (listener === fn) listener = null;
  };
}

/**
 * Draws a leader line from an element to the strand: sets --lead (length) and --tilt (angle) for the element's
 * ::before, which starts at the element's left edge and runs to the strand point level with it.
 */
export function wireToStrand(el: HTMLElement, l: StrandLayout, minimum = 24) {
  const r = el.getBoundingClientRect();
  const y = r.top + scrollY + r.height / 2;
  const dx = Math.max(minimum, r.left - strandX(l, y));
  el.style.setProperty("--lead", `${dx.toFixed(0)}px`);
}
