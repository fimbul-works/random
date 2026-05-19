import type { RandomFunction } from "./types";

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
