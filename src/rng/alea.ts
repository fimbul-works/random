/**
 * This code is an implementation of Alea algorithm; (C) 2010 Johannes Baagøe.
 * Alea is licensed according to the http://en.wikipedia.org/wiki/MIT_License.
 */
import type { StatefulRandomNumberGenerator } from "../types.js";
import { decorateRandom } from "../util.js";
import { FRAC } from "../constants.js";

/**
 * Alea internal registry state.
 */
export type AleaState = [number, number, number, number];

/**
 * Creates a new Alea PRNG.
 *
 * @param {number} seed - Seed number
 * @returns A new PRNG
 */
export function createAlea(seed: number = Date.now()): StatefulRandomNumberGenerator<AleaState> {
  const M1 = 0xefc8249d;
  let s = seed;
  s = s < 1 ? 1 / s : s;
  let r0 = (s >>> 0) * FRAC;
  s = (s * M1 + 1) >>> 0;
  let r1 = s * FRAC;
  s = (s * M1 + 1) >>> 0;
  let r2 = s * FRAC;
  let i = 1,
    t = 0;

  function random() {
    t = 2091639 * r0 + i * FRAC;
    r0 = r1;
    r1 = r2;
    i = t | 0;
    r2 = t - i;
    return r2;
  }

  return decorateRandom<StatefulRandomNumberGenerator<AleaState>>(random, seed, {
    getState: () => [r0, r1, r2, i],
    setState: () => (state: AleaState) => {
      r0 = state[0];
      r1 = state[1];
      r2 = state[2];
      i = state[3];
    },
  });
}
