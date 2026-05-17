import { fnv1aHash, getBytes } from "@fimbul-works/hash";
import { INT_32 } from "./constants.js";
import { createSplitMix32 } from "./rng/splitmix32.js";
import type { RandomNumberGenerator } from "./types.js";

/**
 * Define a property on a target.
 * Omitting the `set` parameter will produce a read-only property.
 *
 * @template T
 * @param {any} target - Target to add a property
 * @param {string} prop - Property name
 * @param {T} get - Value getter function
 * @param {(value: T) => void} set - Optional value setter function
 */
export const defineProp = <T>(target: any, prop: string, get: T, set?: (value: T) => void): void =>
  Object.defineProperty(target, prop, {
    get: () => get,
    set: set !== undefined ? (value: T) => set(value) : undefined,
    enumerable: true,
  });

/**
 * Rotate bits left around 32 bits.
 *
 * @param {number} x - Number to rotate bits in
 * @param {number} k - How many bits we shift left
 */
export const rotl = (x: number, k: number): number => ((x << k) | (x >>> (32 - k))) >>> 0;

/**
 * Expand to N 32-bit words from seed bytes via FNV-1a32 then SplitMix32
 * @param {unknown} seed - Seed value
 * @param {unknown} count - How many numbers to expand to
 * @returns
 */
export const expand32 = (seed: unknown, count: number): Uint32Array => {
  const bytes = getBytes(seed);
  const h = fnv1aHash(bytes);
  const random = createSplitMix32(h);
  const out = new Uint32Array(count);
  for (let i = 0; i < count; i++) {
    out[i] = random() >>> 0;
  }
  return out;
};

/**
 * Create a non-zero 32-bit vector of length n (avoid all-zero vector)
 *
 * @param {unknown} seed - Seed value
 * @param {number} n - Length of vector to expand to
 * @returns {Uint32Array} Non-zero 32-bit vector
 */
export const nonZeroVector32 = (seed: unknown, n: number): Uint32Array => {
  const v = expand32(seed, n);

  let allZero = true;
  for (let i = 0; i < v.length; i++) {
    if (v[i] !== 0) {
      allZero = false;
      break;
    }
  }

  if (allZero) {
    v[0] = 1;
  }

  return v;
};

/**
 * Apply basic decorartors to a PRNG.
 *
 * @template R - Decorated PRNG type
 * @template S - Seed type
 * @param {() => number} random - Function that returns a value
 * @param {number} seed - Seed value
 * @param {Record<string, () => any>} props - Additional properties
 * @returns {R} Decorated PRNG
 */
export const decorateRandom = <R = RandomNumberGenerator>(
  random: () => number,
  seed?: number,
  props: Record<string, () => any> = {},
): R => {
    // Set seed if available
  if (seed !== undefined) {
    defineProp(random, "seed", seed);
  }

  // Additional functionality
  defineProp(random, "int", () => (random() * INT_32) >>> 0);
  defineProp(random, "int64", () => (BigInt((random() * INT_32) >>> 0) << 32n) | BigInt((random() * INT_32) >>> 0));
  defineProp(random, "double", () => random() + ((random() * 0x200000) | 0) * 1.1102230246251565e-16);

  // Add custom definitions
  for (const [prop, get] of Object.entries(props)) {
    defineProp(random, prop, get);
  }

  return random as R;
};
