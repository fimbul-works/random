import { randomPointInCircle, randomPointOnSphere } from "../util/geometry.js";
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

/**
 * Curried version of {@linkcode randomPointInCircle} bound to a PRNG function.
 *
 * @param {RandomFunction} random - Function that returns a floating point number in range [0, 1].
 * @returns {(radius?: number) => [number, number]} Function generating a uniform point in a circle.
 */
export const curryPointInCircle =
  (random: RandomFunction) =>
  (radius: number = 1.0): [number, number] =>
    randomPointInCircle(radius, random);

/**
 * Curried version of {@linkcode randomPointOnSphere} bound to a PRNG function.
 *
 * @param {RandomFunction} random - Function that returns a floating point number in range [0, 1].
 * @returns {(radius?: number) => [number, number, number]} Function generating a uniform point on a sphere surface.
 */
export const curryPointOnSphere =
  (random: RandomFunction) =>
  (radius: number = 1.0): [number, number, number] =>
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
