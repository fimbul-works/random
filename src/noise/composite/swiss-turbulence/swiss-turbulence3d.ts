import { Noise3D } from '../../types.js';
import { fBm3D } from '../fbm/fbm3d.js';
import { domainWarp3D } from '../domain-warp/domain-warp3d.js';

/**
 * A function that generates 3D Swiss turbulence noise.
 * @param x - The x-coordinate in 3D space.
 * @param y - The y-coordinate in 3D space.
 * @param z - The z-coordinate in 3D space.
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
type SwissTurbulenceNoise3D = (
  x: number,
  y: number,
  z: number,
  warpStrength: number,
  turbulenceFactor: number,
  octaves: number,
  lacunarity: number,
  gain: number,
  frequency: number,
  amplitude: number,
) => number;

/**
 * Creates a Swiss turbulence noise function for 3D noise.
 * @param noise3D Base 3D noise function.
 * @returns A function that generates Swiss turbulence noise.
 */
export function swissTurbulence3D(noise3D: Noise3D): SwissTurbulenceNoise3D {
  const fBm = fBm3D(noise3D);
  const warp = domainWarp3D(noise3D);
  return (
    x: number,
    y: number,
    z: number,
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
      z,
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
      octaves,
      gain,
      lacunarity,
      frequency,
      amplitude,
    );
  };
}
