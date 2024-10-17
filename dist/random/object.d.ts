import { RandomNumberGenerator } from './types.js';
/**
 * A function that extracts a weight from an object of type T.
 */
export type WeightExtractor<T extends object> = (item: T) => number;
/**
 * Select a random index from an array of objects based on their weights.
 * @param items - An array of objects.
 * @param getWeight - A function that extracts the weight from an item. Defaults to assuming the item is a number.
 * @param random - Random number generator that returns a value between 0.0 and 1.0.
 * @returns Selected random index, or -1 if the array is empty.
 */
export declare function randomWeightedIndex<T extends object>(items: T[], getWeight: WeightExtractor<T>, random?: RandomNumberGenerator): number;
/**
 * Pick a random item from an array of objects based on their weights.
 * @param items - An array of objects.
 * @param getWeight - A function that extracts the weight from an item. Defaults to assuming the item is a number.
 * @param random - Random number generator that returns a value between 0.0 and 1.0.
 * @returns Selected random item, or null if the array is empty.
 * @throws {Error} When passed an empty array.
 */
export declare function pickWeightedRandom<T extends object>(items: T[], getWeight: WeightExtractor<T>, random?: RandomNumberGenerator): T;
/**
 * Pick a random key from an object with weight as the value.
 * @param keyAndWeight - An object with keys and values as weight.
 * @param random - Random number generator that returns a value between 0.0 and 1.0.
 * @returns A random key, or null on error.
 * @throws {Error} On invalid weighted key object.
 */
export declare function randomWeightedKey(keyAndWeight: Record<string, number>, random?: RandomNumberGenerator): string;
