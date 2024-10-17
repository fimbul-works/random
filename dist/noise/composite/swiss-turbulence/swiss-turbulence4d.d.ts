import { Noise4D } from '../../types.js';
/**
 * A function that generates 4D Swiss turbulence noise.
 * @param x - The x-coordinate in 4D space.
 * @param y - The y-coordinate in 4D space.
 * @param z - The z-coordinate in 4D space.
 * @param w - The z-coordinate in 4D space.
 * @param warpStrength - The strength of the warping effect.
 * @param turbulenceFactor - The scale of turbulence.
 * @param octaves - The number of octaves (layers) of noise to combine.
 * @param lacunarity - The multiplier that determines how quickly the frequency increases
 *                     for each successive octave.
 * @param gain - The multiplier that determines how quickly the amplitude diminishes
 *               for each successive octave. Also known as persistence.
 * @param frequency - The initial frequency of the noise.
 * @param amplitude - The initial maximum absolute value that the noise function can produce.
 * @returns A noise value in the range [-amplitude, amplitude].
 */
export type SwissTurbulenceNoise4D = (x: number, y: number, z: number, w: number, warpStrength?: number, turbulenceFactor?: number, octaves?: number, lacunarity?: number, gain?: number, frequency?: number, amplitude?: number) => number;
/**
 * Creates a Swiss turbulence noise function for 4D noise.
 * @param noise4D - Base 4D noise function.
 * @returns A function that generates Swiss turbulence noise.
 */
export declare function swissTurbulence4D(noise4D: Noise4D): SwissTurbulenceNoise4D;
