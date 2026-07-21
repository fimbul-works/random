import { FRAC } from "../constants.js";
import { decorateRandom, defineRandomState } from "../decorate/decorate.js";
import type { RandomNumberGenerator, Seed } from "../types.js";
import { normalizeSeed } from "../util.js";

/**
 * Creates a new Xorshift32AMX PRNG.
 *
 * This implementation is based on work by Marc-B-Reynolds and Sebastiano Vigna.
 *
 * @param {Seed} [seed=Date.now()] - Optional seed value (number or string). Defaults to current time if not provided.
 * @returns {RandomNumberGenerator<number>} A new PRNG.
 */
export function createRandomXorshift32AMX(seed: Seed = Date.now()): RandomNumberGenerator<number> {
  let s = normalizeSeed(seed);

  function random() {
    var t = Math.imul(s, 0x5f356495);
    t = (t >>> 24) | ((t >>> 8) & 0xff00) | ((t << 8) & 0xff0000) | (t << 24);
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
