import { decorateRandomInt32, defineRandomState } from "../decorate/decorate.js";
import type { RandomNumberGenerator, Seed } from "../types.js";
import { expandSeed } from "../seed.js";
import { rotl } from "./util.js";

/**
 * RomuTrio internal registry state: [x, y, z].
 */
export type RomuTrioState = [number, number, number];

/**
 * Creates a new RomuTrio PRNG.
 *
 * This is an implementation of the 32-bit RomuTrio PRNG by Mark A. Overton.
 *
 * @param {Seed} [seed=Date.now()] - Optional seed value (number or string). Defaults to current time if not provided.
 * @returns {RandomNumberGenerator<RomuTrioState>} A new PRNG.
 */
export function createRandomRomuTrio(seed: Seed = Date.now()): RandomNumberGenerator<RomuTrioState> {
  let [x, y, z] = expandSeed(seed, 3);

  function random(): number {
    const xp = x >>> 0;
    const yp = y >>> 0;
    const zp = z >>> 0;

    x = (Math.imul(1524109429, zp) >>> 0) | 0;
    y = ((yp - xp) | 0) >>> 0;
    y = rotl(y, 12);
    z = ((zp - yp) | 0) >>> 0;
    z = rotl(z, 22);
    return xp >>> 0;
  }

  return defineRandomState<RomuTrioState>(
    decorateRandomInt32(random),
    seed,
    () => [x, y, z],
    (state) => {
      if (state.length !== 3) {
        throw new Error("Invalid RomuTrio state");
      }
      [x, y, z] = state;
    },
  );
}
