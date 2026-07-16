import { FRAC } from "../constants.js";
import { decorateRandom, defineRandomState } from "../decorate/decorate.js";
import type { RandomNumberGenerator } from "../types.js";
import { normalizeSeed } from "../util.js";

/**
 * Creates a new Xorshift32 PRNG.
 *
 * This is an implementation of the Xorshift32 algorithm by George Marsaglia.
 *
 * @param {number} [seed=Date.now()] - Optional seed number. Defaults to current time if not provided.
 * @returns {RandomNumberGenerator<number>} A new PRNG.
 */
export function createRandomXorshift32(seed: number = Date.now()): RandomNumberGenerator<number> {
  let s = normalizeSeed(seed);

  function random() {
    s ^= s << 13;
    s ^= s >>> 17;
    s ^= s << 5;
    return (s >>> 0) * FRAC;
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
