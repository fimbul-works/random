import { MASK_64 } from "../constants.js";
import { decorateRandomInt64, defineRandomState } from "../decorate/decorate.js";
import type { RandomNumberGenerator, Seed } from "../types.js";
import { expandSeed } from "../util.js";

/**
 * Wyrand internal registry state.
 */
export type WyrandState = bigint;

/**
 * Creates a new Wyrand PRNG.
 *
 * This is an implementation of the fast 64-bit Wyrand PRNG by Wang Yi (part of wyhash).
 *
 * @param {Seed} [seed=Date.now()] - Optional seed value (number or string). Defaults to current time if not provided.
 * @returns {RandomNumberGenerator<WyrandState>} A new PRNG.
 */
export function createRandomWyrand(seed: Seed = Date.now()): RandomNumberGenerator<WyrandState> {
  const WYRAND_ADD = 0xa0761d6478bd642fn;
  const WYRAND_XOR = 0xe7037ed1a0b428dbn;

  const [s0, s1] = expandSeed(seed, 2);
  let s = ((BigInt(s0) << 32n) | BigInt(s1)) & MASK_64;

  function random(): bigint {
    s = (s + WYRAND_ADD) & MASK_64;
    const see1 = s ^ WYRAND_XOR;
    const mul = s * see1;
    return ((mul >> 32n) ^ mul) & MASK_64;
  }

  return defineRandomState<WyrandState>(
    decorateRandomInt64(random),
    seed,
    () => s,
    (newState) => {
      if (typeof newState !== "bigint") {
        throw new Error("Invalid Wyrand state");
      }
      s = newState & MASK_64;
    },
  );
}
