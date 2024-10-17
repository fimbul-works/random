import { Noise2D } from '../../types.js';
/**
 * 2D curl noise.
 * @param x - X coordinate in 2D space.
 * @param y - Y coordinate in 2D space.
 * @returns A 2D vector [curlY, -curlX] representing the curl of the noise field at (x, y).
 */
export type CurlNoise2D = (x: number, y: number) => [number, number];
/**
 * Creates a Curl noise function for 2D noise.
 * @param noise2D - Base 2D noise function.
 * @param epsilon - Small value used for numerical differentiation. Controls the sampling distance
 *                  for derivative approximation. Smaller values generally give more accurate results,
 *                  but very small values may cause numerical instability.
 * @returns A function that generates 2D Curl noise.
 */
export declare function curlNoise2D(noise2D: Noise2D, epsilon?: number): CurlNoise2D;
/**
 * Creates a curl noise function based on a given 2D noise function.
 * @param noise2D - Base 2D noise function.
 * @param curlStrength - The strength of the curl noise.
 * @param curlScale - The scale of the curl noise.
 * @returns A new 2D noise function that incorporates the curl effect.
 */
export declare function createCurledNoise2D(noise2D: Noise2D, curlStrength?: number, curlScale?: number): Noise2D;
export declare function createCurlMagnitudeNoise2D(noise2D: Noise2D, epsilon?: number): Noise2D;
export declare function createCurlAngleNoise2D(noise2D: Noise2D, epsilon?: number): Noise2D;
