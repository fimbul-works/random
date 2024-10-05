import { Noise2D } from '../../types.js';
import { fBm2D } from '../fbm/fbm2d.js';
import { domainWarp2D } from '../domain-warp/domain-warp2d.js';

/**
 * A function that generates 2D Swiss turbulence noise.
 * @param x - The x-coordinate in 2D space.
 * @param y - The y-coordinate in 2D space.
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
type SwissTurbulenceNoise2D = (
  x: number,
  y: number,
  warpStrength: number,
  turbulenceFactor: number,
  octaves: number,
  lacunarity: number,
  gain: number,
  frequency: number,
  amplitude: number,
) => number;

/**
 * Creates a Swiss turbulence noise function for 2D noise.
 * @param noise2D - Base 2D noise function.
 * @returns A function that generates Swiss turbulence noise.
 */
export function swissTurbulence2D(noise2D: Noise2D): SwissTurbulenceNoise2D {
  const fBm = fBm2D(noise2D);
  const warp = domainWarp2D(noise2D);
  return (
    x: number,
    y: number,
    warpStrength: number = 0.15,
    turbulenceFactor: number = 4.0,
    octaves: number = 1,
    lacunarity: number = 2.0,
    gain: number = 0.5,
    frequency: number = 1.0,
    amplitude: number = 1.0,
  ) => {
    const q = warp(
      x,
      y,
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
      octaves,
      lacunarity,
      gain,
      frequency,
      amplitude,
    );
  };
}
