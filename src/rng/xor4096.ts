import { decorateRandomInt32, defineRandomState } from "../decorate/decorate.js";
import type { RandomNumberGenerator, Seed } from "../types.js";
import { expandSeed } from "../seed.js";

/**
 * Xor4096 internal registry state.
 */
export type Xor4096State = [number, number[], number];

/**
 * Creates a new Xor4096 PRNG.
 *
 * This code is an implementation of Xor4096 algorithm by Richard P. Brent.
 *
 * @param {Seed} [seed=Date.now()] - Optional seed value (number or string). Defaults to current time if not provided.
 * @returns {RandomNumberGenerator<Xor4096State>} A new PRNG.
 */
export function createRandomXor4096(seed: Seed = Date.now()): RandomNumberGenerator<Xor4096State> {
  const STATE_SIZE = 128;
  const s = new Int32Array(STATE_SIZE);
  const seeds = expandSeed(seed, STATE_SIZE);
  for (let j = 0; j < STATE_SIZE; j++) {
    s[j] = seeds[j] | 0;
  }

  let i = 0;
  let w = 0;

  function random(): number {
    let t: number;
    let v: number;

    i = (i + 1) & 127;
    t = s[i];
    v = s[(i + 128 - 3) & 127];
    t ^= t << 16;
    t ^= t >>> 19;
    t ^= v ^ (v >>> 11);
    s[i] = t;
    w = (w + 0x61c88647) | 0;
    const x = t + w;
    return ((t + (x ^ (x >>> 16))) | 0) >>> 0;
  }

  return defineRandomState<Xor4096State>(
    decorateRandomInt32(random),
    seed,
    () => [w, Array.from(s), i],
    (state) => {
      if (state.length !== 3 || state[1].length !== STATE_SIZE) {
        throw new Error("Invalid Xor4096 state");
      }
      w = state[0];
      for (let j = 0; j < STATE_SIZE; j++) {
        s[j] = state[1][j];
      }
      i = state[2];
    },
  );
}
