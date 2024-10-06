import { RandomNumberGenerator } from '../types';

/**
 * Creates a new Mulberry32 random number generator.
 * @param seed - The seed value for the random number generator.
 * @returns A new random number generator.
 */
export function mulberry32(seed: number): RandomNumberGenerator {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
