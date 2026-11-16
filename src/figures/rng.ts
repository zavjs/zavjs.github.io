/**
 * Seeded pseudo-random numbers (mulberry32).
 * The same seed always gives the same sequence, so a figure looks the
 * same on every visit until the reader asks for a new seed.
 */
export type Rng = {
  /** Uniform float in [0, 1). */
  (): number;
  /** Fair coin: true or false. */
  coin(): boolean;
  /** Integer in [min, max]. */
  int(min: number, max: number): number;
  /** Float in [min, max). */
  range(min: number, max: number): number;
};

export function createRng(seed: number): Rng {
  let a = seed >>> 0;
  const next = (() => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }) as Rng;
  next.coin = () => next() < 0.5;
  next.int = (min, max) => min + Math.floor(next() * (max - min + 1));
  next.range = (min, max) => min + next() * (max - min);
  return next;
}

export const randomSeed = () => Math.floor(Math.random() * 2 ** 31);
