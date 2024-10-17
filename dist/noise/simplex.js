import { createNoise2D, createNoise3D, createNoise4D } from 'simplex-noise';
/**
 * Create a 2D Simplex noise function.
 * @return {Noise2D} 2D Simplex noise function.
 */
export const createSimplexNoise2D = (random = Math.random) => createNoise2D(random);
/**
 * Create a 3D Simplex noise function.
 * @return {Noise3D} 3D Simplex noise function.
 */
export const createSimplexNoise3D = (random = Math.random) => createNoise3D(random);
/**
 * Create a 4D Simplex noise function.
 * @return {Noise4D} 4D Simplex noise function.
 */
export const createSimplexNoise4D = (random = Math.random) => createNoise4D(random);
