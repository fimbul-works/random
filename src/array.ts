/**
 * A function that extracts a weight from an object of type T.
 * @param item - Object to extract a weight value from
 * @returns Number representing weight
 */
export type WeightExtractor<T extends object> = (item: T) => number;

/**
 * Return a random index using a length or an array as value.
 *
 * @param length - Number or array.
 * @param random - PRNG that returns a value between 0.0 and 1.0.
 * @returns A random integer, or -1 if length is zero.
 */
export const randomIndex = <T>(length: number | T[], random: () => number = Math.random): number =>
  Array.isArray(length)
    ? randomIndex(length.length, random)
    : length <= 0
      ? -1
      : Math.floor(random() * length) % length;

/**
 * Select a random index from an array of objects based on their weights.
 * @param items - An array of objects
 * @param getWeight - A function that extracts the weight from an item. Defaults to assuming the item is a number
 * @param random - PRNG that returns a value between 0.0 and 1.0
 * @returns Selected random index, or -1 if the array is empty
 */
export const randomWeightedIndex = <T extends object>(
  items: T[],
  getWeight: WeightExtractor<T>,
  random: () => number = Math.random,
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
 * Pick a random item from an array.
 *
 * @param items - An array of choices.
 * @param random - PRNG that returns a value between 0.0 and 1.0
 * @returns Random item
 * @throws {Error} When passed an empty array
 */
export const pickRandom = <T>(items: T[], random: () => number = Math.random): T => {
  if (!items.length) {
    throw new Error("Cannot pick from an empty array");
  }
  return items[randomIndex(items, random)];
};

/**
 * Pick a random item from an array of objects based on their weights.
 *
 * @param items - An array of objects
 * @param getWeight - A function that extracts the weight from an item. Defaults to assuming the item is a number
 * @param random - PRNG that returns a value between 0.0 and 1.0
 * @returns Selected random item, or null if the array is empty
 * @throws {Error} When passed an empty array
 */
export const pickWeightedRandom = <T extends object>(
  items: T[],
  getWeight: WeightExtractor<T>,
  random: () => number = Math.random,
): T => {
  const index = randomWeightedIndex(items, getWeight, random);
  if (index === -1) {
    throw new Error("Cannot pick from an invalid array");
  }
  return items[index];
};

/**
 * Create a shuffled copy of an array.
 *
 * @param arr - The array to shuffle
 * @param random - PRNG that returns a value between 0.0 and 1.0
 * @returns A shuffled copy of the array
 */
export const shuffleArray = <T>(arr: T[], random: () => number = Math.random): T[] => {
  const copy: T[] = arr.slice();
  const result: T[] = [];
  while (copy.length) {
    result.push(copy.splice(randomIndex(copy, random), 1)[0]);
  }
  return result;
};
