import type { StatefulRandomNumberGenerator } from "../types.js";
import { decorateRandom, expand32, rotl } from "../util.js";
import { FRAC } from "../constants.js";

/**
 * Xiroshiro-128 internal registry state.
 */
export type Xiroshiro128State = [number, number, number, number];

/**
 * Xoshiro128+ PRNG by David Blackman and Sebastiano Vigna.
 * Reference: https://prng.di.unimi.it/xoshiro128plus.c
 *
 * @param {number} seed - Seed number
 * @returns A new PRNG
 */
export function createXoshiro128Plus(
  seed: number = Date.now(),
): StatefulRandomNumberGenerator<Xiroshiro128State> {
  const s = expand32(seed, 4);
  let r0: number = s[0] >>> 0;
  let r1: number = s[1] >>> 0;
  let r2: number = s[2] >>> 0;
  let r3: number = s[3] >>> 0;

  // Avoid all-zero state
  if ((r0 | r1 | r2 | r3) === 0) {
    r0 = 1;
  }

  function random() {
    const result = (r0 + r3) >>> 0;
    const t = (r1 << 9) >>> 0;
    r2 ^= r0;
    r3 ^= r1;
    r1 ^= r2;
    r0 ^= r3;
    r2 ^= t;
    r3 = rotl(r3, 11);
    return (result >>> 0) * FRAC;
  }

  // Warm-up
  for (let i = 0; i < 16; i++) {
    random();
  }

  return decorateRandom<StatefulRandomNumberGenerator<Xiroshiro128State>>(random, seed, {
    getState: () => [r0, r1, r2, r3],
    setState: () => (state: Xiroshiro128State) => {
      r0 = state[0];
      r1 = state[1];
      r2 = state[2];
      r3 = state[3];
    },
  });
}
