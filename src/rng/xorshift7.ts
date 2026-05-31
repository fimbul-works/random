import { FRAC } from "../constants.js";
import { decorateRandom, defineRandomState } from "../decorate/decorate.js";
import type { RandomNumberGenerator } from "../types.js";
import { expandSeed } from "../util.js";
import type { Xorshift7State } from "./types.js";

/**
 * Creates a new Xorshift7 PRNG.
 *
 * This is an implementation of the XorShift7 algorithm by François Panneton and Pierre L'Ecuyer.
 *
 * @param {number} [seed=Date.now()] - Optional seed number. Defaults to current time if not provided.
 * @returns {RandomNumberGenerator<Xorshift7State>} A new PRNG.
 */
export const createXorshift7 = (seed: number = Date.now()): RandomNumberGenerator<Xorshift7State> => {
  const s = expandSeed(seed, 8);
  let i = 0;

  function random() {
    let t = s[i] >>> 0;
    t ^= t >>> 7;
    let v = (t ^ (t << 24)) >>> 0;

    t = s[(i + 1) & 7] >>> 0;
    v = (v ^ t ^ (t >>> 10)) >>> 0;

    t = s[(i + 3) & 7] >>> 0;
    v = (v ^ t ^ (t >>> 3)) >>> 0;

    t = s[(i + 4) & 7] >>> 0;
    v = (v ^ t ^ (t << 7)) >>> 0;

    t = s[(i + 7) & 7] >>> 0;
    t = (t ^ (t << 13)) >>> 0;
    v = (v ^ t ^ (t << 9)) >>> 0;

    s[i] = v >>> 0;
    i = (i + 1) & 7;

    return (v >>> 0) * FRAC;
  }

  return decorateRandom(
    defineRandomState<Xorshift7State>(
      random,
      seed,
      () => [s.slice(), i],
      (state) => {
        if (state.length !== 2 || state[0].length !== 8) {
          throw new Error("Invalid Xorshift7 state");
        }
        s.splice(0, 8, ...state[0]);
        i = state[1] & 7;
      },
    ),
  );
};
