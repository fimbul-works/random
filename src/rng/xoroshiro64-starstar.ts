import { decorateRandomInt32, defineRandomState } from "../decorate/decorate.js";
import type { RandomNumberGenerator, Seed } from "../types.js";
import { expandSeed } from "../seed.js";
import { rotl } from "./util.js";

/**
 * Xoroshiro64** internal registry state: [s0, s1].
 */
export type Xoroshiro64StarStarState = [number, number];

/**
 * Creates a new Xoroshiro64** PRNG.
 *
 * This is an implementation of the 64-bit state (32-bit output) Xoroshiro64** algorithm
 * by David Blackman and Sebastiano Vigna.
 *
 * @param {Seed} [seed=Date.now()] - Optional seed value (number or string). Defaults to current time if not provided.
 * @returns {RandomNumberGenerator<Xoroshiro64StarStarState>} A new PRNG.
 */
export function createRandomXoroshiro64StarStar(
  seed: Seed = Date.now(),
): RandomNumberGenerator<Xoroshiro64StarStarState> {
  let [s0, s1] = expandSeed(seed, 2);

  function random(): number {
    const result = Math.imul(rotl(Math.imul(s0, 0x9e3779bb), 5), 5) >>> 0;
    s1 ^= s0;
    s0 = (rotl(s0, 26) ^ s1 ^ (s1 << 9)) >>> 0;
    s1 = rotl(s1, 13);
    return result;
  }

  return defineRandomState<Xoroshiro64StarStarState>(
    decorateRandomInt32(random),
    seed,
    () => [s0, s1],
    (state) => {
      if (state.length !== 2) {
        throw new Error("Invalid Xoroshiro64** state");
      }
      [s0, s1] = state;
    },
  );
}
