import type { RandomFunction } from "./types";

/**
 * A mapping of string keys to numeric weights, used for weighted random selection.
 */
export type WeightMap = Record<string, number>;

/**
 * Pick a random key from an object with weight as the value.
 *
 * @template T - The type of the weight map object.
 *
 * @param {T} keyAndWeight - An object with keys and values as weight.
 * @param {RandomFunction} [random=Math.random] - Function that returns a value in range [0, 1].
 * @returns {string} A random key, or null on error.
 * @throws {Error} When the weighted key object is invalid.
 */
export const randomWeightedKey = <T extends WeightMap>(
  keyAndWeight: T,
  random: RandomFunction = Math.random,
): string => {
  const keys = Object.keys(keyAndWeight);
  const totalWeight = Object.values(keyAndWeight).reduce((sum, weight) => sum + weight, 0);

  if (totalWeight <= 0 || keys.length === 0) {
    throw new Error("Invalid weighted key object");
  }

  let target = random() * totalWeight;

  // Iterate to find the slot
  for (const key of keys) {
    target -= keyAndWeight[key];
    if (target <= 0) {
      return key;
    }
  }

  // Return the first key as a fallback
  return keys[0];
};
