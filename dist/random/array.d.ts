import { RandomNumberGenerator } from './types.js';
/**
 * Return a random index using a length or an array as value.
 *
 * @param length - Number or array.
 * @param random - Random number generator that returns a value between 0.0 and 1.0.
 * @returns A random integer, or -1 if length is zero.
 */
export declare function randomIndex<T>(length: number | T[], random?: RandomNumberGenerator): number;
/**
 * Pick a random item from an array.
 *
 * @param items - An array of choices.
 * @param random - Random number generator that returns a value between 0.0 and 1.0.
 * @returns Random item.
 * @throws {Error} When passed an empty array.
 */
export declare function pickRandom<T>(items: T[], random?: RandomNumberGenerator): T;
/**
 * Create a shuffled copy of an array.
 *
 * @param arr - The array to shuffle.
 * @param random - Random number generator that returns a value between 0.0 and 1.0.
 * @returns A shuffled copy of the array.
 */
export declare function shuffleArray<T>(arr: T[], random?: RandomNumberGenerator): T[];
