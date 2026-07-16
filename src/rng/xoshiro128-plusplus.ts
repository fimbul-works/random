import { FRAC } from "../constants.js";
import { decorateRandom, defineRandomState } from "../decorate/decorate.js";
import type { RandomNumberGenerator } from "../types.js";
import { expandSeed, rotl } from "../util.js";

/**
 * Xoshiro128+ internal registry state.
 */
export type Xoshiro128PlusPlusState = [number, number, number, number];

/**
 * Creates a new Xoshiro128++ PRNG.
 *
 * This is an implementation of the Xoshiro128++ algorithm by David Blackman and Sebastiano Vigna.
 *
 * @param {number} [seed=Date.now()] - Optional seed number. Defaults to current time if not provided.
 * @returns {RandomNumberGenerator<Xoshiro128PlusPlusState>} A new PRNG.
 */
export function createRandomXoshiro128PlusPlus(
  seed: number = Date.now(),
): RandomNumberGenerator<Xoshiro128PlusPlusState> {
  let [s0, s1, s2, s3] = expandSeed(seed, 4);

  function random() {
    const result = (rotl((s1 * 5) >>> 0, 7) * 9) >>> 0;
    const t = (s1 << 9) >>> 0;
    s2 ^= s0 >>> 0;
    s3 ^= s1 >>> 0;
    s1 ^= s2 >>> 0;
    s0 ^= s3 >>> 0;
    s2 ^= t;
    s3 = rotl(s3, 11);
    return result * FRAC;
  }

  return decorateRandom(
    defineRandomState<Xoshiro128PlusPlusState>(
      random,
      seed,
      () => [s0, s1, s2, s3],
      (state) => {
        if (state.length !== 4) {
          throw new Error("Invalid Xoshiro128++ state");
        }
        [s0, s1, s2, s3] = state;
      },
    ),
  );
}
