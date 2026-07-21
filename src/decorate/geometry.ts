import { randomPointInCircle, randomPointOnSphere } from "../geometry.js";
import type { RandomFunction } from "../types.js";
import { defineValue } from "./decorate.js";

export type RandomGeometryFunctions = {
  /**
   * Return a random 2D coordinate [x, y] distributed uniformly inside a circle of the specified radius.
   *
   * @param radius - Radius of the circle.
   * @returns [x, y] coordinates.
   */
  pointInCircle(radius?: number): [number, number];

  /**
   * Return a random 3D coordinate [x, y, z] distributed uniformly on the surface of a sphere of the specified radius.
   *
   * @param radius - Radius of the sphere.
   * @returns [x, y, z] coordinates.
   */
  pointOnSphere(radius?: number): [number, number, number];
};

export const curryPointInCircle =
  (random: RandomFunction) =>
  (radius: number = 1.0) =>
    randomPointInCircle(radius, random);

export const curryPointOnSphere =
  (random: RandomFunction) =>
  (radius: number = 1.0) =>
    randomPointOnSphere(radius, random);

/**
 * Apply geometry function decorators to a RandomFunction.
 *
 * @template T - Type of RandomFunction.
 * @param {T} random - Function that returns a value.
 * @returns {T & RandomGeometryFunctions} Decorated random number generator with geometry functions.
 */
export const decorateRandomWithGeometry = <T extends RandomFunction>(random: T): T & RandomGeometryFunctions => {
  defineValue(random, "pointInCircle", curryPointInCircle(random));
  defineValue(random, "pointOnSphere", curryPointOnSphere(random));

  return random as T & RandomGeometryFunctions;
};
