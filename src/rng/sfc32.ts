import type { StatefulRandomNumberGenerator } from "../types.js";
import { decorateRandom, expand32 } from "../util.js";
import { FRAC } from "../constants.js";

/**
 * SFC32 internal registry state.
 */
export type SFC32State = [number, number, number, number];

/**
 * SFC32 (Small Fast Chaotic) PRNG by Chris Doty-Humphrey.
 * Reference: https://github.com/bryc/code/blob/master/jshash/PRNGs.md
 *
 * @param {number} seed - Seed number
 * @returns A new PRNG
 */
export function createSFC32(seed: number = Date.now()): StatefulRandomNumberGenerator<SFC32State> {
  const s = expand32(seed, 4);
  let r0 = s[0] >>> 0;
  let r1 = s[1] >>> 0;
  let r2 = s[2] >>> 0;
  let r3 = s[3] >>> 0;

  function random() {
    const t = (r0 + r1 + r3) >>> 0;
    r3 = (r3 + 1) >>> 0;
    r0 = r1 ^ (r1 >>> 9);
    r1 = (r2 + (r2 << 3)) >>> 0;
    r2 = ((r2 << 21) | (r2 >>> 11)) >>> 0;
    r2 = (r2 + t) >>> 0;
    return (t >>> 0) * FRAC;
  }

  // Warm-up
  for (let i = 0; i < 12; i++) {
    random();
  }

  return decorateRandom<StatefulRandomNumberGenerator<SFC32State>>(random, seed, {
    getState: () => [r0 >>> 0, r1 >>> 0, r2 >>> 0, r3 >>> 0],
    setState: () => (state: SFC32State) => {
      r0 = state[0] >>> 0;
      r1 = state[1] >>> 0;
      r2 = state[2] >>> 0;
      r3 = state[3] >>> 0;
    },
  });
}
