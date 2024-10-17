import { Noise4D } from '../../types.js';
/**
 * 4D ridged multi-fractal noise.
 * @param x - The X coordinate in 4D space.
 * @param y - The Y coordinate in 4D space.
 * @param z - The Z coordinate in 4D space.
 * @param w - The W coordinate in 4D space.
 * @param initialWeight - The initial weight.
 * @param octaves - The number of octaves (layers) of noise to combine.
 * @param lacunarity - The multiplier that determines how quickly the frequency increases
 *                     for each successive octave.
 * @param gain - The multiplier that determines how quickly the amplitude diminishes
 *               for each successive octave. Also known as persistence.
 * @param frequency - The initial frequency of the noise.
 * @param amplitude - The initial maximum absolute value that the noise function can produce.
 * @returns A noise value in the range [-amplitude, amplitude].
 */
export type RidgedMultifractalNoise4D = (x: number, y: number, z: number, w: number, initialWeight?: number, octaves?: number, lacunarity?: number, gain?: number, offset?: number, frequency?: number, amplitude?: number) => number;
/**
 * Creates a ridged multi-fractal noise function for 4D noise.
 * @param noise4D - Base 4D noise function.
 * @returns A function that generates ridged multi-fractal noise.
 */
export declare function ridgedMultifractal4D(noise4D: Noise4D): RidgedMultifractalNoise4D;
