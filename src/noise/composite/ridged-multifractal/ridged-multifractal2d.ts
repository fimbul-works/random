import { Noise2D } from '../../types.js';

/**
 * 2D ridged multi-fractal noise.
 * @param x - The X coordinate in 2D space.
 * @param y - The Y coordinate in 2D space.
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
export type RidgedMultifractalNoise2D = (
  x: number,
  y: number,
  initialWeight?: number,
  octaves?: number,
  lacunarity?: number,
  gain?: number,
  offset?: number,
  frequency?: number,
  amplitude?: number,
) => number;

/**
 * Creates a ridged multi-fractal noise function for 2D noise.
 * @param noise2D - Base 2D noise function.
 * @returns A function that generates ridged multi-fractal noise.
 */
export function ridgedMultifractal2D(
  noise2D: Noise2D,
): RidgedMultifractalNoise2D {
  return (
    x: number,
    y: number,
    initialWeight: number = 1.0,
    octaves: number = 2,
    lacunarity: number = 2.0,
    gain: number = 0.5,
    offset: number = 1.0,
    frequency: number = 1.0,
    amplitude: number = 1.0,
  ) => {
    let result = 0;
    let weight = initialWeight;
    for (let i = 0; i < octaves; i++) {
      let signal = offset - Math.abs(noise2D(x * frequency, y * frequency));
      signal *= signal;
      result += signal * amplitude * weight;
      frequency *= lacunarity;
      amplitude *= gain;
      weight = signal * gain;
    }
    return result;
  };
}
