/** Wraps value into [min, max) so the line can loop forever without a visible jump. */
export function wrap(min: number, max: number, value: number) {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
}

export const clamp = (min: number, max: number, value: number) => Math.min(max, Math.max(min, value));
