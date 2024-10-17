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
export function randomWeightedIndex<T extends object>(
  items: T[],
  getWeight: WeightExtractor<T>,
  random: RandomNumberGenerator = Math.random,
): number {
  if (items.length === 0) {
    return -1;
  }
  // Calculate total weight
  const totalWeight = items.reduce((sum, item) => sum + getWeight(item), 0);
  if (totalWeight <= 0) {
    return -1;
  }
  // Iterate to find the matching slot
  let randomNum = random() * totalWeight;
  for (let i = 0; i < items.length; i++) {
    randomNum -= getWeight(items[i]);
    if (randomNum <= 0) return i;
  }
  // Return the first index as a fallback
  return 0;
}

/**
 * Pick a random item from an array of objects based on their weights.
 * @param items - An array of objects.
 * @param getWeight - A function that extracts the weight from an item. Defaults to assuming the item is a number.
 * @param random - Random number generator that returns a value between 0.0 and 1.0.
 * @returns Selected random item, or null if the array is empty.
 * @throws {Error} When passed an empty array.
 */
export function pickWeightedRandom<T extends object>(
  items: T[],
  getWeight: WeightExtractor<T>,
  random: RandomNumberGenerator = Math.random,
): T {
  const index = randomWeightedIndex(items, getWeight, random);
  if (index === -1) {
    throw new Error('Cannot pick from an invalid array');
  }
  return items[index];
}

/**
 * Pick a random key from an object with weight as the value.
 * @param keyAndWeight - An object with keys and values as weight.
 * @param random - Random number generator that returns a value between 0.0 and 1.0.
 * @returns A random key, or null on error.
 * @throws {Error} On invalid weighted key object.
 */
export function randomWeightedKey(
  keyAndWeight: Record<string, number>,
  random: RandomNumberGenerator = Math.random,
): string {
  const keys = Object.keys(keyAndWeight);
  const totalWeight = Object.values(keyAndWeight).reduce(
    (sum, weight) => sum + weight,
    0,
  );
  if (totalWeight <= 0 || keys.length === 0) {
    throw new Error('Invalid weighted key object');
  }
  // Iterate to find the slot
  let randomNum = random() * totalWeight;
  for (const key in keys) {
    randomNum -= keyAndWeight[key];
    if (randomNum <= 0) return key;
  }
  // Return the first key as a fallback
  return keys[0];
}
