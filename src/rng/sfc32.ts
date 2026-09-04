import { decorateRandomInt32, defineRandomState } from "../decorate/decorate.js";
import type { RandomNumberGenerator, Seed } from "../types.js";
import { expandSeed } from "../seed.js";

/**
 * SFC32 internal registry state.
 */
export type SFC32State = [number, number, number, number];

/**
 * Creates a new SFC32 PRNG.
 *
 * This code is an implementation of SFC32 algorithm by Chris Doty-Humphrey.
 *
 * @param {Seed} [seed=Date.now()] - Optional seed value (number or string). Defaults to current time if not provided.
 * @returns {RandomNumberGenerator<SFC32State>} A new PRNG.
 */
export function createRandomSFC32(seed: Seed = Date.now()): RandomNumberGenerator<SFC32State> {
  let [a, b, c, d] = expandSeed(seed, 4);

  function random(): number {
    a >>>= 0;
    b >>>= 0;
    c >>>= 0;
    d >>>= 0;
    const t = (a + b + d++) | 0;
    a = b ^ (b >>> 9);
    b = (c + (c << 3)) | 0;
    c = ((c << 21) | (c >>> 11)) + t;
    return t >>> 0;
  }

  return defineRandomState<SFC32State>(
    decorateRandomInt32(random),
    seed,
    () => [a, b, c, d],
    (state) => {
      if (state.length !== 4) {
        throw new Error("Invalid SFC32 state");
      }
      [a, b, c, d] = state;
    },
  );
}
