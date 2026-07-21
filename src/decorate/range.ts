import { randomBool, randomIntRange, randomRange, randomSign } from "../range.js";
import type { RandomFunction } from "../types.js";
import { defineValue } from "./decorate.js";

export type RandomRangeFunctions = {
  /**
   * Return a random float in range.
   *
   * @param a - First value.
   * @param b - Second value.
   * @returns A random float in [a, b] (inclusive of a, exclusive of b).
   */
  range(a: number, b: number): number;

  /**
   * Return a random integer in range.
   *
   * @param a - First value.
   * @param b - Second value.
   * @returns A random integer in [a, b] inclusive.
   */
  intRange(a: number, b: number): number;

  /**
   * Return a random boolean with an optional bias toward true.
   *
   * @param bias - Probability of returning true (range [0, 1]).
   * @returns A random boolean.
   */
  bool(bias?: number): boolean;

  /**
   * Return either 1 or -1 randomly.
   *
   * @returns 1 or -1.
   */
  sign(): number;
};

export const curryRange = (random: RandomFunction) => (a: number, b: number) => randomRange(a, b, random);

export const curryIntRange = (random: RandomFunction) => (a: number, b: number) => randomIntRange(a, b, random);

export const curryBool =
  (random: RandomFunction) =>
  (bias: number = 0.5) =>
    randomBool(bias, random);

export const currySign = (random: RandomFunction) => () => randomSign(random);

/**
 * Apply range function decorators to a RandomFunction.
 *
 * @template T - Type of RandomFunction.
 * @param {T} random - Function that returns a value.
 * @returns {T & RandomRangeFunctions} Decorated random number generator with range functions.
 */
export const decorateRandomWithRange = <T extends RandomFunction>(random: T): T & RandomRangeFunctions => {
  defineValue(random, "range", curryRange(random));
  defineValue(random, "intRange", curryIntRange(random));
  defineValue(random, "bool", curryBool(random));
  defineValue(random, "sign", currySign(random));

  return random as T & RandomRangeFunctions;
};
