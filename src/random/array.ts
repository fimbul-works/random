import { RandomNumberGenerator } from './types.js';

/**
 * Return a random index using a length or an array as value.
 *
 * @param length - Number or array.
 * @param random - Random number generator that returns a value between 0.0 and 1.0.
 * @returns A random integer, or -1 if length is zero.
 */
export function randomIndex<T>(
  length: number | T[],
  random: RandomNumberGenerator = Math.random,
): number {
  if (Array.isArray(length)) return randomIndex(length.length);
  if (length <= 0) return -1;
  return Math.floor(random() * length) % length;
}

/**
 * Pick a random item from an array.
 *
 * @param items - An array of choices.
 * @param random - Random number generator that returns a value between 0.0 and 1.0.
 * @returns Random item.
 */
export function pickRandom<T>(
  items: T[],
  random: RandomNumberGenerator = Math.random,
): T | null {
  if (!items.length) return null;
  return items[Math.floor(random() * items.length) % items.length] ?? null;
}

/**
 * Create a shuffled copy of an array.
 *
 * @param arr - The array to shuffle.
 * @param random - Random number generator that returns a value between 0.0 and 1.0.
 * @returns A shuffled copy of the array.
 */
export function shuffleArray<T>(
  arr: T[],
  random: RandomNumberGenerator = Math.random,
): T[] {
  const copy: T[] = arr.slice();
  const result: T[] = [];
  while (copy.length) {
    const index = randomIndex(copy, random);
    result.push(copy.slice(index, 1)[0]);
  }
  return result;
}
