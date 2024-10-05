import { Noise2D } from '../../types.js';
import { OctaveNoise2D } from '../types.js';

/**
 * Creates a turbulence noise function for 2D noise.
 * @param noise2D - Base 2D noise function.
 * @returns A function that generates turbulence noise.
 */
export function turbulence2D(noise2D: Noise2D): OctaveNoise2D {
  return (
    x: number,
    y: number,
    octaves: number = 2,
    lacunarity: number = 2.0,
    gain: number = 0.5,
    frequency: number = 1.0,
    amplitude: number = 1.0,
  ) => {
    let result = 0;
    let totalAmplitude = 0;
    for (let i = 0; i < octaves; i++) {
      result +=
        (Math.abs(noise2D(x * frequency, y * frequency)) * 2 - 1) * amplitude;
      totalAmplitude += amplitude;
      frequency *= lacunarity;
      amplitude *= gain;
    }
    return result / totalAmplitude;
  };
}
