import { Noise2D, Noise3D, Noise4D } from './types.js';
import { createNoise2D, createNoise3D, createNoise4D } from 'simplex-noise';

import { RandomNumberGenerator } from '../random/types.js';

/**
 * Create a 2D Simplex noise function.
 * @return {Noise2D} 2D Simplex noise function.
 */
export const createSimplexNoise2D = (
  random: RandomNumberGenerator = Math.random,
): Noise2D => createNoise2D(random);

/**
 * Create a 3D Simplex noise function.
 * @return {Noise3D} 3D Simplex noise function.
 */
export const createSimplexNoise3D = (
  random: RandomNumberGenerator = Math.random,
): Noise3D => createNoise3D(random);

/**
 * Create a 4D Simplex noise function.
 * @return {Noise4D} 4D Simplex noise function.
 */
export const createSimplexNoise4D = (
  random: RandomNumberGenerator = Math.random,
): Noise4D => createNoise4D(random);
