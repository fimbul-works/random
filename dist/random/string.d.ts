import { RandomNumberGenerator } from './types.js';
/**
 * Generate a random string.
 * @param len - The length of the string to generate.
 * @param random - The random function to use.
 * @param alphabet - The alphabet to use.
 * @returns The generated string.
 */
export declare function generateRandomString(len: number, random?: RandomNumberGenerator, alphabet?: string): string;
