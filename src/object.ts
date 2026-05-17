/**
 * Pick a random key from an object with weight as the value.
 *
 * @param keyAndWeight - An object with keys and values as weight
 * @param random - PRNG that returns a value between 0.0 and 1.0
 * @returns A random key, or null on error
 * @throws {Error} On invalid weighted key object
 */
export const randomWeightedKey = (keyAndWeight: Record<string, number>, random: () => number = Math.random): string => {
  const keys = Object.keys(keyAndWeight);
  const totalWeight = Object.values(keyAndWeight).reduce((sum, weight) => sum + weight, 0);

  if (totalWeight <= 0 || keys.length === 0) {
    throw new Error("Invalid weighted key object");
  }

  // Iterate to find the slot
  let randomNum = random() * totalWeight;
  for (const key in keys) {
    randomNum -= keyAndWeight[key];
    if (randomNum <= 0) {
      return key;
    }
  }

  // Return the first key as a fallback
  return keys[0];
};
