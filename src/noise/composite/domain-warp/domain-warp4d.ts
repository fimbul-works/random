import { Noise4D } from '../../types.js';
import { fBm4D } from '../fbm/fbm4d.js';

/**
 * A function that applies domain warping to 4D noise.
 * @param x - The x-coordinate in 4D space.
 * @param y - The y-coordinate in 4D space.
 * @param z - The z-coordinate in 4D space.
 * @param w - The w-coordinate in 4D space.
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
 * @param offsetW1 - W offset for the second warp dimension.
 * @param offsetX2 - X offset for the third warp dimension.
 * @param offsetY2 - Y offset for the third warp dimension.
 * @param offsetZ2 - Z offset for the third warp dimension.
 * @param offsetW2 - Z offset for the third warp dimension.
 * @param offsetX3 - X offset for the fourth warp dimension.
 * @param offsetY3 - Y offset for the fourth warp dimension.
 * @param offsetZ3 - Z offset for the fourth warp dimension.
 * @param offsetW3 - Z offset for the fourth warp dimension.
 * @returns A noise value in the range [-amplitude, amplitude].
 */
type DomainWarpNoise4D = (
  x: number,
  y: number,
  z: number,
  w: number,
  warpStrength?: number,
  warpOctaves?: number,
  offsetX1?: number,
  offsetY1?: number,
  offsetZ1?: number,
  offsetW1?: number,
  offsetX2?: number,
  offsetY2?: number,
  offsetZ2?: number,
  offsetW2?: number,
  offsetX3?: number,
  offsetY3?: number,
  offsetZ3?: number,
  offsetW3?: number,
) => number;

/**
 * Creates a domain warping function for 4D noise.
 * @param noise4D - Base 4D noise function.
 * @returns A function that generates domain warped noise.
 */
export function domainWarp4D(noise4D: Noise4D): DomainWarpNoise4D {
  const warp4D = fBm4D(noise4D);
  return (
    x: number,
    y: number,
    z: number,
    w: number,
    warpStrength: number = 1.0,
    octaves: number = 1,
    lacunarity: number = 2.0,
    gain: number = 0.5,
    frequency: number = 1.0,
    amplitude: number = 1.0,
    offsetX1: number = 5.2,
    offsetY1: number = 1.3,
    offsetZ1: number = 2.8,
    offsetW1: number = 7.1,
    offsetX2: number = 3.7,
    offsetY2: number = 6.1,
    offsetZ2: number = 4.2,
    offsetW2: number = 8.3,
    offsetX3: number = 1.9,
    offsetY3: number = 9.4,
    offsetZ3: number = 5.0,
    offsetW3: number = 3.2,
  ) => {
    const wx =
      warp4D(x, y, z, w, octaves, lacunarity, gain, frequency, amplitude) *
      warpStrength;
    const wy =
      warp4D(
        x + offsetX1,
        y + offsetY1,
        z + offsetZ1,
        w + offsetW1,
        octaves,
        lacunarity,
        gain,
        frequency,
        amplitude,
      ) * warpStrength;
    const wz =
      warp4D(
        x + offsetX2,
        y + offsetY2,
        z + offsetZ2,
        w + offsetW2,
        octaves,
        lacunarity,
        gain,
        frequency,
        amplitude,
      ) * warpStrength;
    const ww =
      warp4D(
        x + offsetX3,
        y + offsetY3,
        z + offsetZ3,
        w + offsetW3,
        octaves,
        lacunarity,
        gain,
        frequency,
        amplitude,
      ) * warpStrength;
    return noise4D(x + wx, y + wy, z + wz, w + ww);
  };
}
