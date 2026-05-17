import { fnv1a64Hash, getBytes } from "@fimbul-works/util-hash";
import { U32_2_POW_32 } from "./rng/constants.js";
import { splitMix64 } from "./rng/splitmix64.js";
import type { RandomNumberGenerator } from "./types.js";

/**
 * Define a property on a target.
 * Omitting the `set` parameter will produce a read-only property.
 *
 * @template T
 * @param {any} target - Target to add a property
 * @param {string} prop - Property name
 * @param {() => T} get - Value getter function
 * @param {(value: T) => void} set - Optional value setter function
 */
export const defineProp = <T>(target: any, prop: string, get: () => T, set?: (value: T) => void): void =>
  Object.defineProperty(target, prop, {
    get,
    set,
    enumerable: true,
    writable: false,
  });

/**
 * Rotate bits left around 32 bits.
 *
 * @param {number} x - Number to rotate bits in
 * @param {number} k - How many bits we shift left
 */
export const rotl = (x: number, k: number): number => ((x << k) | (x >>> (32 - k))) >>> 0;

/**
 * Expand to N 32-bit words using FNV-1a64 + SplitMix64 (taking low 32 bits each step)
 * @param {unknown} seed - Seed value
 * @param {unknown} count - How many numbers to expand to
 * @returns
 */
export const expand32From64 = (seed: unknown, count: number): Uint32Array => {
  const bytes = getBytes(seed);
  const h = fnv1a64Hash(bytes);
  const random = splitMix64(h);
  const out = new Uint32Array(count);
  for (let i = 0; i < count; i++) {
    out[i] = Number(random.int64() & 0xffffffffn) >>> 0;
  }
  return out;
};

/**
 * Apply basic decorartors to a random number generator.
 *
 * @param {() => number} random - Function that returns a value
 * @returns
 */
export const decorateRandom = <R = RandomNumberGenerator, S = number>(
  random: () => number,
  seed?: S,
  props: Record<string, () => any> = {},
): R => {
  // Add integer and double-precision functionality
  defineProp(random, "int", () => (random() * U32_2_POW_32) >>> 0);
  defineProp(random, "double", () => random() + ((random() * 0x200000) | 0) * 1.1102230246251565e-16);

  // Set seed if available
  if (seed !== undefined) {
    defineProp(random, "seed", () => seed);
  }

  // Add custom definitions
  for (const [prop, get] of Object.entries(props)) {
    defineProp(random, prop, get);
  }

  return random as R;
};
