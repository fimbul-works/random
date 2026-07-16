import { decorateRandom, defineRandomState } from "../decorate/decorate.js";
import type { RandomNumberGenerator } from "../types.js";
import { normalizeSeed } from "../util.js";

/**
 * Creates a new Park-Miller LCG (MINSTD) PRNG.
 *
 * This is an implementation of the Park-Miller LGC (MINSTD) algorithm by Stephen K. Park and Keith W. Miller.
 *
 * @param {number} [seed=Date.now()] - Optional seed number. Defaults to current time if not provided.
 * @returns {RandomNumberGenerator<number>} A new PRNG.
 */
export function createRandomParkMiller(seed: number = Date.now()): RandomNumberGenerator<number> {
  const M = 0x7fffffff;
  const MFRAC = 1 / M;
  const mapped = ((normalizeSeed(seed) % (M - 1)) + (M - 1)) % (M - 1);

  let s = (mapped + 1) >>> 0;

  function random() {
    s = ((48271 * s) % M) | 0;
    return s * MFRAC;
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
