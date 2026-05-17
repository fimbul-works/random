import type { StatefulRandomNumberGenerator } from "../types.js";
import { decorateRandom } from "../util.js";
import { FRAC } from "../constants.js";
import { createSplitMix32 } from "./splitmix32.js";

/**
 * XorShift7 internal registry state.
 */
export type XorShift7State = [number[], number];

/**
 * XorShift7 PRNG by François Panneton and Pierre L'Ecuyer.
 * Reference: https://www.iro.umontreal.ca/~lecuyer/myftp/papers/xorshift.pdf
 *
 * @param {number} seed - Seed number
 * @returns A new PRNG
 */
export const createXorShift7 = (seed: number = Date.now()): StatefulRandomNumberGenerator<XorShift7State> => {
  const x: number[] = new Array(8).fill(0);
  let i = 0;

  function random() {
    let t = x[i] >>> 0;
    t ^= t >>> 7;
    let v = (t ^ (t << 24)) >>> 0;

    t = x[(i + 1) & 7] >>> 0;
    v = (v ^ t ^ (t >>> 10)) >>> 0;

    t = x[(i + 3) & 7] >>> 0;
    v = (v ^ t ^ (t >>> 3)) >>> 0;

    t = x[(i + 4) & 7] >>> 0;
    v = (v ^ t ^ (t << 7)) >>> 0;

    t = x[(i + 7) & 7] >>> 0;
    t = (t ^ (t << 13)) >>> 0;
    v = (v ^ t ^ (t << 9)) >>> 0;

    x[i] = v >>> 0;
    i = (i + 1) & 7;

    return (v >>> 0) * FRAC;
  }

  // Warm-up
  let seedNum32: number;
  if (Number.isInteger(seed)) {
    seedNum32 = seed >>> 0;
  } else {
    const s = seed.toString();
    let h = 0x811c9dc5 >>> 0;
    for (let k = 0; k < s.length; k++) {
      h ^= s.charCodeAt(k);
      h = Math.imul(h, 0x01000193) >>> 0;
    }
    seedNum32 = h >>> 0;
  }

  const gen = createSplitMix32(seedNum32);
  for (let k = 0; k < 8; k++) {
    x[k] = gen.int() >>> 0;
  }

  for (let j = 0; j < 256; ++j) {
    random();
  }

  return decorateRandom(random, seed, {
    getState: () => [x, i],
    setState: () => (state: XorShift7State) => {
      state[0].forEach((n, k) => (x[k] = n));
      i = state[1];
    },
  });
};
