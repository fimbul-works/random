import { Noise4D } from '../../types.js';
import { OctaveNoise4D } from '../types.js';

/**
 * Creates a 4D fractal Brownian motion (fBm) noise function.
 * @param noise2D - Base 4D noise function.
 * @returns A function that generates fBm noise in the range [-amplitude, amplitude].
 */
export function fBm4D(noise4D: Noise4D): OctaveNoise4D {
  return (
    x: number,
    y: number,
    z: number,
    w: number,
    octaves: number = 2,
    lacunarity: number = 2.0,
    gain: number = 0.5,
    frequency: number = 1.0,
    amplitude: number = 1.0,
  ) => {
    let total: number = 0;
    let maxValue: number = 0;
    for (let i = 0; i < octaves; i++) {
      total +=
        amplitude *
        noise4D(x * frequency, y * frequency, z * frequency, w * frequency);
      maxValue += amplitude;
      amplitude *= gain;
      frequency *= lacunarity;
    }
    return total / maxValue;
  };
}
