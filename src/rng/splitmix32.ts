import { FRAC } from "../constants.js";
import { decorateRandom, defineRandomState } from "../decorate/decorate.js";
import type { RandomNumberGenerator, Seed } from "../types.js";
import { normalizeSeed } from "../util.js";

/**
 * Creates a new SplitMix32 PRNG.
 *
 * This is an implementation of the SplitMix32 algorithm by G. L. Steele, D. Lea and C. H. Flood.
 *
 * @param {Seed} [seed=Date.now()] - Optional seed value (number or string). Defaults to current time if not provided.
 * @returns {DecoratedRandomFunction<number>} A new PRNG.
 */
export function createRandomSplitMix32(seed: Seed = Date.now()): RandomNumberGenerator<number> {
  let s = normalizeSeed(seed);

  function random() {
    s = (s + 0x9e3779b9) >>> 0;
    let t = s;
    t ^= t >>> 16;
    t = Math.imul(t, 0x85ebca6b) >>> 0;
    t ^= t >>> 13;
    t = Math.imul(t, 0xc2b2ae35) >>> 0;
    t ^= t >>> 16;
    return (t >>> 0) * FRAC;
  }

  return decorateRandom(
    defineRandomState<number>(
      random,
      seed,
      () => s,
      (state) => (s = state),
    ),
  );
}
