import { Noise2D } from '../../types.js';
/**
 * A function that applies domain warping to 2D noise.
 * @param x - The x-coordinate in 2D space.
 * @param y - The y-coordinate in 2D space.
 * @param warpStrength - The strength of the warping effect.
 * @param octaves - The number of octaves (layers) of noise to combine.
 * @param lacunarity - The multiplier that determines how quickly the frequency increases
 *                     for each successive octave.
 * @param gain - The multiplier that determines how quickly the amplitude diminishes
 *               for each successive octave. Also known as persistence.
 * @param frequency - The initial frequency of the noise.
 * @param amplitude - The initial maximum absolute value that the noise function can produce.
 * @param offsetX1 - X offset for the second warp dimension.
 * @param offsetY1 - Y offset for the second warp dimension.
 * @returns A noise value typically in the range [-amplitude, amplitude], although the
 *          exact range can vary based on the parameters used.
 */
export type DomainWarpNoise2D = (x: number, y: number, warpStrength?: number, octaves?: number, lacunarity?: number, gain?: number, frequency?: number, amplitude?: number, offsetX1?: number, offsetY1?: number) => number;
/**
 * Creates a domain warping function for 2D noise.
 * @param noise2D - Base 2D noise function.
 * @returns A function that generates domain warped noise.
 */
export declare function domainWarp2D(noise2D: Noise2D): DomainWarpNoise2D;
