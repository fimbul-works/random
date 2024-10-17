import { Noise3D } from '../../types.js';
/**
 * A function that applies domain warping to 3D noise.
 * @param x - The x-coordinate in 3D space.
 * @param y - The y-coordinate in 3D space.
 * @param z - The z-coordinate in 3D space.
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
 * @param offsetX2 - X offset for the third warp dimension.
 * @param offsetY2 - Y offset for the third warp dimension.
 * @param offsetZ2 - Z offset for the third warp dimension.
 * @returns A noise value in the range [-amplitude, amplitude].
 */
export type DomainWarpNoise3D = (x: number, y: number, z: number, warpStrength?: number, octaves?: number, lacunarity?: number, gain?: number, frequency?: number, amplitude?: number, offsetX1?: number, offsetY1?: number, offsetZ1?: number, offsetX2?: number, offsetY2?: number, offsetZ2?: number) => number;
/**
 * Creates a domain warping function for 3D noise.
 * @param noise3D - Base 3D noise function.
 * @returns A function that generates domain warped noise.
 */
export declare function domainWarp3D(noise3D: Noise3D): DomainWarpNoise3D;
