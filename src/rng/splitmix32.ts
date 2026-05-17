import type { RandomNumberGenerator } from "../types.js";
import { decorateRandom } from "../util.js";
import { FRAC } from "../constants.js";

/**
 * Creates a new SplitMix32 PRNG.
 *
 * @param {number} seed - Seed number
 * @returns A new PRNG
 */
export function createSplitMix32(seed: number = Date.now()): RandomNumberGenerator {
  let s = seed;

  function random() {
    s = (s + 0x9e3779b9) >>> 0;
    let v = s >>> 0;
    v ^= v >>> 16;
    v = Math.imul(v, 0x85ebca6b) >>> 0;
    v ^= v >>> 13;
    v = Math.imul(v, 0xc2b2ae35) >>> 0;
    v ^= v >>> 16;
    return (v >>> 0) * FRAC;
  }

  return decorateRandom(random, seed);
}
