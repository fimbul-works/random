import { FRAC } from "../constants.js";
import { decorateRandom, defineRandomState } from "../decorate/decorate.js";
import type { RandomNumberGenerator } from "../types.js";
import { normalizeSeed } from "../util.js";

/**
 * Creates a new Mulberry32 PRNG.
 *
 * This code is an implementation of the Mulberry32 algorithm by Tommy Ettinger.
 *
 * @param {number} [seed=Date.now()] - Optional seed number. Defaults to current time if not provided.
 * @returns {DecoratedRandomFunction<number>} A new PRNG.
 */
export function createMulberry32(seed: number = Date.now()): RandomNumberGenerator<number> {
  seed = normalizeSeed(seed);

  function random() {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) * FRAC;
  }

  return decorateRandom(
    defineRandomState<number>(
      random,
      seed,
      () => seed,
      (state) => (seed = state),
    ),
  );
}
