import { Noise4D } from '../../types.js';
/**
 * A function that applies domain warping to 4D noise.
 * @param x - The x-coordinate in 4D space.
 * @param y - The y-coordinate in 4D space.
 * @param z - The z-coordinate in 4D space.
 * @param w - The w-coordinate in 4D space.
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
 * @param offsetZ1 - Z offset for the second warp dimension.
 * @param offsetW1 - W offset for the second warp dimension.
 * @param offsetX2 - X offset for the third warp dimension.
 * @param offsetY2 - Y offset for the third warp dimension.
 * @param offsetZ2 - Z offset for the third warp dimension.
 * @param offsetW2 - Z offset for the third warp dimension.
 * @param offsetX3 - X offset for the fourth warp dimension.
 * @param offsetY3 - Y offset for the fourth warp dimension.
 * @param offsetZ3 - Z offset for the fourth warp dimension.
 * @param offsetW3 - Z offset for the fourth warp dimension.
 * @returns A noise value in the range [-amplitude, amplitude].
 */
export type DomainWarpNoise4D = (x: number, y: number, z: number, w: number, warpStrength?: number, octaves?: number, lacunarity?: number, gain?: number, frequency?: number, amplitude?: number, offsetX1?: number, offsetY1?: number, offsetZ1?: number, offsetW1?: number, offsetX2?: number, offsetY2?: number, offsetZ2?: number, offsetW2?: number, offsetX3?: number, offsetY3?: number, offsetZ3?: number, offsetW3?: number) => number;
/**
 * Creates a domain warping function for 4D noise.
 * @param noise4D - Base 4D noise function.
 * @returns A function that generates domain warped noise.
 */
export declare function domainWarp4D(noise4D: Noise4D): DomainWarpNoise4D;
