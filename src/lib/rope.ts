import type { CardAspect } from "@/data/projects";
import { clamp } from "./wrap";

export type LineGeometry = {
  width: number;
  height: number;
  /** Rope height at both viewport edges. */
  edgeY: number;
  /** How far the middle hangs below the edges. */
  sag: number;
  cardWidth: number;
  gap: number;
  /** Distance from the rope to the top edge of a print. */
  hang: number;
  /** Little dip a print's weight pulls into the rope under its pin. */
  pinDip: number;
  pinSpread: number;
  compact: boolean;
};

export function measureLine(width: number, height: number): LineGeometry {
  const compact = width < 640;
  const tablet = !compact && width < 1024;
  const cardWidth = compact
    ? clamp(190, 270, width * 0.62)
    : tablet
      ? clamp(210, 290, width * 0.31)
      : clamp(220, 310, width * 0.192);
  const sag = compact ? clamp(28, 48, width * 0.1) : clamp(48, 104, width * 0.054);
  // Hang the prints in the band between the header and the footer copy, a little above its middle.
  const bandTop = compact ? 84 : 96;
  const bandBottom = height - (compact ? 200 : 190);
  // Prints are landscape desktop screens (see cardSize): their height is 10/16 of a widened card.
  const block = sag + cardWidth * (compact ? 1.32 : 1.68) * 0.625 + (compact ? 56 : 0);
  return {
    width,
    height,
    edgeY: bandTop + Math.max(20, (bandBottom - bandTop - block) * (compact ? 0.5 : 0.42)),
    sag,
    cardWidth,
    gap: compact ? 22 : tablet ? 32 : clamp(36, 56, width * 0.03),
    hang: compact ? 7 : 9,
    pinDip: compact ? 1.6 : 2.4,
    pinSpread: cardWidth * 0.32,
    compact,
  };
}

const ASPECT: Record<CardAspect, number> = { "4/5": 5 / 4, "1/1": 1, "3/4": 4 / 3, "16/10": 10 / 16 };

export function cardSize(g: LineGeometry, scale: number, aspect: CardAspect) {
  // Square prints are a little narrower so they do not read as bigger than their neighbours.
  // Landscape prints carry a desktop first screen at its real proportions, so they are wider.
  const widen = aspect === "16/10" ? (g.compact ? 1.32 : 1.68) : aspect === "1/1" ? 0.94 : 1;
  const w = Math.round(g.cardWidth * scale * widen);
  return { w, h: Math.round(w * ASPECT[aspect]) };
}

/**
 * The rope is a parabola: edgeY at x = 0 and x = width, edgeY + sag in the middle.
 * It equals the quadratic Bézier with its control point at (width / 2, edgeY + 2 * sag).
 */
export function parabolaY(g: LineGeometry, sag: number, x: number) {
  const t = x / g.width;
  return g.edgeY + sag * (1 - (2 * t - 1) ** 2);
}

export function parabolaSlope(g: LineGeometry, sag: number, x: number) {
  const t = x / g.width;
  return (-4 * sag * (2 * t - 1)) / g.width;
}

/** Rope height including the small dips where each print hangs. */
export function ropeY(g: LineGeometry, sag: number, x: number, pins: Float64Array, count: number) {
  let y = parabolaY(g, sag, x);
  const s2 = 2 * g.pinSpread * g.pinSpread;
  for (let i = 0; i < count; i++) {
    const d = x - pins[i];
    if (d > -3 * g.pinSpread && d < 3 * g.pinSpread) y += g.pinDip * Math.exp(-(d * d) / s2);
  }
  return y;
}

export function ropePath(g: LineGeometry, sag: number, pins: Float64Array, count: number, from: number, to: number) {
  const steps = g.compact ? 48 : 96;
  let d = "";
  for (let i = 0; i <= steps; i++) {
    const x = from + ((to - from) * i) / steps;
    d += `${i ? "L" : "M"}${x.toFixed(1)} ${ropeY(g, sag, x, pins, count).toFixed(2)}`;
  }
  return d;
}
