import { Noise2D } from '../../types.js';

/**
 * 2D curl noise.
 * @param noise2D - 2D noise function.
 * @param x - X coordinate in 2D space.
 * @param y - Y coordinate in 2D space.
 * @param epsilon - Small value used for numerical differentiation. Controls the sampling distance
 *                  for derivative approximation. Smaller values generally give more accurate results,
 *                  but very small values may cause numerical instability.
 * @returns A 2D vector [curlY, -curlX] representing the curl of the noise field at (x, y).
 */
export function curl2D(
  noise2D: Noise2D,
  x: number,
  y: number,
  epsilon: number = 0.0001,
): [number, number] {
  // Find rate of change
  const x1 = noise2D(x + epsilon, y);
  const x2 = noise2D(x - epsilon, y);
  const y1 = noise2D(x, y + epsilon);
  const y2 = noise2D(x, y - epsilon);

  // Average to find approximate derivative
  const curlX = (x1 - x2) / (2 * epsilon);
  const curlY = (y1 - y2) / (2 * epsilon);

  return [curlY, -curlX];
}
