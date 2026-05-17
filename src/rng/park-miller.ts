import type { StatefulRandomNumberGenerator } from "../types.js";
import { decorateRandom } from "../util.js";

/**
 * Park-Miller LCG (MINSTD) PRNG.
 * Reference: https://en.wikipedia.org/wiki/Lehmer_random_number_generator
 * Reference: https://www.firstpr.com.au/dsp/rand31/
 *
 * @param {number} seed - Seed number
 * @returns A new PRNG
 */
export function createParkMiller(seed: number = Date.now()): StatefulRandomNumberGenerator<number> {
  // Park–Miller LCG (MINSTD) modulus M = 0x7fffffff (2147483647)
  const M = 2 ** 31 - 1;
  const MFRAC = 1 / M;
  const mapped = ((seed % (M - 1)) + (M - 1)) % (M - 1);
  let s = (mapped + 1) >>> 0;

  function random() {
    // In range [1, M-1] at 53-bit integer precision
    s = ((48271 * s) % M || 1) | 0;
    return s * MFRAC;
  }

  return decorateRandom<StatefulRandomNumberGenerator<number>>(random, seed, {
    getState: () => s,
    setState: () => (state: number) => {
      let x = Math.trunc(state);
      x = ((x % M) + M) % M;
      s = x === 0 ? 1 : x;
    },
  });
}
