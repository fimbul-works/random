import type { StatefulRandomNumberGenerator } from "../types.js";
import { decorateRandom, nonZeroVector32 } from "../util.js";
import { FRAC } from "../constants.js";

/**
 * XorWow internal registry state.
 */
export type XorWowState = [number, number, number, number, number, number];

/**
 * XorWow PRNG by François Panneton and Pierre L'Ecuyer.
 * Reference: https://www.iro.umontreal.ca/~lecuyer/myftp/papers/xorshift.pdf
 *
 * @param {number} seed - Seed number
 * @returns A new PRNG
 */
export const createXorWow = (seed: number = Date.now()): StatefulRandomNumberGenerator<XorWowState> => {
  const W = 362437;
  const s = nonZeroVector32(seed, 5);
  let r0 = s[0] >>> 0;
  let r1 = s[1] >>> 0;
  let r2 = s[2] >>> 0;
  let r3 = s[3] >>> 0;
  let r4 = s[4] >>> 0;
  let w = W | 0;

  function random() {
    const t = (r0 ^ (r0 >>> 2)) >>> 0;
    r0 = r1 >>> 0;
    r1 = r2 >>> 0;
    r2 = r3 >>> 0;
    r3 = r4 >>> 0;
    r4 = (r4 ^ (r4 << 4) ^ (t ^ (t << 1))) >>> 0;
    w = (w + W) | 0;
    return (((w + r4) | 0) >>> 0) * FRAC;
  }

  // Warm-up
  for (let i = 0; i < 64; i++) {
    random();
  }

  return decorateRandom<StatefulRandomNumberGenerator<XorWowState>>(random, seed, {
    getState: () => [r0, r1, r2, r3, r4, w],
    setState: () => (state: XorWowState) => {
      r0 = state[0];
      r1 = state[1];
      r2 = state[2];
      r3 = state[3];
      r4 = state[4];
      w = state[5];
    },
  });
};
