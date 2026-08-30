import { decorateRandomInt32, defineRandomState } from "../decorate/decorate.js";
import type { RandomNumberGenerator, Seed } from "../types.js";
import { expandSeed } from "../util.js";

/**
 * Xorshift7 internal registry state: [x, y, z, w, v, u, t].
 */
export type Xorshift7State = [number, number, number, number, number, number, number];

/**
 * Creates a new Xorshift7 PRNG.
 *
 * This code is an implementation of Xorshift7 algorithm by François Panneton and Pierre L'Ecuyer.
 *
 * @param {Seed} [seed=Date.now()] - Optional seed value (number or string). Defaults to current time if not provided.
 * @returns {RandomNumberGenerator<Xorshift7State>} A new PRNG.
 */
export function createRandomXorshift7(seed: Seed = Date.now()): RandomNumberGenerator<Xorshift7State> {
  let [x, y, z, w, v, u, t] = expandSeed(seed, 7);

  function random(): number {
    const s = x;
    x = y;
    y = z;
    z = w;
    w = v;
    v = u;
    u = t;
    t = s ^ (s << 2) ^ (u ^ (u >>> 3)) ^ (w ^ (w << 10));
    v = (v + t) | 0;
    return v >>> 0;
  }

  return defineRandomState<Xorshift7State>(
    decorateRandomInt32(random),
    seed,
    () => [x, y, z, w, v, u, t],
    (state) => {
      if (state.length !== 7) {
        throw new Error("Invalid Xorshift7 state");
      }
      [x, y, z, w, v, u, t] = state;
    },
  );
}
