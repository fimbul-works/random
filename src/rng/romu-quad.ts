import { decorateRandomInt32, defineRandomState } from "../decorate/decorate.js";
import type { RandomNumberGenerator, Seed } from "../types.js";
import { expandSeed, rotl } from "../util.js";

/**
 * RomuQuad internal registry state: [w, x, y, z].
 */
export type RomuQuadState = [number, number, number, number];

/**
 * Creates a new RomuQuad PRNG.
 *
 * This is an implementation of the 32-bit RomuQuad PRNG by Mark A. Overton.
 *
 * @param {Seed} [seed=Date.now()] - Optional seed value (number or string). Defaults to current time if not provided.
 * @returns {RandomNumberGenerator<RomuQuadState>} A new PRNG.
 */
export function createRandomRomuQuad(seed: Seed = Date.now()): RandomNumberGenerator<RomuQuadState> {
  let [w, x, y, z] = expandSeed(seed, 4);

  function random(): number {
    const wp = w >>> 0;
    const xp = x >>> 0;
    const yp = y >>> 0;
    const zp = z >>> 0;

    w = (Math.imul(1524109429, zp) >>> 0) | 0;
    x = ((zp + rotl(wp, 19)) | 0) >>> 0;
    y = ((yp - xp) | 0) >>> 0;
    z = ((yp + wp) | 0) >>> 0;
    z = rotl(z, 9);
    return xp >>> 0;
  }

  return defineRandomState<RomuQuadState>(
    decorateRandomInt32(random),
    seed,
    () => [w, x, y, z],
    (state) => {
      if (state.length !== 4) {
        throw new Error("Invalid RomuQuad state");
      }
      [w, x, y, z] = state;
    },
  );
}
