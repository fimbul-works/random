import type { RandomNumberGenerator } from "../types.js";
import { decorateRandom } from "../util.js";
import { FRAC } from "../constants.js";

/**
 * Creates a new Mulberry32 PRNG.
 *
 * @param seed - The seed value for the PRNG
 * @returns A new PRNG
 */
export function createMulberry32(seed: number = Date.now()): RandomNumberGenerator {
  function random() {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) * FRAC;
  }

  return decorateRandom(random, seed);
}
