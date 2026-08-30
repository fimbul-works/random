import { decorateRandomInt32, defineRandomState } from "../decorate/decorate.js";
import type { RandomNumberGenerator, Seed } from "../types.js";
import { normalizeSeed } from "../util.js";

/**
 * Mersenne Twister internal registry state.
 */
export type MersenneTwisterState = [number[], number];

/**
 * Creates a new Mersenne Twister PRNG.
 *
 * This code is an implementation of MT19937 algorithm by Makoto Matsumoto and Takuji Nishimura.
 *
 * @param {Seed} [seed=Date.now()] - Optional seed value (number or string). Defaults to current time if not provided.
 * @returns {RandomNumberGenerator<MersenneTwisterState>} A new PRNG.
 */
export function createRandomMersenneTwister(seed: Seed = Date.now()): RandomNumberGenerator<MersenneTwisterState> {
  const N = 624;
  const M = 397;
  const MATRIX_A = 0x9908b0df;
  const UPPER_MASK = 0x80000000;
  const LOWER_MASK = 0x7fffffff;

  let mt = new Int32Array(N);
  let mti = N + 1;

  function initialize(seed: number) {
    mt[0] = seed | 0;
    for (mti = 1; mti < N; mti++) {
      const s = mt[mti - 1] ^ (mt[mti - 1] >>> 30);
      mt[mti] = (Math.imul(1812433253, s) + mti) | 0;
    }
  }

  function twist() {
    const mag01 = [0x0, MATRIX_A];
    let y: number;
    let kk: number;

    for (kk = 0; kk < N - M; kk++) {
      y = (mt[kk] & UPPER_MASK) | (mt[kk + 1] & LOWER_MASK);
      mt[kk] = mt[kk + M] ^ (y >>> 1) ^ mag01[y & 0x1];
    }
    for (; kk < N - 1; kk++) {
      y = (mt[kk] & UPPER_MASK) | (mt[kk + 1] & LOWER_MASK);
      mt[kk] = mt[kk + (M - N)] ^ (y >>> 1) ^ mag01[y & 0x1];
    }
    y = (mt[N - 1] & UPPER_MASK) | (mt[0] & LOWER_MASK);
    mt[N - 1] = mt[M - 1] ^ (y >>> 1) ^ mag01[y & 0x1];

    mti = 0;
  }

  function random(): number {
    if (mti >= N) {
      if (mti === N + 1) {
        initialize(5489);
      }
      twist();
    }

    let y = mt[mti++];
    y ^= y >>> 11;
    y ^= (y << 7) & 0x9d2c5680;
    y ^= (y << 15) & 0xefc60000;
    y ^= y >>> 18;

    return y >>> 0;
  }

  initialize(normalizeSeed(seed));

  return defineRandomState<MersenneTwisterState>(
    decorateRandomInt32(random),
    seed,
    () => [Array.from(mt), mti],
    (state) => {
      if (state.length !== 2 || state[0].length !== N) {
        throw new Error("Invalid Mersenne Twister state");
      }
      mt = new Int32Array(state[0]);
      mti = state[1];
    },
  );
}
