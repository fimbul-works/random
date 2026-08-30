import { decorateRandomInt32, defineRandomState } from "../decorate/decorate.js";
import type { RandomNumberGenerator, Seed } from "../types.js";
import { normalizeSeed } from "../util.js";

/**
 * Creates a new Park-Miller PRNG.
 *
 * This code is an implementation of Park-Miller algorithm (MINSTD).
 *
 * @param {Seed} [seed=Date.now()] - Optional seed value (number or string). Defaults to current time if not provided.
 * @returns {RandomNumberGenerator<number>} A new PRNG.
 */
export function createRandomParkMiller(seed: Seed = Date.now()): RandomNumberGenerator<number> {
  const A = 48271;
  const M = 2147483647;

  let s = normalizeSeed(seed) % M;
  if (s <= 0) s += M - 1;

  function random(): number {
    s = (s * A) % M;
    return s >>> 0;
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
