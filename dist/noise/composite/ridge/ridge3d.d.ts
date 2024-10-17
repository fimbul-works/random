import { Noise3D } from '../../types.js';
/**
 * Creates a ridge noise function for 3D noise.
 * @param noise3D - Base 3D noise function.
 * @param x - X coordinate in 3D space.
 * @param y - Y coordinate in 3D space.
 * @param z - Z coordinate in 3D space.
 * @returns A ridge noise value in the range [0, 1].
 */
export declare function ridgeNoise3D(noise3D: Noise3D, x: number, y: number, z: number): number;
