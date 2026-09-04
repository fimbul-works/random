import { INT_32 } from "../constants.js";
import { decorateRandomInt32, defineRandomState } from "../decorate/decorate.js";
import type { RandomNumberGenerator, Seed } from "../types.js";
import { normalizeSeed } from "../seed.js";

/**
 * Creates a new XorShiftMash PRNG.
 *
 * This code is an implementation of XorShiftMash algorithm.
 *
 * @param {Seed} [seed=Date.now()] - Optional seed value (number or string). Defaults to current time if not provided.
 * @returns {RandomNumberGenerator<number>} A new PRNG.
 */
export function createRandomXorShiftMash(seed: Seed = Date.now()): RandomNumberGenerator<number> {
  let s = normalizeSeed(seed);

  function random(): number {
    let n = 0xefc8249d;
    let h = 0;

    s = (s + 0x9e3779b9) | 0;
    n += s;
    h = 0.02519603282416938 * n;
    n = h >>> 0;
    h -= n;
    h *= n;
    n = h >>> 0;
    h -= n;
    n += h * 0x100000000;

    return (n + h * INT_32) >>> 0;
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
