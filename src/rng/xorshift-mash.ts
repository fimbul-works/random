import { FRAC, INT_32 } from "../constants.js";
import { decorateRandom, defineRandomState } from "../decorate/decorate.js";
import type { RandomNumberGenerator } from "../types.js";
import { normalizeSeed } from "../util.js";

/**
 * Creates a new XorshiftMash PRNG.
 *
 * This is an implementation of the XorshiftMash algorithm by George Marsaglia.
 *
 * @param {number} [seed=Date.now()] - Optional seed number. Defaults to current time if not provided.
 * @returns {RandomNumberGenerator<number>} A new PRNG.
 */
export const createRandomXorShiftMash = (seed: number = Date.now()): RandomNumberGenerator<number> => {
  let s = normalizeSeed(seed) || 1;

  function random() {
    s ^= s << 13;
    s ^= s >>> 17;
    s ^= s << 5;

    // Mash multiplier (2^32 * 2^32) / 0x100000000
    let h = 0.02519603282416938 * (s >>> 0);
    let n = h >>> 0;

    h -= n;
    h *= n;
    n = h >>> 0;
    h -= n;

    return ((n + h * INT_32) >>> 0) * FRAC;
  }

  return decorateRandom(
    defineRandomState<number>(
      random,
      seed,
      () => s,
      (state) => (s = state),
    ),
  );
};
