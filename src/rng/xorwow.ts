import { decorateRandomInt32, defineRandomState } from "../decorate/decorate.js";
import type { RandomNumberGenerator, Seed } from "../types.js";
import { expandSeed } from "../util.js";

/**
 * Xorwow internal registry state: [s0, s1, s2, s3, s4, d].
 */
export type XorwowState = [number, number, number, number, number, number];

/**
 * Creates a new Xorwow PRNG.
 *
 * This code is an implementation of Xorwow algorithm by George Marsaglia.
 *
 * @param {Seed} [seed=Date.now()] - Optional seed value (number or string). Defaults to current time if not provided.
 * @returns {RandomNumberGenerator<XorwowState>} A new PRNG.
 */
export function createRandomXorwow(seed: Seed = Date.now()): RandomNumberGenerator<XorwowState> {
  let [s0, s1, s2, s3, s4, d] = expandSeed(seed, 6);

  function random(): number {
    const t = (s0 ^ (s0 >>> 2)) >>> 0;
    s0 = s1;
    s1 = s2;
    s2 = s3;
    s3 = s4;
    s4 = (s4 ^ (s4 << 4) ^ (t ^ (t << 1))) >>> 0;
    d = (d + 362437) >>> 0;
    return (d + s4) >>> 0;
  }

  return defineRandomState<XorwowState>(
    decorateRandomInt32(random),
    seed,
    () => [s0, s1, s2, s3, s4, d],
    (state) => {
      if (state.length !== 6) {
        throw new Error("Invalid Xorwow state");
      }
      [s0, s1, s2, s3, s4, d] = state;
    },
  );
}
