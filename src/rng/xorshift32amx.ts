import { decorateRandomInt32, defineRandomState } from "../decorate/decorate.js";
import type { RandomNumberGenerator, Seed } from "../types.js";
import { normalizeSeed } from "../seed.js";

/**
 * Creates a new Xorshift32AMX PRNG.
 *
 * This code is an implementation of Xorshift32AMX algorithm by George Marsaglia.
 *
 * @param {Seed} [seed=Date.now()] - Optional seed value (number or string). Defaults to current time if not provided.
 * @returns {RandomNumberGenerator<number>} A new PRNG.
 */
export function createRandomXorshift32AMX(seed: Seed = Date.now()): RandomNumberGenerator<number> {
  let s = normalizeSeed(seed);

  function random(): number {
    let t = s;
    t ^= t << 13;
    t ^= t >>> 17;
    t ^= t << 5;
    s = (s + 0x9e3779b9) | 0;
    return (s + t) >>> 0;
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
