import type { StatefulRandomNumberGenerator } from "../types.js";
import { decorateRandom } from "../util.js";
import { FRAC } from "../constants.js";

/**
 * Tyche-i internal registry state.
 */
export type TycheiState = [number, number, number, number];

/**
 * Tyche-i PRNG by Samuel Neves and Filipe Araujo.
 * Reference: https://link.springer.com/chapter/10.1007/978-3-642-31464-3_10
 *
 * @param {number} seed - Seed number
 * @returns A new PRNG
 */
export function createTychei(seed: number = Date.now()): StatefulRandomNumberGenerator<TycheiState> {
  let r0 = 0;
  let r1 = 0;
  let r2 = 2654435769 | 0;
  let r3 = 1367130551;

  function random() {
    r1 = (r1 << 25) ^ (r1 >>> 7) ^ r2;
    r2 = (r2 - r3) | 0;
    r3 = (r3 << 24) ^ (r3 >>> 8) ^ r0;
    r0 = (r0 - r1) | 0;
    r1 = (r1 << 20) ^ (r1 >>> 12) ^ r2;
    r2 = (r2 - r3) | 0;
    r3 = ((r3 >>> 16) | (r3 << 16)) ^ r0;
    r0 = (r0 - r1) | 0;
    return (r0 >>> 0) * FRAC;
  }

  // Warm-up 1
  if (Number.isInteger(seed)) {
    const i = seed;
    r0 = (i / 0x100000000) | 0;
    r1 = i | 0;
  }

  // Warm-up 2
  const str = seed.toString();
  for (let k = 0; k < str.length + 20; k++) {
    r1 ^= str.charCodeAt(k) | 0;
    random();
  }

  return decorateRandom<StatefulRandomNumberGenerator<TycheiState>>(random, seed, {
    getState: () => [r0, r1, r2, r3],
    setState: () => (state: TycheiState) => {
      r0 = state[0];
      r1 = state[1];
      r2 = state[2];
      r3 = state[3];
    },
  });
}
