import { Noise3D } from '../../types.js';
import { OctaveNoise3D } from '../types.js';

/**
 * Creates a 3D fractal Brownian motion (fBm) noise function.
 * @param noise3D - TBase 3D noise function.
 * @returns A function that generates fBm noise in the range [-amplitude, amplitude].
 */
export function fBm3D(noise3D: Noise3D): OctaveNoise3D {
  return (
    x: number,
    y: number,
    z: number,
    octaves: number = 2,
    lacunarity: number = 2.0,
    gain: number = 0.5,
    frequency: number = 1.0,
    amplitude: number = 1.0,
  ) => {
    let total: number = 0;
    let maxValue: number = 0;
    for (let i = 0; i < octaves; i++) {
      total += amplitude * noise3D(x * frequency, y * frequency, z * frequency);
      maxValue += amplitude;
      amplitude *= gain;
      frequency *= lacunarity;
    }
    return total / maxValue;
  };
}
