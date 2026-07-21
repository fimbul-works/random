import { randomWeightedKey, type WeightMap } from "../object.js";
import type { RandomFunction } from "../types.js";
import { defineValue } from "./decorate.js";

export type RandomObjectFunctions = {
  /**
   * Pick a random key from an object with weight as the value.
   *
   * @template T - The type of the weight map object.
   * @param keyAndWeight - An object with keys and values as weight.
   * @returns A random key.
   * @throws {Error} When the weighted key object is invalid.
   */
  weightedKey<T extends WeightMap>(keyAndWeight: T): string;
};

export const curryWeightedKey =
  (random: RandomFunction) =>
  <T extends WeightMap>(keyAndWeight: T) =>
    randomWeightedKey(keyAndWeight, random);

/**
 * Apply object function decorators to a RandomFunction.
 *
 * @template T - Type of RandomFunction.
 * @param {T} random - Function that returns a value.
 * @returns {T & RandomObjectFunctions} Decorated random number generator with object functions.
 */
export const decorateRandomWithObject = <T extends RandomFunction>(random: T): T & RandomObjectFunctions => {
  defineValue(random, "weightedKey", curryWeightedKey(random));

  return random as T & RandomObjectFunctions;
};
