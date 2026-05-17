/**
 * This code is an implementation of the Mersenne Twister algorithm.
 * Based on the original implementation by Makoto Matsumoto and Takuji Nishimura.
 */
import type { StatefulRandomNumberGenerator } from "../types.js";
import { decorateRandom } from "../util.js";
import { FRAC } from "../constants.js";

/**
 * Mersenne Twister internal state (state and state index).
 */
export type MersenneTwisterState = [number[], number];

/**
 * Creates a new Mersenne Twister PRNG.
 * @param {number} seed - Seed number
 * @returns A new PRNG
 */
export function createMersenneTwister(
  seed: number = Date.now(),
): StatefulRandomNumberGenerator<MersenneTwisterState> {
  const N = 624;
  const M = 397;
  const MATRIX_A = 0x9908b0df;
  const UPPER_MASK = 0x80000000;
  const LOWER_MASK = 0x7fffffff;

  const state = new Array(N);
  let stateIndex = N + 1;

  /**
   * Initializes the generator with a seed.
   * @param s - The seed to initialize with.
   */
  const initRandom = (s: number) => {
    state[0] = s >>> 0;
    for (stateIndex = 1; stateIndex < N; stateIndex++) {
      s = state[stateIndex - 1] ^ (state[stateIndex - 1] >>> 30);
      state[stateIndex] = ((((s & 0xffff0000) >>> 16) * 1812433253) << 16) + (s & 0x0000ffff) * 1812433253 + stateIndex;
      state[stateIndex] >>>= 0;
    }
  };

  const next = (): number => {
    let y: number;
    const mag01 = [0x0, MATRIX_A];

    if (stateIndex >= N) {
      let kk: number;

      if (stateIndex === N + 1) {
        initRandom(5489);
      }

      for (kk = 0; kk < N - M; kk++) {
        y = (state[kk] & UPPER_MASK) | (state[kk + 1] & LOWER_MASK);
        state[kk] = state[kk + M] ^ (y >>> 1) ^ mag01[y & 0x1];
      }
      for (; kk < N - 1; kk++) {
        y = (state[kk] & UPPER_MASK) | (state[kk + 1] & LOWER_MASK);
        state[kk] = state[kk + (M - N)] ^ (y >>> 1) ^ mag01[y & 0x1];
      }
      y = (state[N - 1] & UPPER_MASK) | (state[0] & LOWER_MASK);
      state[N - 1] = state[M - 1] ^ (y >>> 1) ^ mag01[y & 0x1];

      stateIndex = 0;
    }

    y = state[stateIndex++];

    y ^= y >>> 11;
    y ^= (y << 7) & 0x9d2c5680;
    y ^= (y << 15) & 0xefc60000;
    y ^= y >>> 18;

    return y >>> 0;
  };

  initRandom(seed);

  function random(): number {
    return next() * FRAC;
  }

  return decorateRandom<StatefulRandomNumberGenerator<MersenneTwisterState>>(random, seed, {
    getState: () => [state.slice(), stateIndex],
    setState: () => (state: MersenneTwisterState) => {
      if (state[0].length !== N) {
        throw new Error("Invalid Mersenne Twister state");
      }
      state.splice(0, state.length, ...state[0]);
      stateIndex = state[1];
    },
  });
}
