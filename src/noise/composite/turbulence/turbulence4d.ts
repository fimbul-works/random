import { Noise4D } from '../../types.js';
import { OctaveNoise4D } from '../types.js';

/**
 * Creates a turbulence noise function for 4D noise.
 * @param noise4D - Base 4D noise function.
 * @returns A function that generates turbulence noise.
 */
export function turbulence4D(noise4D: Noise4D): OctaveNoise4D {
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
    let result = 0;
    let totalAmplitude = 0;
    for (let i = 0; i < octaves; i++) {
      result +=
        (Math.abs(
          noise4D(x * frequency, y * frequency, z * frequency, w * frequency),
        ) *
          2 -
          1) *
        amplitude;
      totalAmplitude += amplitude;
      frequency *= lacunarity;
      amplitude *= gain;
    }
    return result / totalAmplitude;
  };
}
