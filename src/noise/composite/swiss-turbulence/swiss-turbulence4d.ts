import { Noise4D } from '../../types.js';
import { domainWarp4D } from '../domain-warp/domain-warp4d.js';
import { fBm4D } from '../fbm/fbm4d.js';

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
export type SwissTurbulenceNoise4D = (
  x: number,
  y: number,
  z: number,
  w: number,
  warpStrength?: number,
  turbulenceFactor?: number,
  octaves?: number,
  lacunarity?: number,
  gain?: number,
  frequency?: number,
  amplitude?: number,
) => number;

/**
 * Creates a Swiss turbulence noise function for 4D noise.
 * @param noise4D - Base 4D noise function.
 * @returns A function that generates Swiss turbulence noise.
 */
export function swissTurbulence4D(noise4D: Noise4D): SwissTurbulenceNoise4D {
  const fBm = fBm4D(noise4D);
  const warp = domainWarp4D(noise4D);
  return (
    x: number,
    y: number,
    z: number,
    w: number,
    warpStrength: number = 0.15,
    turbulenceFactor: number = 1.0,
    octaves: number = 1,
    lacunarity: number = 2.0,
    gain: number = 0.5,
    frequency: number = 1.0,
    amplitude: number = 1.0,
  ) => {
    const q = warp(
      x,
      y,
      z,
      w,
      warpStrength,
      octaves,
      lacunarity,
      gain,
      frequency,
      amplitude,
    );
    const r = warp(
      x + 5.2,
      y + 1.3,
      z + 2.8,
      w + 3.7,
      warpStrength,
      octaves,
      lacunarity,
      gain,
      frequency,
      amplitude,
    );
    return fBm(
      x + turbulenceFactor * q,
      y + turbulenceFactor * r,
      z,
      w,
      octaves,
      lacunarity,
      gain,
      frequency,
      amplitude,
    );
  };
}
