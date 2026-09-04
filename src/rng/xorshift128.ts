import { decorateRandomInt32, defineRandomState } from "../decorate/decorate.js";
import type { RandomNumberGenerator, Seed } from "../types.js";
import { expandSeed } from "../seed.js";

/**
 * Xorshift128 internal registry state: [s0, s1, s2, s3].
 */
export type Xorshift128State = [number, number, number, number];

/**
 * Creates a new Xorshift128 PRNG.
 *
 * This code is an implementation of Xorshift128 algorithm by George Marsaglia.
 *
 * @param {Seed} [seed=Date.now()] - Optional seed value (number or string). Defaults to current time if not provided.
 * @returns {RandomNumberGenerator<Xorshift128State>} A new PRNG.
 */
export function createRandomXorshift128(seed: Seed = Date.now()): RandomNumberGenerator<Xorshift128State> {
  let [s0, s1, s2, s3] = expandSeed(seed, 4);

  function random(): number {
    const t = s0 ^ (s0 << 11);
    s0 = s1;
    s1 = s2;
    s2 = s3;
    s3 = s3 ^ (s3 >>> 19) ^ (t ^ (t >>> 8));
    return s3 >>> 0;
  }

  return defineRandomState<Xorshift128State>(
    decorateRandomInt32(random),
    seed,
    () => [s0, s1, s2, s3],
    (state) => {
      if (state.length !== 4) {
        throw new Error("Invalid Xorshift128 state");
      }
      [s0, s1, s2, s3] = state;
    },
  );
}
