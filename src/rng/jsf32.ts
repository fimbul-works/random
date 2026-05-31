import { FRAC } from "../constants.js";
import { decorateRandom, defineRandomState } from "../decorate/decorate.js";
import type { RandomNumberGenerator } from "../types.js";
import { expandSeed } from "../util.js";
import type { JSF32State } from "./types.js";

/**
 * Creates a new JSF32 PRNG.
 *
 * This is an implementation of the JSF32 PRNG by Bob Jenkin.
 *
 * @param {number} [seed=Date.now()] - Optional seed number. Defaults to current time if not provided.
 * @returns {RandomNumberGenerator<JSF32State>} A new PRNG.
 */
export function createJSF32(seed: number = Date.now()): RandomNumberGenerator<JSF32State> {
  let [s0, s1, s2, s3] = expandSeed(seed, 4).map((s) => s | 0);

  function random() {
    const t = (s0 - ((s1 << 27) | (s1 >>> 5))) | 0;
    s0 = s1 ^ ((s2 << 17) | (s2 >>> 15));
    s1 = (s2 + s3) | 0;
    s2 = (s3 + t) | 0;
    s3 = (s0 + t) | 0;
    return (s3 >>> 0) * FRAC;
  }

  return decorateRandom(
    defineRandomState<JSF32State>(
      random,
      seed,
      () => [s0, s1, s2, s3],
      (state) => {
        if (state.length !== 4) {
          throw new Error("Invalid JSF32 state");
        }
        [s0, s1, s2, s3] = state;
      },
    ),
  );
}
