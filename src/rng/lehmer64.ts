import { MASK_64 } from "../constants.js";
import { decorateRandomInt64, defineRandomState } from "../decorate/decorate.js";
import type { RandomNumberGenerator, Seed } from "../types.js";
import { expandSeed } from "../util.js";

/**
 * Lehmer64 internal registry state.
 */
export type Lehmer64State = bigint;

/**
 * Creates a new Lehmer64 PRNG.
 *
 * This is an implementation of the 64-bit Lehmer (multiplicative congruential) PRNG.
 *
 * @param {Seed} [seed=Date.now()] - Optional seed value (number or string). Defaults to current time if not provided.
 * @returns {RandomNumberGenerator<Lehmer64State>} A new PRNG.
 */
export function createRandomLehmer64(seed: Seed = Date.now()): RandomNumberGenerator<Lehmer64State> {
  const [s0, s1] = expandSeed(seed, 2);

  // Ensure state is odd for full period of 2^62
  let state = ((BigInt(s0) << 32n) | BigInt(s1) | 1n) & MASK_64;

  function random(): bigint {
    state = (state * 0xda942042e4dd58b5n) & MASK_64;
    return state;
  }

  return defineRandomState<Lehmer64State>(
    decorateRandomInt64(random),
    seed,
    () => state,
    (newState) => {
      if (typeof newState !== "bigint") {
        throw new Error("Invalid Lehmer64 state");
      }
      state = (newState | 1n) & MASK_64;
    },
  );
}
