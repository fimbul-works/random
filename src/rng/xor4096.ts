import type { StatefulRandomNumberGenerator } from "../types.js";
import { decorateRandom } from "../util.js";
import { FRAC } from "../constants.js";

/**
 * Xor4096 internal registry state.
 */
export type Xor4096State = [number, number[], number];

/**
 * Xor4096 PRNG by Richard Brent.
 * Reference: https://github.com/davidbau/seedrandom
 *
 * @param {number} seed - Seed number
 * @returns A new PRNG
 */
export function createXor4096(seed: number = Date.now()): StatefulRandomNumberGenerator<Xor4096State> {
  let a: number;
  let b: number[];
  let c: number;

  function random() {
    // Update Weyl generator
    a = (a + 0x61c88647) | 0;

    // Update XOR generator
    let v = b[(c + 34) & 127];
    c = (c + 1) & 127;
    let t = b[c];
    v ^= v << 13;
    t ^= t << 17;
    v ^= v >>> 15;
    t ^= t >>> 12;

    // Update XOR generator array state
    v = b[c] = v ^ t;

    // Result is the combination
    return (((v + (a ^ (a >>> 16))) | 0) >>> 0) * FRAC;
  }

  // Warm-up
  let t: number;
  let v: number;
  let i: number;
  let j: number;
  let w = 0;
  const X: number[] = [];
  let limit = 128;

  const seedStr = (() => {
    if (Number.isInteger(seed)) {
      v = seed as number;
      return null;
    }
    const str = `${seed.toString()}\0`;
    v = 0;
    limit = Math.max(limit, str.length);
    return str;
  })();

  for (i = 0, j = -32; j < limit; ++j) {
    if (seedStr) {
      v ^= seedStr.charCodeAt((j + 32) % seedStr.length);
    }

    if (j === 0) {
      w = v;
    }

    v ^= v << 10;
    v ^= v >>> 15;
    v ^= v << 4;
    v ^= v >>> 13;

    if (j >= 0) {
      w = (w + 0x61c88647) | 0;
      t = X[j & 127] ^= v + w;
      i = t === 0 ? i + 1 : 0;
    }
  }

  if (i >= 128) {
    X[(seedStr?.length || 0) & 127] = -1;
  }

  i = 127;
  for (j = 4 * 128; j > 0; --j) {
    v = X[(i + 34) & 127];
    i = (i + 1) & 127;
    t = X[i];
    v ^= v << 13;
    t ^= t << 17;
    v ^= v >>> 15;
    t ^= t >>> 12;
    X[i] = v ^ t;
  }

  a = w;
  b = X;
  c = i;

  return decorateRandom<StatefulRandomNumberGenerator<Xor4096State>>(random, seed, {
    getState: () => [a, b.slice(), c],
    setState: () => (state: Xor4096State) => {
      a = state[0];
      b = state[1].slice();
      c = state[2];
    },
  });
}
