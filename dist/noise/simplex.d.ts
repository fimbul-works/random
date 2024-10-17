import { Noise2D, Noise3D, Noise4D } from './types.js';
import { RandomNumberGenerator } from '../random/types.js';
/**
 * Create a 2D Simplex noise function.
 * @return {Noise2D} 2D Simplex noise function.
 */
export declare const createSimplexNoise2D: (random?: RandomNumberGenerator) => Noise2D;
/**
 * Create a 3D Simplex noise function.
 * @return {Noise3D} 3D Simplex noise function.
 */
export declare const createSimplexNoise3D: (random?: RandomNumberGenerator) => Noise3D;
/**
 * Create a 4D Simplex noise function.
 * @return {Noise4D} 4D Simplex noise function.
 */
export declare const createSimplexNoise4D: (random?: RandomNumberGenerator) => Noise4D;
