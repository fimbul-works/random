import { MASK_64 } from "../constants.js";
import { decorateRandomInt64, defineRandomState } from "../decorate/decorate.js";
import type { RandomNumberGenerator, Seed } from "../types.js";
import { expandSeed } from "../seed.js";
import { rotl64 } from "./util.js";

/**
 * Xoshiro256++ internal registry state: [s0, s1, s2, s3].
 */
export type Xoshiro256PlusPlusState = [bigint, bigint, bigint, bigint];

/**
 * Creates a new Xoshiro256++ PRNG.
 *
 * This is an implementation of the 256-bit state Xoshiro256++ algorithm by David Blackman and Sebastiano Vigna.
 *
 * @param {Seed} [seed=Date.now()] - Optional seed value (number or string). Defaults to current time if not provided.
 * @returns {RandomNumberGenerator<Xoshiro256PlusPlusState>} A new PRNG.
 */
export function createRandomXoshiro256PlusPlus(
  seed: Seed = Date.now(),
): RandomNumberGenerator<Xoshiro256PlusPlusState> {
  const [w0, w1, w2, w3, w4, w5, w6, w7] = expandSeed(seed, 8);
  let s0 = ((BigInt(w0) << 32n) | BigInt(w1)) & MASK_64;
  let s1 = ((BigInt(w2) << 32n) | BigInt(w3)) & MASK_64;
  let s2 = ((BigInt(w4) << 32n) | BigInt(w5)) & MASK_64;
  let s3 = ((BigInt(w6) << 32n) | BigInt(w7)) & MASK_64;

  function random(): bigint {
    const result = (rotl64((s0 + s3) & MASK_64, 23n) + s0) & MASK_64;
    const t = (s1 << 17n) & MASK_64;
    s2 ^= s0;
    s3 ^= s1;
    s1 ^= s2;
    s0 ^= s3;
    s2 ^= t;
    s3 = rotl64(s3, 45n);
    return result;
  }

  return defineRandomState<Xoshiro256PlusPlusState>(
    decorateRandomInt64(random),
    seed,
    () => [s0, s1, s2, s3],
    (state) => {
      if (state.length !== 4) {
        throw new Error("Invalid Xoshiro256++ state");
      }
      [s0, s1, s2, s3] = state;
    },
  );
}
