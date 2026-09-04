import { fastMix } from "@fimbul-works/hash";
import { INT_32 } from "./constants.js";
import type { Seed } from "./types.js";

/**
 * Hash a string to a 32-bit unsigned integer using the fastMix hashing function.
 *
 * @param str - String to hash.
 * @returns Function that returns a 32-bit unsigned integer hash.
 */
export const hashString = (str: string): (() => number) => {
  let h = 0x6a09e667 ^ str.length;
  let counter = 0;

  for (let i = 0; i < str.length; i++) {
    h = fastMix(str.charCodeAt(i), h);
  }

  return () => (h = fastMix(h, counter++) >>> 0);
};

/**
 * Normalizes a seed value into a 32-bit unsigned integer.
 * Accepts both numbers and strings.
 *
 * @param seed - Seed number.
 * @returns Normalized seed as a 32-bit unsigned integer.
 */
export const normalizeSeed = (seed: Seed): number =>
  typeof seed === "string" ? hashString(seed)() : (seed < 1 ? seed * INT_32 : seed) >>> 0;

/**
 * Expand a seed value into a non-zero 32-bit vector of length n using the fastMix hashing function.
 * Accepts both numbers and strings.
 *
 * @param seed - Seed value (number or string).
 * @param n - Length of vector to expand to.
 * @returns Non-zero 32-bit vector.
 */
export const expandSeed = (seed: Seed, n: number): number[] => {
  const v: number[] = [];

  if (typeof seed === "string") {
    const next = hashString(seed);
    for (let i = 0; i < n; i++) {
      v[i] = next();
    }
  } else {
    let s = normalizeSeed(seed);
    for (let i = 0; i < n; i++) {
      v[i] = s = fastMix(s, i + 1) >>> 0;
    }
  }

  return v;
};
