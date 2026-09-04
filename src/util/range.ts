import type { RandomFunction } from "./types.js";

/**
 * Return a random float in range.
 *
 * @param {number} a - First value.
 * @param {number} b - Second value.
 * @param {RandomFunction} [random=Math.random] - Function that returns a value in range [0, 1].
 * @returns {number} A random float in [a, b] (inclusive of a, exclusive of b).
 */
export const randomRange = (a: number, b: number, random: RandomFunction = Math.random): number =>
  a > b ? randomRange(b, a, random) : random() * (b - a) + a;

/**
 * Return a random integer in range.
 *
 * @param {number} a - First value.
 * @param {number} b - Second value.
 * @param {RandomFunction} [random=Math.random] - Function that returns a value in range [0, 1].
 * @returns {number} A random integer in [a, b] inclusive.
 */
export const randomIntRange = (a: number, b: number, random: RandomFunction = Math.random): number =>
  a > b ? randomIntRange(b, a, random) : Math.floor(random() * (b - a + 1) + a);

/**
 * Return a random boolean with an optional bias toward true.
 *
 * @param {number} [bias=0.5] - Probability of returning true (range [0, 1]).
 * @param {RandomFunction} [random=Math.random] - Function that returns a value in range [0, 1].
 * @returns {boolean} A random boolean.
 */
export const randomBool = (bias: number = 0.5, random: RandomFunction = Math.random): boolean => random() < bias;

/**
 * Return either 1 or -1 randomly.
 *
 * @param {RandomFunction} [random=Math.random] - Function that returns a value in range [0, 1].
 * @returns {number} 1 or -1.
 */
export const randomSign = (random: RandomFunction = Math.random): number => (random() < 0.5 ? 1 : -1);
