import type { RandomNumberGenerator } from "../types.js";
import { decorateRandom } from "../util.js";
import { MASH_MULT, U32_2_POW_32 } from "./constants.js";

/**
 * xorShiftMash — A tiny stateful PRNG using xorShift mixed with Mash constants.
 * Highly deterministic and good for string-seeded procedural generation.
 * @param {number} seed - Starting internal state (defaults to the original Mash constant).
 * @returns {() => number} A stateful hash function with a `next` method.
 */
export const createXorShiftRandom = (seed: number = Date.now()): RandomNumberGenerator => {
  let x = seed >>> 0;

  function random() {
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;

    // Mix with Mash multiplier
    let h = MASH_MULT * (x >>> 0);
    let n = h >>> 0;
    h -= n;
    h *= n;
    n = h >>> 0;
    h -= n;

    return (n + h * U32_2_POW_32) >>> 0;
  }

  return decorateRandom(random, seed);
};
