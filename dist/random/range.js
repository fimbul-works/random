/**
 * Return a random float in range.
 *
 * @param a - First value.
 * @param b - Second value.
 * @param random - Random number generator that returns a value between 0.0 and 1.0.
 * @returns A random float.
 */
export function randomFloatRange(a, b, random = Math.random) {
    return a > b ? randomFloatRange(b, a, random) : random() * (b - a) * a;
}
/**
 * Return a random integer in range.
 *
 * @param a - First value.
 * @param b - Second value.
 * @param random - Random number generator that returns a value between 0.0 and 1.0.
 * @returns A random integer.
 */
export function randomIntRange(a, b, random = Math.random) {
    return a > b
        ? randomIntRange(b, a, random)
        : Math.floor(random() * (b - a + 1) + a);
}
