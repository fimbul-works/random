import { FRAC } from "../constants.js";
import { decorateRandom, defineRandomState } from "../decorate/decorate.js";
import type { RandomNumberGenerator, Seed } from "../types.js";
import { expandSeed } from "../util.js";

/**
 * Tyche-i internal registry state.
 */
export type TycheiState = [number, number, number, number];

/**
 * Creates a new Tyche-i PRNG.
 *
 * This is an implementation of the Tyche-i algorithm by Samuel Neves and Filipe Araujo.
 *
 * @param {Seed} [seed=Date.now()] - Optional seed value (number or string). Defaults to current time if not provided.
 * @returns {RandomNumberGenerator<TycheiState>} A new PRNG.
 */
export function createRandomTychei(seed: Seed = Date.now()): RandomNumberGenerator<TycheiState> {
  let [s0, s1, s2, s3] = expandSeed(seed, 4);

  function random() {
    s1 = (s1 << 25) ^ (s1 >>> 7) ^ s2;
    s2 = (s2 - s3) | 0;
    s3 = (s3 << 24) ^ (s3 >>> 8) ^ s0;
    s0 = (s0 - s1) | 0;
    s1 = (s1 << 20) ^ (s1 >>> 12) ^ s2;
    s2 = (s2 - s3) | 0;
    s3 = ((s3 >>> 16) | (s3 << 16)) ^ s0;
    s0 = (s0 - s1) | 0;
    return (s0 >>> 0) * FRAC;
  }

  return decorateRandom(
    defineRandomState<TycheiState>(
      random,
      seed,
      () => [s0, s1, s2, s3],
      (state) => {
        if (state.length !== 4) {
          throw new Error("Invalid Tyche-i state");
        }
        [s0, s1, s2, s3] = state;
      },
    ),
  );
}
