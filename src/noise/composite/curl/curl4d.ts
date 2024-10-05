import { Noise4D } from '../../types.js';

/**
 * 4D curl noise.
 * @param noise4D - 4D noise function.
 * @param x - X coordinate in 4D space.
 * @param y - Y coordinate in 4D space.
 * @param z - Z coordinate in 4D space.
 * @param w - W coordinate in 4D space.
 * @param epsilon - Small value used for numerical differentiation. Controls the sampling distance
 *                  for derivative approximation. Smaller values generally give more accurate results,
 *                  but very small values may cause numerical instability.
 * @returns A 2D vector [curlY, -curlX] representing the curl of the noise field at (x, y).
 */
export function curl4D(
  noise4D: Noise4D,
  x: number,
  y: number,
  z: number,
  w: number,
  epsilon: number = 0.0001,
): [number, number] {
  // Find rate of change
  const x1 = noise4D(x + epsilon, y, z, w);
  const x2 = noise4D(x - epsilon, y, z, w);
  const y1 = noise4D(x, y + epsilon, z, w);
  const y2 = noise4D(x, y - epsilon, z, w);

  // Average to find approximate derivative
  const curlX = (x1 - x2) / (2 * epsilon);
  const curlY = (y1 - y2) / (2 * epsilon);

  return [curlY, -curlX];
}
