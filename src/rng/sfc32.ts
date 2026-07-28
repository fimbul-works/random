import { FRAC } from "../constants.js";
import { decorateRandom, defineRandomState } from "../decorate/decorate.js";
import type { RandomNumberGenerator, Seed } from "../types.js";
import { expandSeed } from "../util.js";

/**
 * SFC32 internal registry state.
 */
export type SFC32State = [number, number, number, number];

/**
 * Creates a new SFC32 PRNG.
 *
 * This is an implementation of the SFC32 (Small Fast Chaotic) PRNG by Chris Doty-Humphrey.
 *
 * @param {Seed} [seed=Date.now()] - Optional seed value (number or string). Defaults to current time if not provided.
 * @returns {RandomNumberGenerator<SFC32State>} A new PRNG.
 */
export function createRandomSFC32(seed: Seed = Date.now()): RandomNumberGenerator<SFC32State> {
  let [s0, s1, s2, s3] = expandSeed(seed, 4);

  function random() {
    const t = (s0 + s1 + s3) >>> 0;
    s3 = (s3 + 1) >>> 0;
    s0 = s1 ^ (s1 >>> 9);
    s1 = (s2 + (s2 << 3)) >>> 0;
    s2 = ((s2 << 21) | (s2 >>> 11)) >>> 0;
    s2 = (s2 + t) >>> 0;
    return t * FRAC;
  }

  return decorateRandom(
    defineRandomState<SFC32State>(
      random,
      seed,
      () => [s0, s1, s2, s3],
      (state) => {
        if (state.length !== 4) {
          throw new Error("Invalid SFC32 state");
        }
        [s0, s1, s2, s3] = state;
      },
    ),
  );
}
