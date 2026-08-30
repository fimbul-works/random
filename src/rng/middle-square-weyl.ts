import { MASK_32, MASK_64 } from "../constants.js";
import { decorateRandomInt64, defineRandomState } from "../decorate/decorate.js";
import type { RandomNumberGenerator, Seed } from "../types.js";
import { expandSeed } from "../util.js";

/**
 * MiddleSquareWeyl internal registry state: [x, w, s].
 */
export type MiddleSquareWeylState = [bigint, bigint, bigint];

/**
 * Creates a new Middle Square Weyl Sequence (MSWS) PRNG.
 *
 * This is an implementation of the Middle Square Weyl Sequence algorithm by Bernard Widynski (2017).
 *
 * @param {Seed} [seed=Date.now()] - Optional seed value (number or string). Defaults to current time if not provided.
 * @returns {RandomNumberGenerator<MiddleSquareWeylState>} A new PRNG.
 */
export function createRandomMiddleSquareWeyl(seed: Seed = Date.now()): RandomNumberGenerator<MiddleSquareWeylState> {
  const [s0, s1, s2, s3] = expandSeed(seed, 4);
  let x = ((BigInt(s0) << 32n) | BigInt(s1)) & MASK_64;
  let w = ((BigInt(s2) << 32n) | BigInt(s3)) & MASK_64;
  let s = 0xb5ad4eceda1ce2a9n; // Weyl constant

  function random(): bigint {
    w = (w + s) & MASK_64;
    x = (x * x + w) & MASK_64;
    x = ((x >> 32n) | ((x & MASK_32) << 32n)) & MASK_64;
    return x;
  }

  return defineRandomState<MiddleSquareWeylState>(
    decorateRandomInt64(random),
    seed,
    () => [x, w, s],
    (newState) => {
      if (newState.length !== 3) {
        throw new Error("Invalid MiddleSquareWeyl state");
      }
      [x, w, s] = newState;
    },
  );
}
