import { Noise2D } from '../../types.js';
import { OctaveNoise2D } from '../types.js';

/**
 * Creates a 2D fractal Brownian motion (fBm) noise function.
 * @param noise2D - The base 2D noise function.
 * @returns A function that generates fBm noise in the range [-amplitude, amplitude].
 */
export function fBm2D(noise2D: Noise2D): OctaveNoise2D {
  return (
    x: number,
    y: number,
    octaves: number = 2,
    lacunarity: number = 2.0,
    gain: number = 0.5,
    frequency: number = 1.0,
    amplitude: number = 1.0,
  ) => {
    let total: number = 0;
    let maxValue: number = 0;
    for (let i = 0; i < octaves; i++) {
      total += amplitude * noise2D(x * frequency, y * frequency);
      maxValue += amplitude;
      amplitude *= gain;
      frequency *= lacunarity;
    }
    return total / maxValue;
  };
}
