import { FRAC } from "../constants.js";
import { decorateRandom, defineRandomState } from "../decorate/decorate.js";
import type { RandomNumberGenerator } from "../types.js";
import { expandSeed } from "../util.js";
import type { Xor4096State } from "./types.js";

/**
 * Creates a new Xor4096 PRNG.
 *
 * This is an implementation of the Xor4096 algorithm by Richard Brent.
 *
 * @param {number} [seed=Date.now()] - Optional seed number. Defaults to current time if not provided.
 * @returns {RandomNumberGenerator<Xor4096State>} A new PRNG.
 */
export function createXor4096(seed: number = Date.now()): RandomNumberGenerator<Xor4096State> {
  const S = expandSeed(seed, 129);
  const s = S.slice(0, 128).map((v) => v | 0);
  let x = S[128];
  let i = 0;

  function random() {
    x = (x + 0x61c88647) | 0;
    let t = s[(i + 34) & 127];
    i = (i + 1) & 127;
    let v = s[i];
    t ^= t << 13;
    v ^= v << 17;
    t ^= t >>> 15;
    v ^= v >>> 12;
    t = s[i] = t ^ v;
    return (((t + (x ^ (x >>> 16))) | 0) >>> 0) * FRAC;
  }

  return decorateRandom(
    defineRandomState<Xor4096State>(
      random,
      seed,
      () => [s.slice(), i, x],
      (state) => {
        if (state.length !== 3 || state[0].length !== 128) {
          throw new Error("Invalid Xor4096 state");
        }
        s.splice(0, 128, ...state[0]);
        i = state[1];
        x = state[2];
      },
    ),
  );
}
