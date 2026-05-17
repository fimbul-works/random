import type { RandomNumberGenerator } from "../types.js";
import { decorateRandom } from "../util.js";

/**
 * Creates a new Mulberry32 random number generator.
 *
 * @param seed - The seed value for the random number generator
 * @returns A new random number generator
 */
export function mulberry32(seed: number = Date.now()): RandomNumberGenerator {
  function random() {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  return decorateRandom(random, seed);
}
