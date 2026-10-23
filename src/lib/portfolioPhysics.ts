import { clamp } from "./wrap";

/** Release inertia: velocity decays exponentially, so the line glides and settles without a hard stop. */
export const INERTIA_TIME_MS = 220;
export const MIN_VELOCITY = 0.012; // px per ms

export function decay(velocity: number, dt: number) {
  return velocity * Math.exp(-dt / INERTIA_TIME_MS);
}

/** Pointer samples over the last ~90 ms give a release velocity that ignores the final jitter. */
export type Sample = { x: number; t: number };

export function releaseVelocity(samples: Sample[], now: number) {
  const recent = samples.filter((s) => now - s.t < 90);
  if (recent.length < 2) return 0;
  const first = recent[0];
  const last = recent[recent.length - 1];
  const dt = last.t - first.t;
  return dt > 0 ? clamp(-3, 3, (last.x - first.x) / dt) : 0;
}

/** Damped spring step (semi-implicit Euler), dt in ms. */
export function springStep(
  value: number,
  velocity: number,
  target: number,
  dt: number,
  stiffness: number,
  damping: number,
): [number, number] {
  const s = dt / 1000;
  const v = velocity + (-stiffness * (value - target) - damping * velocity) * s;
  return [value + v * s, v];
}

/** A print swings like a pendulum hung from its pin: dragging right makes the bottom trail left. */
export const MAX_SWING_DEG = 2.4;
export const SWING_GAIN = 2.2; // degrees per px/ms
export const MAX_TANGENT_DEG = 3.5;
export const TANGENT_SHARE = 0.42;
export const MAX_EXTRA_SAG = 10;

export const swingTarget = (velocity: number) => clamp(-MAX_SWING_DEG, MAX_SWING_DEG, velocity * SWING_GAIN);
export const tangentDeg = (slope: number) =>
  clamp(-MAX_TANGENT_DEG, MAX_TANGENT_DEG, (Math.atan(slope) * 180 * TANGENT_SHARE) / Math.PI);

export const easeOutQuint = (t: number) => 1 - (1 - t) ** 5;
