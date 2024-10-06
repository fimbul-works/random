import { RandomNumberGenerator, shuffleArray } from '../../random';
import { fade, lerp } from './util';

import { Noise3D } from '../types';

/**
 * Create a 3D Perlin Noise function.
 * @param random - Random number generator function.
 * @return 3D Perlin noise function.
 */
export function createPerlinNoise3D(
  random: RandomNumberGenerator = Math.random,
): Noise3D {
  let perm: number[] = [];
  for (let i = 0; i < 256; i++) {
    perm[i] = i;
  }
  perm = shuffleArray(perm, random);
  perm = [...perm, ...perm];

  function grad(hash: number, x: number, y: number, z: number): number {
    const h = hash & 15;
    const u = h < 8 ? x : y;
    const v = h < 4 ? y : h === 12 || h === 14 ? x : z;
    return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
  }

  /**
   * Generate 3D Perlin noise.
   * @param x - X coordinate in 3D space.
   * @param y - Y coordinate in 3D space.
   * @param z - Z coordinate in 3D space.
   * @return A noise value in the range [-1, 1].
   */
  return function noise3D(x: number, y: number, z: number): number {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    const Z = Math.floor(z) & 255;

    x -= Math.floor(x);
    y -= Math.floor(y);
    z -= Math.floor(z);

    const u = fade(x);
    const v = fade(y);
    const w = fade(z);

    const A = perm[X] + Y,
      AA = perm[A] + Z,
      AB = perm[A + 1] + Z;
    const B = perm[X + 1] + Y,
      BA = perm[B] + Z,
      BB = perm[B + 1] + Z;

    return lerp(
      lerp(
        lerp(grad(perm[AA], x, y, z), grad(perm[BA], x - 1, y, z), u),
        lerp(grad(perm[AB], x, y - 1, z), grad(perm[BB], x - 1, y - 1, z), u),
        v,
      ),
      lerp(
        lerp(
          grad(perm[AA + 1], x, y, z - 1),
          grad(perm[BA + 1], x - 1, y, z - 1),
          u,
        ),
        lerp(
          grad(perm[AB + 1], x, y - 1, z - 1),
          grad(perm[BB + 1], x - 1, y - 1, z - 1),
          u,
        ),
        v,
      ),
      w,
    );
  };
}
