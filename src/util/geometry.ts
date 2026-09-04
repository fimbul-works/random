import type { RandomFunction } from "./types.js";

/**
 * Return a random 2D coordinate [x, y] distributed uniformly inside a circle of the specified radius.
 * Uses the square root scaling to ensure uniform area distribution.
 *
 * @param {number} [radius=1.0] - Radius of the circle.
 * @param {RandomFunction} [random=Math.random] - Function that returns a value in range [0, 1].
 * @returns {[number, number]} [x, y] coordinates.
 */
export const randomPointInCircle = (radius: number = 1.0, random: RandomFunction = Math.random): [number, number] => {
  const r = radius * Math.sqrt(random());
  const theta = random() * 2.0 * Math.PI;
  return [r * Math.cos(theta), r * Math.sin(theta)];
};

/**
 * Return a random 3D coordinate [x, y, z] distributed uniformly on the surface of a sphere of the specified radius.
 * Uses Archimedes' theorem for exact uniform distribution.
 *
 * @param {number} [radius=1.0] - Radius of the sphere.
 * @param {RandomFunction} [random=Math.random] - Function that returns a value in range [0, 1].
 * @returns {[number, number, number]} [x, y, z] coordinates.
 */
export const randomPointOnSphere = (
  radius: number = 1.0,
  random: RandomFunction = Math.random,
): [number, number, number] => {
  const u = random() * 2.0 - 1.0;
  const phi = random() * 2.0 * Math.PI;
  const r = radius * Math.sqrt(1.0 - u * u);
  return [r * Math.cos(phi), r * Math.sin(phi), radius * u];
};
