import { FRAC } from "../constants.js";
import { decorateRandomFloat, defineRandomState } from "../decorate/decorate.js";
import type { RandomNumberGenerator, Seed } from "../types.js";
import { expandSeed } from "../seed.js";

/**
 * Alea internal registry state.
 */
export type AleaState = [number, number, number, number];

/**
 * Creates a new Alea PRNG.
 *
 * This code is an implementation of Alea algorithm by Johannes Baagøe.
 *
 * @param {Seed} [seed=Date.now()] - Optional seed value (number or string). Defaults to current time if not provided.
 * @returns {RandomNumberGenerator<AleaState>} A new PRNG.
 */
export function createRandomAlea(seed: Seed = Date.now()): RandomNumberGenerator<AleaState> {
  let [s0, s1, s2] = expandSeed(seed, 3).map((s) => s * FRAC);
  let i = 1;

  function random(): number {
    const t = 2091639 * s0 + i * FRAC;
    s0 = s1;
    s1 = s2;
    i = t | 0;
    return (s2 = t - i);
  }

  return defineRandomState<AleaState>(
    decorateRandomFloat(random),
    seed,
    () => [s0, s1, s2, i],
    (state) => {
      if (state.length !== 4) {
        throw new Error("Invalid Alea state");
      }
      [s0, s1, s2, i] = state;
    },
  );
}
