import { FRAC } from "../constants.js";
import { decorateRandom, defineRandomState } from "../decorate/decorate.js";
import type { RandomNumberGenerator } from "../types.js";
import { expandSeed } from "../util.js";
import type { Xor128State } from "./types.js";

/**
 * Creates a new Xor128 PRNG.
 *
 * This is an implementation of the Xor128 algorithm by George Marsaglia.
 *
 * @param {number} [seed=Date.now()] - Optional seed number. Defaults to current time if not provided.
 * @returns {RandomNumberGenerator<Xor128State>} A new PRNG.
 */
export function createXor128(seed: number = Date.now()): RandomNumberGenerator<Xor128State> {
  let [s0, s1, s2, s3] = expandSeed(seed, 4);

  function random() {
    const t = (s0 ^ (s0 << 11)) >>> 0;
    s0 = s1 >>> 0;
    s1 = s2 >>> 0;
    s2 = s3 >>> 0;
    s3 = (s3 ^ ((s3 >>> 19) ^ t ^ (t >>> 8))) >>> 0;
    return s3 * FRAC;
  }

  return decorateRandom(
    defineRandomState<Xor128State>(
      random,
      seed,
      () => [s0, s1, s2, s3],
      (state) => {
        if (state.length !== 4) {
          throw new Error("Invalid Xor128 state");
        }
        [s0, s1, s2, s3] = state;
      },
    ),
  );
}
