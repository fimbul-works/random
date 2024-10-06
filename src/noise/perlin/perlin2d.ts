import { RandomNumberGenerator, shuffleArray } from '../../random';
import { fade, lerp } from './util';

import { Noise2D } from '../types';

/**
 * Create a 2D Perlin Noise function.
 * @param random - Random number generator function.
 * @return 2D Perlin noise function.
 */
export function createPerlinNoise2D(
  random: RandomNumberGenerator = Math.random,
): Noise2D {
  let perm: number[] = [];
  for (let i = 0; i < 256; i++) {
    perm[i] = i;
  }
  perm = shuffleArray(perm, random);
  perm = [...perm, ...perm];

  function grad(hash: number, x: number, y: number): number {
    const h = hash & 7;
    const u = h < 4 ? x : y;
    const v = h < 4 ? y : x;
    return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
  }

  /**
   * Generate 2D Perlin noise.
   * @param x - X coordinate in 2D space.
   * @param y - Y coordinate in 2D space.
   * @return A noise value in the range [-1, 1].
   */
  return function noise2D(x: number, y: number): number {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;

    x -= Math.floor(x);
    y -= Math.floor(y);

    const u = fade(x);
    const v = fade(y);

    const A = perm[X] + Y,
      AA = perm[A],
      AB = perm[A + 1];
    const B = perm[X + 1] + Y,
      BA = perm[B],
      BB = perm[B + 1];

    return lerp(
      lerp(grad(perm[AA], x, y), grad(perm[BA], x - 1, y), u),
      lerp(grad(perm[AB], x, y - 1), grad(perm[BB], x - 1, y - 1), u),
      v,
    );
  };
}
