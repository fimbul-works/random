import { decorateRandomInt32, defineRandomState } from "../decorate/decorate.js";
import type { RandomNumberGenerator, Seed } from "../types.js";
import { expandSeed, rotl } from "../util.js";

/**
 * JSF32 internal registry state.
 */
export type JSF32State = [number, number, number, number];

/**
 * Creates a new JSF32 (Bob Jenkins Small Fast 32) PRNG.
 *
 * This is an implementation of Bob Jenkins' 32-bit Small Noncryptographic PRNG.
 *
 * @param {Seed} [seed=Date.now()] - Optional seed value (number or string). Defaults to current time if not provided.
 * @returns {RandomNumberGenerator<JSF32State>} A new PRNG.
 */
export function createRandomJSF32(seed: Seed = Date.now()): RandomNumberGenerator<JSF32State> {
  let [a, b, c, d] = expandSeed(seed, 4);

  function random(): number {
    const e = (a - rotl(b, 27)) >>> 0;
    a = (b ^ rotl(c, 17)) >>> 0;
    b = (c + d) >>> 0;
    c = (d + e) >>> 0;
    d = (e + a) >>> 0;
    return d >>> 0;
  }

  return defineRandomState<JSF32State>(
    decorateRandomInt32(random),
    seed,
    () => [a, b, c, d],
    (state) => {
      if (state.length !== 4) {
        throw new Error("Invalid JSF32 state");
      }
      [a, b, c, d] = state;
    },
  );
}
