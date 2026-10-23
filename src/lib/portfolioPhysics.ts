import { clamp } from "./wrap";

/** Release inertia: velocity decays exponentially, so the line glides and settles without a hard stop. */
export const INERTIA_TIME_MS = 220;
export const MIN_VELOCITY = 0.012; // px per ms

export function decay(velocity: number, dt: number) {
  return velocity * Math.exp(-dt / INERTIA_TIME_MS);
}

/** The last ~100 ms of movement give the release velocity; a finger that rested before lifting throws nothing. */
export type Sample = { x: number; t: number };

export function releaseVelocity(samples: Sample[], now: number) {
  const last = samples[samples.length - 1];
  if (!last || now - last.t > 80) return 0;
  const recent = samples.filter((s) => last.t - s.t <= 100);
  const first = recent[0];
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
export type MotionProfile = {
  swingGain: number; // degrees per px/ms
  maxSwing: number;
  /** Pendulum damping: lower keeps a print swinging a little after the line stops. */
  damping: number;
  /** Idle sway in degrees, so the line never looks frozen. */
  wind: number;
  /** How far the screenshot lags inside its frame while the line moves, px. */
  parallax: number;
};

// Phones have no hover, so the movement itself carries the life: stronger swing, longer settle.
export const motionFor = (compact: boolean): MotionProfile =>
  compact
    ? { swingGain: 3.4, maxSwing: 4.2, damping: 7.5, wind: 0.55, parallax: 10 }
    : { swingGain: 2.2, maxSwing: 2.4, damping: 11, wind: 0.3, parallax: 7 };
export const MAX_TANGENT_DEG = 3.5;
export const TANGENT_SHARE = 0.42;
export const MAX_EXTRA_SAG = 10;

export const swingTarget = (velocity: number, m: MotionProfile) => clamp(-m.maxSwing, m.maxSwing, velocity * m.swingGain);
export const tangentDeg = (slope: number) =>
  clamp(-MAX_TANGENT_DEG, MAX_TANGENT_DEG, (Math.atan(slope) * 180 * TANGENT_SHARE) / Math.PI);

export const clampUnit = (v: number) => clamp(-1, 1, v);

export const easeOutQuint = (t: number) => 1 - (1 - t) ** 5;
