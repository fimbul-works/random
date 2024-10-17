import { Noise2D } from '../../types.js';
/**
 * Creates a ridge noise function for 2D noise.
 * @param noise2D - Base 2D noise function.
 * @param x - X coordinate in 2D space.
 * @param y - Y coordinate in 2D space.
 * @returns A ridge noise value in the range [0, 1].
 */
export declare function ridgeNoise2D(noise2D: Noise2D, x: number, y: number): number;
