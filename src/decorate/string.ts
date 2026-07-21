import { randomString } from "../string.js";
import type { RandomFunction } from "../types.js";
import { defineValue } from "./decorate.js";

export type RandomStringFunctions = {
  /**
   * Generate a random string.
   *
   * @param len - The length of the string to generate.
   * @param alphabet - The alphabet to use for generating the string. Defaults to alphanumeric characters.
   * @returns The generated string.
   */
  string(len: number, alphabet?: string): string;
};

export const curryString = (random: RandomFunction) => (length: number, alphabet?: string) =>
  randomString(length, alphabet, random);

/**
 * Apply string function decorators to a RandomFunction.
 *
 * @template T - Type of RandomFunction.
 * @param {T} random - Function that returns a value.
 * @returns {T & RandomStringFunctions} Decorated random number generator with string functions.
 */
export const decorateRandomWithString = <T extends RandomFunction>(random: T): T & RandomStringFunctions => {
  defineValue(random, "string", curryString(random));

  return random as T & RandomStringFunctions;
};
