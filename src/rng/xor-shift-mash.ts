import type { RandomNumberGenerator } from "../types.js";
import { decorateRandom } from "../util.js";
import { FRAC, INT_32 } from "../constants.js";

/**
 * XorShiftMash — A tiny stateful PRNG using xorShift mixed with Mash constants.
 * Highly deterministic and good for string-seeded procedural generation.
 *
 * @param {number} seed - Seed number
 * @returns A new PRNG
 */
export const createXorShiftMash = (seed: number = Date.now()): RandomNumberGenerator => {
  let x = seed >>> 0;

  function random() {
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;

    // Mix with Mash multiplier (2^32 * 2^32 / 0x100000000)
    let h = 0.02519603282416938 * (x >>> 0);
    let n = h >>> 0;
    h -= n;
    h *= n;
    n = h >>> 0;
    h -= n;

    return ((n + h * INT_32) >>> 0) * FRAC;
  }

  return decorateRandom(random, seed);
};
