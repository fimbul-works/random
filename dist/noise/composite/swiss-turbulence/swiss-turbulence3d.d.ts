import { Noise3D } from '../../types.js';
/**
 * A function that generates 3D Swiss turbulence noise.
 * @param x - The x-coordinate in 3D space.
 * @param y - The y-coordinate in 3D space.
 * @param z - The z-coordinate in 3D space.
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
export type SwissTurbulenceNoise3D = (x: number, y: number, z: number, warpStrength?: number, turbulenceFactor?: number, octaves?: number, lacunarity?: number, gain?: number, frequency?: number, amplitude?: number) => number;
/**
 * Creates a Swiss turbulence noise function for 3D noise.
 * @param noise3D Base 3D noise function.
 * @returns A function that generates Swiss turbulence noise.
 */
export declare function swissTurbulence3D(noise3D: Noise3D): SwissTurbulenceNoise3D;
