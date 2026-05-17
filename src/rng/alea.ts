/**
 * This code is an implementation of Alea algorithm; (C) 2010 Johannes Baagøe.
 * Alea is licensed according to the http://en.wikipedia.org/wiki/MIT_License.
 */

import type { StatefulRandomNumberGenerator } from "../types.js";
import { decorateRandom } from "../util.js";
import { FRAC } from "./constants.js";

const MAGIC1 = 69069;
const MAGIC2 = 2091639;

/**
 * Alea internal registry state.
 */
export type AleaState = [number, number, number, number];

/**
 * Creates a new Alea random number generator.
 *
 * @param {number} seed - Seed number
 * @returns A new random number generator
 */
export function createRandomAlea(seed: number = Date.now()): StatefulRandomNumberGenerator<AleaState> {
  let r0: number,
    r1: number,
    r2: number,
    i: number,
    t: number,
    mutableSeed = seed;
  mutableSeed = mutableSeed < 1 ? 1 / mutableSeed : mutableSeed;
  r0 = (mutableSeed >>> 0) * FRAC;
  mutableSeed = (mutableSeed * MAGIC1 + 1) >>> 0;
  r1 = mutableSeed * FRAC;
  mutableSeed = (mutableSeed * MAGIC1 + 1) >>> 0;
  r2 = mutableSeed * FRAC;
  i = 1;

  function random() {
    t = MAGIC2 * r0 + i * FRAC;
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
