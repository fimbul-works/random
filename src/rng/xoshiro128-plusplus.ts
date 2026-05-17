import type { StatefulRandomNumberGenerator } from "../types.js";
import { decorateRandom, expand32From64, rotl } from "../util.js";
import { U32_2_POW_32 } from "./constants";
import type { Xiroshiro128State } from "./xoshiro128-plus.js";

/**
 * Xoshiro128++ PRNG by David Blackman and Sebastiano Vigna.
 * Reference: https://prng.di.unimi.it/xoshiro128plusplus.c
 *
 * @param {number} seed - Seed number
 * @returns A new random number generator
 */
export function createXoshiro128PlusPlus(seed: number = Date.now()): StatefulRandomNumberGenerator<Xiroshiro128State> {
  const s = expand32From64(seed, 4);
  let s0: number = s[0] >>> 0;
  let s1: number = s[1] >>> 0;
  let s2: number = s[2] >>> 0;
  let s3: number = s[3] >>> 0;

  // Avoid all-zero state
  if ((s0 | s1 | s2 | s3) === 0) {
    s0 = 1;
  }

  const next = (): number => {
    const result = (rotl((s1 * 5) >>> 0, 7) * 9) >>> 0;
    const t = (s1 << 9) >>> 0;
    s2 ^= s0;
    s3 ^= s1;
    s1 ^= s2;
    s0 ^= s3;
    s2 ^= t;
    s3 = rotl(s3, 11);
    return result >>> 0;
  };

  function random() {
    return next() / U32_2_POW_32;
  }

  // Warm-up
  for (let i = 0; i < 16; i++) {
    next();
  }

  return decorateRandom<StatefulRandomNumberGenerator<Xiroshiro128State>>(random, seed, {
    getState: () => [s0, s1, s2, s3],
    setState: () => (state: Xiroshiro128State) => {
      s0 = state[0];
      s1 = state[1];
      s2 = state[2];
      s3 = state[3];
    },
  });
}
