import { RandomNumberGenerator } from './types.js';

/**
 * Interface for objects that can be used with randomPickWeighted.
 */
export interface WeightedRandomObject {
  weight: number;
}

/**
 * Select a random index from an array of objects with a weight property.
 *
 * @param weightedObjects - An array of objects with a weight property.
 * @param random - Random number generator that returns a value between 0.0 and 1.0.
 * @returns Selected random index.
 */
export function randomWeightedIndex<T extends WeightedRandomObject>(
  weightedObjects: T[],
  random: RandomNumberGenerator = Math.random,
): number {
  const totalWeight = weightedObjects.reduce(
    (sum, choice) => sum + choice.weight,
    0,
  );
  let randomNum = random() * totalWeight;

  for (let i = 0; i < weightedObjects.length; i++) {
    randomNum -= weightedObjects[i].weight;
    if (randomNum <= 0) return i;
  }

  return weightedObjects.length - 1;
}

/**
 * Pick a random item from an array of objects with a weight property.
 *
 * @param weightedItems - An array of objects with a weight property.
 * @param random - Random number generator that returns a value between 0.0 and 1.0.
 * @returns Selected random index.
 */
export function pickWeightedRandom<T extends WeightedRandomObject>(
  weightedItems: T[],
  random: RandomNumberGenerator = Math.random,
): T | null {
  if (weightedItems.length === 0) return null;

  return weightedItems[randomWeightedIndex(weightedItems, random)];
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
