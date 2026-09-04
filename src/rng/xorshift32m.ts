import { decorateRandomInt32, defineRandomState } from "../decorate/decorate.js";
import type { RandomNumberGenerator, Seed } from "../types.js";
import { normalizeSeed } from "../seed.js";

/**
 * Creates a new Xorshift32M PRNG.
 *
 * This code is an implementation of Xorshift32M algorithm by George Marsaglia.
 *
 * @param {Seed} [seed=Date.now()] - Optional seed value (number or string). Defaults to current time if not provided.
 * @returns {RandomNumberGenerator<number>} A new PRNG.
 */
export function createRandomXorshift32M(seed: Seed = Date.now()): RandomNumberGenerator<number> {
  let s = normalizeSeed(seed);

  function random(): number {
    s ^= (s << 13) | 0;
    s ^= s >>> 17;
    s ^= (s << 5) | 0;
    return Math.imul(s, 0x5f356495) >>> 0;
  }

  return defineRandomState<number>(
    decorateRandomInt32(random),
    seed,
    () => s,
    (state) => {
      s = state;
    },
  );
}
