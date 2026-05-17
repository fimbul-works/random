import type { Int64RandomNumberGenerator } from "../types.js";
import { decorateRandom } from "../util.js";
import { INT_53_SCALE, INT_64 } from "./constants";

/**
 * Creates a new SplitMix64 random number generator.
 *
 * @param seed - The seed value for the random number generator
 * @returns A new random number generator
 */
export function splitMix64(seed: bigint = BigInt(Date.now())): Int64RandomNumberGenerator {
  let x = seed;

  const next = () => {
    x = (x + 0x9e3779b97f4a7c15n) & INT_64;
    let z = x;
    z = (z ^ (z >> 30n)) * 0xbf58476d1ce4e5b9n;
    z = (z ^ (z >> 27n)) * 0x94d049bb133111ebn;
    return z ^ (z >> 31n);
  };

  function random() {
    return Number(next() & (INT_64 >> 11n)) / INT_53_SCALE;
  }

  return decorateRandom<Int64RandomNumberGenerator, bigint>(random, seed, {
    int64: next,
  });
}
