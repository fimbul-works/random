import { decorateRandomInt32, defineRandomState } from "../decorate/decorate.js";
import type { RandomNumberGenerator, Seed } from "../types.js";
import { expandSeed, rotl } from "../util.js";

/**
 * RomuDuoJr internal registry state: [x, y].
 */
export type RomuDuoJrState = [number, number];

/**
 * Creates a new RomuDuoJr PRNG.
 *
 * This is an implementation of the 32-bit RomuDuoJr PRNG by Mark A. Overton.
 *
 * @param {Seed} [seed=Date.now()] - Optional seed value (number or string). Defaults to current time if not provided.
 * @returns {RandomNumberGenerator<RomuDuoJrState>} A new PRNG.
 */
export function createRandomRomuDuoJr(seed: Seed = Date.now()): RandomNumberGenerator<RomuDuoJrState> {
  let [x, y] = expandSeed(seed, 2);

  function random(): number {
    const xp = x >>> 0;
    x = (Math.imul(1524109429, y) >>> 0) | 0;
    y = ((y - xp) | 0) >>> 0;
    y = rotl(y, 27);
    return xp >>> 0;
  }

  return defineRandomState<RomuDuoJrState>(
    decorateRandomInt32(random),
    seed,
    () => [x, y],
    (state) => {
      if (state.length !== 2) {
        throw new Error("Invalid RomuDuoJr state");
      }
      [x, y] = state;
    },
  );
}
