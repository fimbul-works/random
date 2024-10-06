import { Dimension, DistanceFunction, MetricName } from './types';

/**
 * Calculates the Euclidean distance between two 2D vectors.
 * @param v - The first vector.
 * @param w - The second vector.
 * @returns The distance between the vectors.
 */
export function distanceEuclidian2D(
  v: [number, number],
  w: [number, number],
): number {
  return Math.sqrt((v[0] - w[0]) ** 2 + (v[1] - w[1]) ** 2);
}

/**
 * Calculates the Euclidean distance between two 3D vectors.
 * @param v - The first vector.
 * @param w - The second vector.
 * @returns The distance between the vectors.
 */
export function distanceEuclidian3D(
  v: [number, number, number],
  w: [number, number, number],
) {
  return Math.sqrt(
    (v[0] - w[0]) ** 2 + (v[1] - w[1]) ** 2 + (v[2] - w[2]) ** 2,
  );
}

/**
 * Calculates the Chebyshev distance between two 2D vectors.
 * @param v - The first vector.
 * @param w - The second vector.
 * @returns The Chebyshev distance between the vectors.
 */
export function distanceChebyshev2D(
  v: [number, number],
  w: [number, number],
): number {
  const absX = Math.abs(v[0] - w[0]);
  const absY = Math.abs(v[1] - w[1]);
  return absX >= absY ? absX : absY;
}

/**
 * Calculates the Chebyshev distance between two 3D vectors.
 * @param v - The first vector.
 * @param w - The second vector.
 * @returns The Chebyshev distance between the vectors.
 */
export function distanceChebyshev3D(
  v: [number, number, number],
  w: [number, number, number],
) {
  const absX = Math.abs(v[0] - w[0]);
  const absY = Math.abs(v[1] - w[1]);
  const absZ = Math.abs(v[2] - w[2]);
  return absX >= absY && absX >= absZ ? absX : absY >= absZ ? absY : absZ;
}

/**
 * Calculates the Manhattan distance between two 2D vectors.
 * @param v - The first vector.
 * @param w - The second vector.
 * @returns The Manhattan distance between the vectors.
 */
export function distanceManhattan2D(
  v: [number, number],
  w: [number, number],
): number {
  return Math.abs(v[0] - w[0]) + Math.abs(v[1] - w[1]);
}

/**
 * Calculates the Manhattan distance between two 3D vectors.
 * @param v - The first vector.
 * @param w - The second vector.
 * @returns The Manhattan distance between the vectors.
 */
export function distanceManhattan3D(
  v: [number, number, number],
  w: [number, number, number],
) {
  return Math.abs(v[0] - w[0]) + Math.abs(v[1] - w[1]) + Math.abs(v[2] - w[2]);
}

/**
 * Calculates the Minkowski distance between two 2D vectors.
 * @param v - The first vector.
 * @param w - The second vector.
 * @param p - The order of the Minkowski distance.
 * @returns The Minkowski distance between the vectors.
 */
export function distanceMinkowski2D(
  v: [number, number],
  w: [number, number],
  p: number,
): number {
  return (Math.abs(v[0] - w[0]) ** p + Math.abs(v[1] - w[1]) ** p) ** (1 / p);
}

/**
 * Calculates the Minkowski distance between two 3D vectors.
 * @param v - The first vector.
 * @param w - The second vector.
 * @param p - The order of the Minkowski distance.
 * @returns The Minkowski distance between the vectors.
 */
export function distanceMinkowski3D(
  v: [number, number, number],
  w: [number, number, number],
  p: number,
) {
  return (
    (Math.abs(v[0] - w[0]) ** p +
      Math.abs(v[1] - w[1]) ** p +
      Math.abs(v[2] - w[2]) ** p) **
    (1 / p)
  );
}

/**
 * Get a distance function based on dimensions and metric name.
 * @param dimensions - Number of dimensions. Either 2 or 3.
 * @param metricName - Name of the distance function.
 * @returns The distance function for the set dimensions.
 */
export function getDistanceFunction<D extends Dimension>(
  dimensions: Dimension,
  metricName: MetricName,
): DistanceFunction<D> {
  switch (metricName) {
    case 'euclidean':
    default:
      return (
        dimensions === 3 ? distanceEuclidian3D : distanceEuclidian2D
      ) as DistanceFunction<D>;
    case 'chebyshev':
      return (
        dimensions === 3 ? distanceChebyshev3D : distanceChebyshev2D
      ) as DistanceFunction<D>;
    case 'manhattan':
      return (
        dimensions === 3 ? distanceManhattan3D : distanceManhattan2D
      ) as DistanceFunction<D>;
    case 'minkowski':
      return (
        dimensions === 3 ? distanceMinkowski3D : distanceMinkowski2D
      ) as DistanceFunction<D>;
  }
}
