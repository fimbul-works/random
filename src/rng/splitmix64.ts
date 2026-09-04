import { MASK_64 } from "../constants.js";
import { decorateRandomInt64, defineRandomState } from "../decorate/decorate.js";
import type { RandomNumberGenerator, Seed } from "../types.js";
import { expandSeed } from "../seed.js";

/**
 * SplitMix64 internal registry state.
 */
export type SplitMix64State = bigint;

/**
 * Creates a new SplitMix64 PRNG.
 *
 * This is an implementation of the 64-bit SplitMix64 algorithm by Guy L. Steele, Doug Lea, and Christine H. Flood.
 *
 * @param {Seed} [seed=Date.now()] - Optional seed value (number or string). Defaults to current time if not provided.
 * @returns {RandomNumberGenerator<SplitMix64State>} A new PRNG.
 */
export function createRandomSplitMix64(seed: Seed = Date.now()): RandomNumberGenerator<SplitMix64State> {
  const [s0, s1] = expandSeed(seed, 2);
  let s = ((BigInt(s0) << 32n) | BigInt(s1)) & MASK_64;

  function random(): bigint {
    s = (s + 0x9e3779b97f4a7c15n) & MASK_64;
    let z = s;
    z = ((z ^ (z >> 30n)) * 0xbf58476d1ce4e5b9n) & MASK_64;
    z = ((z ^ (z >> 27n)) * 0x94d049bb133111ebn) & MASK_64;
    return (z ^ (z >> 31n)) & MASK_64;
  }

  return defineRandomState<SplitMix64State>(
    decorateRandomInt64(random),
    seed,
    () => s,
    (newState) => {
      if (typeof newState !== "bigint") {
        throw new Error("Invalid SplitMix64 state");
      }
      s = newState & MASK_64;
    },
  );
}
