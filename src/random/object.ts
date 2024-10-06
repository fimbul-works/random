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

  const totalWeight = items.reduce((sum, item) => sum + getWeight(item), 0);
  if (totalWeight <= 0) {
    return -1;
  }

  let randomNum = random() * totalWeight;
  for (let i = 0; i < items.length; i++) {
    randomNum -= getWeight(items[i]);
    if (randomNum <= 0) return i;
  }

  return items.length - 1;
}

/**
 * Pick a random item from an array of objects based on their weights.
 * @param items - An array of objects.
 * @param getWeight - A function that extracts the weight from an item. Defaults to assuming the item is a number.
 * @param random - Random number generator that returns a value between 0.0 and 1.0.
 * @returns Selected random item, or null if the array is empty.
 */
export function pickWeightedRandom<T extends object>(
  items: T[],
  getWeight: WeightExtractor<T>,
  random: RandomNumberGenerator = Math.random,
): T | null {
  const index = randomWeightedIndex(items, getWeight, random);
  return index === -1 ? null : items[index];
}

/**
 * Pick a random key from an object with weight as the value.
 * @param keyAndWeight - An object with keys and values as weight.
 * @param random - Random number generator that returns a value between 0.0 and 1.0.
 * @returns A random key, or null on error.
 */
export function randomWeightedKey(
  keyAndWeight: Record<string, number>,
  random: RandomNumberGenerator = Math.random,
): string | null {
  const totalWeight = Object.values(keyAndWeight).reduce(
    (sum, weight) => sum + weight,
    0,
  );
  const keys = Object.keys(keyAndWeight);

  if (totalWeight === 0 || keys.length === 0) return null;

  let randomNum = random() * totalWeight;
  for (const key in keys) {
    randomNum -= keyAndWeight[key];
    if (randomNum <= 0) return key;
  }

  return keys[keys.length - 1];
}
