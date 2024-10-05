import { Noise3D } from '../../types';
import { OctaveNoise3D } from '../types';

/**
 * Creates a turbulence noise function for 4D noise.
 * @param noise3D - Base 3D noise function.
 * @returns A function that generates turbulence noise.
 */
export function turbulence3D(noise3D: Noise3D): OctaveNoise3D {
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
    let result = 0;
    let totalAmplitude = 0;
    for (let i = 0; i < octaves; i++) {
      result +=
        (Math.abs(noise3D(x * frequency, y * frequency, z * frequency)) * 2 -
          1) *
        amplitude;
      totalAmplitude += amplitude;
      frequency *= lacunarity;
      amplitude *= gain;
    }
    return result / totalAmplitude;
  };
}
