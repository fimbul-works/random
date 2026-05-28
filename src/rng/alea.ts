import { FRAC } from "../constants.js";
import { decorateRandom, defineRandomState } from "../decorate/decorate.js";
import type { RandomNumberGenerator } from "../types.js";
import { expandSeed } from "../util.js";
import type { AleaState } from "./types.js";

/**
 * Creates a new Alea PRNG.
 *
 * This code is an implementation of Alea algorithm by Johannes Baagøe.
 *
 * @param {number} [seed=Date.now()] - Optional seed number. Defaults to current time if not provided.
 * @returns {RandomNumberGenerator<AleaState>} A new PRNG.
 */
export function createAlea(seed: number = Date.now()): RandomNumberGenerator<AleaState> {
  let [s0, s1, s2] = expandSeed(seed, 3).map((s) => s * FRAC);
  let i = 1;

  function random() {
    const t = 2091639 * s0 + i * FRAC;
    s0 = s1;
    s1 = s2;
    i = t | 0;
    return (s2 = t - i);
  }

  return decorateRandom(
    defineRandomState<AleaState>(
      random,
      seed,
      () => [s0, s1, s2, i],
      (state) => {
        if (state.length !== 4) {
          throw new Error("Invalid Alea state");
        }
        [s0, s1, s2, i] = state;
      },
    ),
  );
}
