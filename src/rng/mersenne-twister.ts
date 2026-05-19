import { FRAC } from "../constants.js";
import { decorateRandom, defineRandomState } from "../decorate/decorate.js";
import type { RandomNumberGenerator } from "../types.js";
import type { MersenneTwisterState } from "./types.js";

/**
 * Creates a new Mersenne Twister PRNG.
 *
 * This code is an implementation of the Mersenne Twister algorithm by Makoto Matsumoto and Takuji Nishimura.
 *
 * @param {number} [seed=Date.now()] - Optional seed number. Defaults to current time if not provided.
 * @returns {RandomFunction<MersenneTwisterState>} A new PRNG.
 */
export function createMersenneTwister(seed: number = Date.now()): RandomNumberGenerator<MersenneTwisterState> {
  const LOWER_MASK = 0x7fffffff;
  const UPPER_MASK = 0x80000000;
  const MAG = [0, 0x9908b0df];
  const N = 624;
  const M = 397;

  const s: number[] = new Array(N);
  let i = N + 1;

  const initialize = (seed: number) => {
    s[0] = seed >>> 0;
    for (i = 1; i < N; i++) {
      seed = s[i - 1] ^ (s[i - 1] >>> 30);
      s[i] = ((((seed & 0xffff0000) >>> 16) * 1812433253) << 16) + (seed & 0x0000ffff) * 1812433253 + i;
      s[i] >>>= 0;
    }
  };

  function random(): number {
    let y: number;
    let kk: number;

    if (i >= N) {
      if (i === N + 1) {
        initialize(5489);
      }

      for (kk = 0; kk < N - M; kk++) {
        y = (s[kk] & UPPER_MASK) | (s[kk + 1] & LOWER_MASK);
        s[kk] = s[kk + M] ^ (y >>> 1) ^ MAG[y & 0x1];
      }

      for (; kk < N - 1; kk++) {
        y = (s[kk] & UPPER_MASK) | (s[kk + 1] & LOWER_MASK);
        s[kk] = s[kk + (M - N)] ^ (y >>> 1) ^ MAG[y & 0x1];
      }

      y = (s[N - 1] & UPPER_MASK) | (s[0] & LOWER_MASK);
      s[N - 1] = s[M - 1] ^ (y >>> 1) ^ MAG[y & 0x1];

      i = 0;
    }

    y = s[i++];

    y ^= y >>> 11;
    y ^= (y << 7) & 0x9d2c5680;
    y ^= (y << 15) & 0xefc60000;
    y ^= y >>> 18;

    return (y >>> 0) * FRAC;
  }

  initialize(seed);

  return decorateRandom(
    defineRandomState<MersenneTwisterState>(
      random,
      seed,
      () => [s.slice(), i],
      (state) => {
        if (state.length !== 2 || state[0].length !== N) {
          throw new Error("Invalid Mersenne Twister state");
        }
        s.splice(0, N, ...state[0]);
        i = state[1];
      },
    ),
  );
}
