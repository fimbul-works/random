import { Noise3D } from '../../types.js';

/**
 * 3D curl noise.
 * @param noise3D - 3D noise function.
 * @param x - X coordinate in 3D space.
 * @param y - Y coordinate in 3D space.
 * @param z - Z coordinate in 3D space.
 * @param epsilon - Small value used for numerical differentiation. Controls the sampling distance
 *                  for derivative approximation. Smaller values generally give more accurate results,
 *                  but very small values may cause numerical instability.
 * @returns A 2D vector [curlY, -curlX] representing the curl of the noise field at (x, y).
 */
export function curl3D(
  noise3D: Noise3D,
  x: number,
  y: number,
  z: number,
  epsilon: number = 0.0001,
): [number, number] {
  // Find rate of change
  const x1 = noise3D(x + epsilon, y, z);
  const x2 = noise3D(x - epsilon, y, z);
  const y1 = noise3D(x, y + epsilon, z);
  const y2 = noise3D(x, y - epsilon, z);

  // Average to find approximate derivative
  const curlX = (x1 - x2) / (2 * epsilon);
  const curlY = (y1 - y2) / (2 * epsilon);

  return [curlY, -curlX];
}
