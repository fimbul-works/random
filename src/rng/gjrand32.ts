import { decorateRandomInt32, defineRandomState } from "../decorate/decorate.js";
import type { RandomNumberGenerator, Seed } from "../types.js";
import { expandSeed } from "../seed.js";

/**
 * GJRand32 internal registry state.
 */
export type GJRand32State = [number, number, number, number];

/**
 * Creates a new GJrand32 PRNG.
 *
 * This is an implementation based on the work of David Blackman.
 *
 * @param {Seed} [seed=Date.now()] - Optional seed value (number or string). Defaults to current time if not provided.
 * @returns {RandomNumberGenerator<GJRand32State>} A new PRNG.
 */
export function createRandomGJRand32(seed: Seed = Date.now()): RandomNumberGenerator<GJRand32State> {
  let [s0, s1, s2, s3] = expandSeed(seed, 4).map((s) => s | 0);

  function random() {
    s0 = (s0 << 16) | (s0 >>> 16);
    s1 = (s1 + s2) | 0;
    s0 = (s0 + s1) | 0;
    s2 = s2 ^ s1;
    s2 = (s2 << 11) | (s2 >>> 21);
    s1 = s1 ^ s0;
    s0 = (s0 + s2) | 0;
    s1 = (s2 << 19) | (s2 >>> 13);
    s2 = (s2 + s0) | 0;
    s3 = (s3 + 0x96a5) | 0;
    s1 = (s1 + s3) | 0;
    return s0 >>> 0;
  }

  return defineRandomState<GJRand32State>(
    decorateRandomInt32(random),
    seed,
    () => [s0, s1, s2, s3],
    (state) => {
      if (state.length !== 4) {
        throw new Error("Invalid GJRand32 state");
      }
      [s0, s1, s2, s3] = state;
    },
  );
}
