import type { RandomFunction } from "./types.js";

const DEFAULT_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

/**
 * Generate a random string.
 *
 * @param {number} len - The length of the string to generate.
 * @param {string} [alphabet] - The alphabet to use for generating the string. Defaults to alphanumeric characters.
 * @param {RandomFunction} [random=Math.random] - Function that returns a value in range [0, 1].
 * @returns {string} The generated string.
 */
export const randomString = (len: number, alphabet?: string, random: RandomFunction = Math.random): string => {
  if (!alphabet) {
    alphabet = DEFAULT_ALPHABET;
  }
  let result = "";
  for (let i = 0; i < len; i++) {
    result += alphabet[Math.floor(random() * alphabet.length)];
  }
  return result;
};
