/**
 * Return a random float in range.
 *
 * @param a - First value
 * @param b - Second value
 * @param random - Random number generator that returns a value between 0.0 and 1.0
 * @returns A random float
 */
export const randomRange = (a: number, b: number, random: () => number = Math.random): number =>
  a > b ? randomRange(b, a, random) : random() * (b - a) + a;

/**
 * Return a random integer in range.
 *
 * @param a - First value
 * @param b - Second value
 * @param random - Random number generator that returns a value between 0.0 and 1.0
 * @returns A random integer in [a, b] inclusive
 */
export const randomIntRange = (a: number, b: number, random: () => number = Math.random): number =>
  a > b ? randomIntRange(b, a, random) : Math.floor(random() * (b - a + 1) + a);
