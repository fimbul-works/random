import { FRAC } from "../constants.js";
import { decorateRandom, defineRandomState } from "../decorate/decorate.js";
import type { RandomNumberGenerator } from "../types.js";
import { normalizeSeed } from "../util.js";

/**
 * Creates a new Xorshift32M PRNG.
 *
 * This implementation is based on work by Marc-B-Reynolds and Sebastiano Vigna.
 *
 * @param {number} [seed=Date.now()] - Optional seed number. Defaults to current time if not provided.
 * @returns {RandomNumberGenerator<number>} A new PRNG.
 */
export function createRandomXorshift32M(seed: number = Date.now()): RandomNumberGenerator<number> {
  let s = normalizeSeed(seed);

  function random() {
    s ^= s << 13;
    s ^= s >>> 17;
    s ^= s << 5;
    return (Math.imul(s, 1597334677) >>> 0) * FRAC;
  }

  return decorateRandom(
    defineRandomState<number>(
      random,
      seed,
      () => s,
      (state) => (s = state),
    ),
  );
}
