import { FRAC } from "../constants.js";
import { decorateRandom, defineRandomState } from "../decorate/decorate.js";
import type { RandomNumberGenerator } from "../types.js";
import { normalizeSeed } from "../util.js";

/**
 * Creates a new Xorshift32AMX PRNG.
 *
 * This implementation is based on work by Marc-B-Reynolds and Sebastiano Vigna.
 *
 * @param {number} [seed=Date.now()] - Optional seed number. Defaults to current time if not provided.
 * @returns {RandomNumberGenerator<number>} A new PRNG.
 */
export function createRandomXorshift32AMX(seed: number = Date.now()): RandomNumberGenerator<number> {
  let s = normalizeSeed(seed);

  function random() {
    var t = Math.imul(s, 1597334677);
    t = (t >>> 24) | ((t >>> 8) & 65280) | ((t << 8) & 16711680) | (t << 24);
    s ^= s << 13;
    s ^= s >>> 17;
    s ^= s << 5;
    return ((s + t) >>> 0) * FRAC;
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
