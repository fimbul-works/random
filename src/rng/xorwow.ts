import { FRAC } from "../constants.js";
import { decorateRandom, defineRandomState } from "../decorate/decorate.js";
import type { RandomNumberGenerator } from "../types.js";
import { expandSeed } from "../util.js";

/**
 * Xorwow internal registry state.
 */
export type XorwowState = [number, number, number, number, number, number];

/**
 * Creates a new Xorwow PRNG.
 *
 * This is an implementation of the Xorwow algorithm by François Panneton and Pierre L'Ecuyer.
 *
 * @param {number} [seed=Date.now()] - Optional seed number. Defaults to current time if not provided.
 * @returns {RandomNumberGenerator<XorwowState>} A new PRNG
 */
export const createRandomXorwow = (seed: number = Date.now()): RandomNumberGenerator<XorwowState> => {
  let [s0, s1, s2, s3, s4] = expandSeed(seed, 5);
  let w = 362437 | 0;

  function random() {
    const t = (s0 ^ (s0 >>> 2)) >>> 0;
    s0 = s1 >>> 0;
    s1 = s2 >>> 0;
    s2 = s3 >>> 0;
    s3 = s4 >>> 0;
    s4 = (s4 ^ (s4 << 4) ^ (t ^ (t << 1))) >>> 0;
    w = (w + 362437) | 0;
    return (((w + s4) | 0) >>> 0) * FRAC;
  }

  return decorateRandom(
    defineRandomState<XorwowState>(
      random,
      seed,
      () => [s0, s1, s2, s3, s4, w],
      (state) => {
        if (state.length !== 6) {
          throw new Error("Invalid Xorwow state");
        }
        [s0, s1, s2, s3, s4, w] = state;
      },
    ),
  );
};
