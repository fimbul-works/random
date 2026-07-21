import { FRAC } from "../constants.js";
import { decorateRandom, defineRandomState } from "../decorate/decorate.js";
import type { RandomNumberGenerator, Seed } from "../types.js";
import { normalizeSeed } from "../util.js";

/**
 * Creates a new Mulberry32 PRNG.
 *
 * This code is an implementation of the Mulberry32 algorithm by Tommy Ettinger.
 *
 * @param {Seed} [seed=Date.now()] - Optional seed value (number or string). Defaults to current time if not provided.
 * @returns {DecoratedRandomFunction<number>} A new PRNG.
 */
export function createRandomMulberry32(seed: Seed = Date.now()): RandomNumberGenerator<number> {
  let s = normalizeSeed(seed);

  function random() {
    let t = (s += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) * FRAC;
  }

  return decorateRandom(
    defineRandomState<number>(
      random,
      s,
      () => s,
      (state) => (s = state),
    ),
  );
}
