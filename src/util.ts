import { fastMix } from "@fimbul-works/hash";
import { INT_32 } from "./constants.js";

/**
 * Normalizes a seed number into a 32-bit unsigned integer.
 *
 * @param {number} seed - Seed number.
 * @returns {number} Normalized seed.
 */
export const normalizeSeed = (seed: number) => (seed < 1 ? seed * INT_32 : seed) >>> 0;

/**
 * Expand a seed number into a non-zero 32-bit vector of length n using the fastMix hashing function.
 *
 * @param {number} seed - Seed value.
 * @param {number} n - Length of vector to expand to.
 * @returns {number[]} Non-zero 32-bit vector.
 */
export const expandSeed = (seed: number, n: number): number[] => {
  const v: number[] = [];
  let s = normalizeSeed(seed);
  for (let i = 0; i < n; i++) {
    v[i] = s = fastMix(s, s + i) >>> 0;
  }
  return v;
};

/**
 * Rotate bits left around 32 bits.
 *
 * @param {number} x - Number to rotate bits in.
 * @param {number} k - How many bits we shift left.
 */
export const rotl = (x: number, k: number): number => ((x << k) | (x >>> (32 - k))) >>> 0;
