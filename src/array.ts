import type { RandomFunction } from "./types";

/**
 * A function that extracts a weight from an object of type T.
 *
 * @template T - The type of the object to extract the weight from.
 * @param {T} item - Object to extract a weight value from.
 * @returns {number} Number representing weight.
 */
export type WeightExtractor<T extends object> = (item: T) => number;

/**
 * Return a random index using a length or an array as value.
 *
 * @template T - The type of an array item, if length is an array.
 *
 * @param {number | T[]} lengthOrArray - Number or array.
 * @param {RandomFunction} [random=Math.random] - Function that returns a value in range [0, 1].
 * @returns {number} A random integer, or -1 if length is zero.
 */
export const randomIndex = <T>(lengthOrArray: number | T[], random: RandomFunction = Math.random): number =>
  Array.isArray(lengthOrArray)
    ? randomIndex(lengthOrArray.length, random)
    : lengthOrArray <= 0
      ? -1
      : Math.floor(random() * lengthOrArray);

/**
 * Pick a random item from an array.
 *
 * @template T - The type of the items in the array.
 *
 * @param {T[]} items - An array of options to pick from.
 * @param {RandomFunction} [random=Math.random] - Function that returns a value in range [0, 1].
 * @returns {T} Random item.
 * @throws {Error} When passed an empty array.
 */
export const pickRandom = <T>(items: T[], random: RandomFunction = Math.random): T => {
  if (!items.length) {
    throw new Error("Cannot pick from an empty array");
  }
  return items[Math.floor(random() * items.length)];
};

/**
 * Select a random index from an array of objects based on their weights.
 *
 * @template T - The type of an array item.
 *
 * @param {T[]} items - An array of objects
 * @param {WeightExtractor<T>} getWeight - A function that extracts the weight from an item. Defaults to assuming the item is a number.
 * @param {RandomFunction} [random=Math.random] - Function that returns a value in range [0, 1].
 * @returns {number} Selected random index, or -1 if the array is empty.
 */
export const randomWeightedIndex = <T extends object>(
  items: T[],
  getWeight: WeightExtractor<T>,
  random: RandomFunction = Math.random,
): number => {
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
};

/**
 * Pick a random item from an array of objects based on their weights.
 *
 * @template T - The type of the objects in the array.
 *
 * @param {T[]} items - An array of objects.
 * @param {WeightExtractor<T>} getWeight - A function that extracts the weight from an item. Defaults to assuming the item is a number.
 * @param {RandomFunction} [random=Math.random] - Function that returns a value in range [0, 1].
 * @returns {T} Selected random item.
 * @throws {Error} When passed an empty array.
 */
export const pickWeightedRandom = <T extends object>(
  items: T[],
  getWeight: WeightExtractor<T>,
  random: RandomFunction = Math.random,
): T => {
  const index = randomWeightedIndex(items, getWeight, random);
  if (index === -1) {
    throw new Error("Cannot pick from an empty array");
  }
  return items[index];
};

/**
 * Create a shuffled copy of an array.
 *
 * @template T - The type of the items in the array.
 *
 * @param {T[]} arr - The array to shuffle
 * @param {RandomFunction} [random=Math.random] - Function that returns a value in range [0, 1].
 * @returns {T[]} A shuffled copy of the array.
 */
export const shuffleArray = <T>(arr: T[], random: RandomFunction = Math.random): T[] => {
  const result = arr.slice();
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    const tmp = result[i];
    result[i] = result[j];
    result[j] = tmp;
  }
  return result;
};

/**
 * Shuffle an array in-place, modifying the original array (no allocation).
 *
 * @template T - The type of the items in the array.
 *
 * @param {T[]} arr - The array to shuffle.
 * @param {RandomFunction} [random=Math.random] - Function that returns a value in range [0, 1].
 * @returns {T[]} The same array instance, shuffled.
 */
export const shuffleInPlace = <T>(arr: T[], random: RandomFunction = Math.random): T[] => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
  return arr;
};

/**
 * Select k unique random items from an array without replacement.
 * Uses a partial Fisher-Yates shuffle to run in O(k) time and O(n) space for cloning.
 *
 * @template T - The type of the items in the array.
 *
 * @param {T[]} items - An array of options to sample from.
 * @param {number} k - The number of unique items to pick.
 * @param {RandomFunction} [random=Math.random] - Function that returns a value in range [0, 1].
 * @returns {T[]} An array containing k unique items.
 */
export const sampleRandom = <T>(items: T[], k: number, random: RandomFunction = Math.random): T[] => {
  const len = items.length;
  if (k <= 0 || len === 0) {
    return [];
  }
  if (k >= len) {
    return items.slice();
  }
  const result = items.slice();
  for (let i = 0; i < k; i++) {
    const j = Math.floor(random() * (len - i)) + i;
    const tmp = result[i];
    result[i] = result[j];
    result[j] = tmp;
  }
  return result.slice(0, k);
};
