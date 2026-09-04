import { MASK_64 } from "../constants.js";

/**
 * Rotate bits left around 32 bits.
 *
 * @param {number} x - Number to rotate bits in.
 * @param {number} k - How many bits we shift left.
 * @returns {number} The rotated number.
 */
export const rotl = (x: number, k: number): number => ((x << k) | (x >>> (32 - k))) >>> 0;

/**
 * Rotatte bits left around 64 bits.
 * @param {bigint} x - Number to rotate bits in.
 * @param {bigint} k - How many bits we shift left.
 * @returns {bigint} The rotated number.
 */
export const rotl64 = (x: bigint, k: bigint): bigint => ((x << k) | (x >> (64n - k))) & MASK_64;
