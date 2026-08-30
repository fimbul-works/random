import { decorateRandomInt32, defineRandomState } from "../decorate/decorate.js";
import type { RandomNumberGenerator, Seed } from "../types.js";
import { expandSeed } from "../util.js";

/**
 * JSF32 internal registry state.
 */
export type JSF32BState = [number, number, number, number];

/**
 * Creates a new JSF32-B PRNG.
 *
 * This is an implementation of the JSF32-B PRNG by Bob Jenkin.
 *
 * @param {Seed} [seed=Date.now()] - Optional seed value (number or string). Defaults to current time if not provided.
 * @returns {RandomNumberGenerator<JSF32BState>} A new PRNG.
 */
export function createRandomJSF32B(seed: Seed = Date.now()): RandomNumberGenerator<JSF32BState> {
  let [s0, s1, s2, s3] = expandSeed(seed, 4).map((s) => s | 0);

  function random(): number {
    const t = (s0 - ((s1 << 23) | (s1 >>> 9))) | 0;
    s0 = (s1 ^ ((s2 << 16) | (s2 >>> 16))) | 0;
    s1 = (s2 + ((s3 << 11) | (s3 >>> 21))) | 0;
    s2 = (s3 + t) | 0;
    s3 = (s0 + t) | 0;
    return s3 >>> 0;
  }

  return defineRandomState<JSF32BState>(
    decorateRandomInt32(random),
    seed,
    () => [s0, s1, s2, s3],
    (state) => {
      if (state.length !== 4) {
        throw new Error("Invalid JSF32 state");
      }
      [s0, s1, s2, s3] = state;
    },
  );
}
