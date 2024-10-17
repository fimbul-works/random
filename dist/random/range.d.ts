import { RandomNumberGenerator } from './types.js';
/**
 * Return a random float in range.
 *
 * @param a - First value.
 * @param b - Second value.
 * @param random - Random number generator that returns a value between 0.0 and 1.0.
 * @returns A random float.
 */
export declare function randomRange(a: number, b: number, random?: RandomNumberGenerator): number;
/**
 * Return a random integer in range.
 *
 * @param a - First value.
 * @param b - Second value.
 * @param random - Random number generator that returns a value between 0.0 and 1.0.
 * @returns A random integer.
 */
export declare function randomIntRange(a: number, b: number, random?: RandomNumberGenerator): number;
