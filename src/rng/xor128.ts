import type { StatefulRandomNumberGenerator } from "../types.js";
import { decorateRandom, nonZeroVector32 } from "../util.js";
import { FRAC } from "../constants.js";

/**
 * Xor128 internal registry state.
 */
export type Xor128State = [number, number, number, number];

/**
 * Xor128 PRNG by George Marsaglia.
 * Reference: https://doi.org/10.18637/jss.v008.i14
 * Reference: https://www.semanticscholar.org/paper/Xorshift-RNGs-RNGs-Marsaglia/2f8b197c3b34d86478f1eaed1fb61f5b1c556fa5
 * Reference: https://vigna.di.unimi.it/ftp/papers/xorshift.pdf
 *
 * @param {number} seed - Seed number
 * @returns A new PRNG
 */
export function createXor128(seed: number = Date.now()): StatefulRandomNumberGenerator<Xor128State> {
  const s = nonZeroVector32(seed, 4);
  let r0 = s[0] >>> 0;
  let r1 = s[1] >>> 0;
  let r2 = s[2] >>> 0;
  let r3 = s[3] >>> 0;

  function random() {
    const t = (r0 ^ (r0 << 11)) >>> 0;
    r0 = r1 >>> 0;
    r1 = r2 >>> 0;
    r2 = r3 >>> 0;
    r3 = (r3 ^ ((r3 >>> 19) ^ t ^ (t >>> 8))) >>> 0;
    return (r3 >>> 0) * FRAC;
  }

  // Warm-up
  for (let i = 0; i < 64; i++) {
    random();
  }

  return decorateRandom<StatefulRandomNumberGenerator<Xor128State>>(random, seed, {
    getState: () => [r0 >>> 0, r1 >>> 0, r2 >>> 0, r3 >>> 0],
    setState: () => (state: Xor128State) => {
      r0 = state[0] >>> 0;
      r1 = state[1] >>> 0;
      r2 = state[2] >>> 0;
      r3 = state[3] >>> 0;
    },
  });
}
