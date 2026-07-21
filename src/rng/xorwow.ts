import { FRAC } from "../constants.js";
import { decorateRandom, defineRandomState } from "../decorate/decorate.js";
import type { RandomNumberGenerator, Seed } from "../types.js";
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
 * @param {Seed} [seed=Date.now()] - Optional seed value (number or string). Defaults to current time if not provided.
 * @returns {RandomNumberGenerator<XorwowState>} A new PRNG
 */
export const createRandomXorwow = (seed: Seed = Date.now()): RandomNumberGenerator<XorwowState> => {
  let [s0, s1, s2, s3, s4] = expandSeed(seed, 5);
  let w = 0;

  function random() {
    const t = s0 ^ (s0 >>> 2);
    s0 = s1;
    s1 = s2;
    s2 = s3;
    s3 = s4;
    s4 = s4 ^ (s4 << 4) ^ (t ^ (t << 1));
    w = (w + 362437) >>> 0;
    return ((w + s4) >>> 0) * FRAC;
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
