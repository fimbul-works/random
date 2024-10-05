import { Noise3D } from '../../types.js';
import { fBm3D } from '../fbm/fbm3d.js';

/**
 * A function that applies domain warping to 3D noise.
 * @param x - The x-coordinate in 3D space.
 * @param y - The y-coordinate in 3D space.
 * @param z - The z-coordinate in 3D space.
 * @param warpStrength - The strength of the warping effect.
 * @param octaves - The number of octaves (layers) of noise to combine.
 * @param lacunarity - The multiplier that determines how quickly the frequency increases
 *                     for each successive octave.
 * @param gain - The multiplier that determines how quickly the amplitude diminishes
 *               for each successive octave. Also known as persistence.
 * @param frequency - The initial frequency of the noise.
 * @param amplitude - The initial maximum absolute value that the noise function can produce.
 * @param offsetX1 - X offset for the second warp dimension.
 * @param offsetY1 - Y offset for the second warp dimension.
 * @param offsetZ1 - Z offset for the second warp dimension.
 * @param offsetX2 - X offset for the third warp dimension.
 * @param offsetY2 - Y offset for the third warp dimension.
 * @param offsetZ2 - Z offset for the third warp dimension.
 * @returns A noise value in the range [-amplitude, amplitude].
 */
type DomainWarpNoise3D = (
  x: number,
  y: number,
  z: number,
  warpStrength?: number,
  octaves?: number,
  lacunarity?: number,
  gain?: number,
  frequency?: number,
  amplitude?: number,
  offsetX1?: number,
  offsetY1?: number,
  offsetZ1?: number,
  offsetX2?: number,
  offsetY2?: number,
  offsetZ2?: number,
) => number;

/**
 * Creates a domain warping function for 3D noise.
 * @param noise3D - Base 3D noise function.
 * @returns A function that generates domain warped noise.
 */
export function domainWarp3D(noise3D: Noise3D): DomainWarpNoise3D {
  const warp3D = fBm3D(noise3D);
  return (
    x: number,
    y: number,
    z: number,
    warpStrength: number = 1.0,
    octaves: number = 1,
    lacunarity: number = 2.0,
    gain: number = 0.5,
    frequency: number = 1.0,
    amplitude: number = 1.0,
    offsetX1: number = 5.2,
    offsetY1: number = 1.3,
    offsetZ1: number = 2.8,
    offsetX2: number = 3.7,
    offsetY2: number = 6.1,
    offsetZ2: number = 4.2,
  ) => {
    const wx =
      warp3D(x, y, z, octaves, lacunarity, gain, frequency, amplitude) *
      warpStrength;
    const wy =
      warp3D(
        x + offsetX1,
        y + offsetY1,
        z + offsetZ1,
        octaves,
        lacunarity,
        gain,
        frequency,
        amplitude,
      ) * warpStrength;
    const wz =
      warp3D(
        x + offsetX2,
        y + offsetY2,
        z + offsetZ2,
        octaves,
        lacunarity,
        gain,
        frequency,
        amplitude,
      ) * warpStrength;
    return noise3D(x + wx, y + wy, z + wz);
  };
}
