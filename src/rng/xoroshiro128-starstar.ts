import { MASK_64 } from "../constants.js";
import { decorateRandomInt64, defineRandomState } from "../decorate/decorate.js";
import type { RandomNumberGenerator, Seed } from "../types.js";
import { expandSeed } from "../seed.js";
import { rotl64 } from "./util.js";

/**
 * Xoroshiro128** internal registry state: [s0, s1].
 */
export type Xoroshiro128StarStarState = [bigint, bigint];

/**
 * Creates a new Xoroshiro128** PRNG.
 *
 * This is an implementation of the Xoroshiro128** algorithm by David Blackman and Sebastiano Vigna.
 *
 * @param {Seed} [seed=Date.now()] - Optional seed value (number or string). Defaults to current time if not provided.
 * @returns {RandomNumberGenerator<Xoroshiro128StarStarState>} A new PRNG.
 */
export function createRandomXoroshiro128StarStar(
  seed: Seed = Date.now(),
): RandomNumberGenerator<Xoroshiro128StarStarState> {
  const [w0, w1, w2, w3] = expandSeed(seed, 4);
  let s0 = ((BigInt(w0) << 32n) | BigInt(w1)) & MASK_64;
  let s1 = ((BigInt(w2) << 32n) | BigInt(w3)) & MASK_64;

  function random(): bigint {
    const result = (rotl64(s0 * 5n, 7n) * 9n) & MASK_64;
    s1 ^= s0;
    s0 = rotl64(s0, 24n) ^ s1 ^ ((s1 << 16n) & MASK_64);
    s1 = rotl64(s1, 37n);
    return result;
  }

  return defineRandomState<Xoroshiro128StarStarState>(
    decorateRandomInt64(random),
    seed,
    () => [s0, s1],
    (state) => {
      if (state.length !== 2) {
        throw new Error("Invalid Xoroshiro128** state");
      }
      [s0, s1] = state;
    },
  );
}
