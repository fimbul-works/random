/**
 * This code is an implementation of Alea algorithm; (C) 2010 Johannes Baagøe.
 * Alea is licensed according to the http://en.wikipedia.org/wiki/MIT_License.
 */

/**
 * 2^-32 - the smallest possible decimal number.
 */
const FRAC = 2 ** -32;

/**
 * Alea pseudo-random number generator.
 * @returns {number} - A pseudo-random number.
 */
export interface AleaRandomNumberGenerator {
  /**
   * Return a pseudo-random number between 0.0 and 1.0.
   */
  (): number;

  /**
   * Original seed number.
   * @type {number}
   */
  seed: number;

  /**
   * Get the internal registry state, to allow you to manually save it.
   * @returns {[number, number, number, number]} - The internal registry state.
   */
  getState: () => [number, number, number, number];

  /**
   * Set the internal registry state, to allow you to manually restore it.
   * @param state - The internal registry state.
   */
  setState: (state: [number, number, number, number]) => void;
}

/**
 * Creates a new Alea pseudo-random number generator.
 * @param {number} seed - Seed number.
 * @param {number} MAGIC1 - Magic number.
 * @param {number} MAGIC2 - Another magic number.
 * @returns A new pseudo-random number generator.
 */
export function createRandomAlea(
  seed: number,
  MAGIC1: number = 69069,
  MAGIC2: number = 2091639,
): AleaRandomNumberGenerator {
  const originalSeed = seed;
  let r0: number,
    r1: number,
    r2: number,
    i: number,
    t: number,
    mutableSeed = seed;
  mutableSeed = mutableSeed < 1 ? 1 / mutableSeed : mutableSeed;
  r0 = (mutableSeed >>> 0) * FRAC;
  mutableSeed = (mutableSeed * MAGIC1 + 1) >>> 0;
  r1 = mutableSeed * FRAC;
  mutableSeed = (mutableSeed * MAGIC1 + 1) >>> 0;
  r2 = mutableSeed * FRAC;
  i = 1;

  function random() {
    t = MAGIC2 * r0 + i * FRAC;
    r0 = r1;
    r1 = r2;
    i = t | 0;
    r2 = t - i;
    return r2;
  }

  random.seed = Object.freeze(originalSeed);

  random.getState = (): [number, number, number, number] => [r0, r1, r2, i];

  random.setState = (state: [number, number, number, number]) => {
    r0 = state[0];
    r1 = state[1];
    r2 = state[2];
    i = state[3];
  };

  return random;
}
