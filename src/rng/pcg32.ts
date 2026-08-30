import { MASK_64 } from "../constants.js";
import { decorateRandomInt32, defineRandomState } from "../decorate/decorate.js";
import type { RandomNumberGenerator, Seed } from "../types.js";
import { expandSeed } from "../util.js";

/**
 * PCG32 internal registry state.
 */
export type PCG32State = bigint;

/**
 * Creates a new PCG32 (PCG-XSH-RR 64/32) PRNG.
 *
 * This is an implementation of the PCG32 PRNG by Melissa O'Neill.
 *
 * @param {Seed} [seed=Date.now()] - Optional seed value (number or string). Defaults to current time if not provided.
 * @returns {RandomNumberGenerator<PCG32State>} A new PRNG.
 */
export function createRandomPCG32(seed: Seed = Date.now()): RandomNumberGenerator<PCG32State> {
  const MULTIPLIER = 6364136223846793005n;
  const INCREMENT = 1442695040888963407n;

  const [s0, s1] = expandSeed(seed, 2);
  let state = ((BigInt(s0) << 32n) | BigInt(s1)) & MASK_64;

  // Initialize and advance once
  state = (state + INCREMENT) & MASK_64;
  state = (state * MULTIPLIER + INCREMENT) & MASK_64;

  function random(): number {
    const oldstate = state;
    state = (oldstate * MULTIPLIER + INCREMENT) & MASK_64;
    const xorshifted = Number(((oldstate >> 18n) ^ oldstate) >> 27n) >>> 0;
    const rot = Number(oldstate >> 59n);
    return ((xorshifted >>> rot) | (xorshifted << (32 - rot))) >>> 0;
  }

  return defineRandomState<PCG32State>(
    decorateRandomInt32(random),
    seed,
    () => state,
    (newState) => {
      if (typeof newState !== "bigint") {
        throw new Error("Invalid PCG32 state");
      }
      state = newState & MASK_64;
    },
  );
}
