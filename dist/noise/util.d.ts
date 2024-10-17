import { Dimension, DistanceFunction, MetricName } from './types';
/**
 * Calculates the Euclidean distance between two 2D vectors.
 * @param v - The first vector.
 * @param w - The second vector.
 * @returns The distance between the vectors.
 */
export declare function distanceEuclidian2D(v: [number, number], w: [number, number]): number;
/**
 * Calculates the Euclidean distance between two 3D vectors.
 * @param v - The first vector.
 * @param w - The second vector.
 * @returns The distance between the vectors.
 */
export declare function distanceEuclidian3D(v: [number, number, number], w: [number, number, number]): number;
/**
 * Calculates the Chebyshev distance between two 2D vectors.
 * @param v - The first vector.
 * @param w - The second vector.
 * @returns The Chebyshev distance between the vectors.
 */
export declare function distanceChebyshev2D(v: [number, number], w: [number, number]): number;
/**
 * Calculates the Chebyshev distance between two 3D vectors.
 * @param v - The first vector.
 * @param w - The second vector.
 * @returns The Chebyshev distance between the vectors.
 */
export declare function distanceChebyshev3D(v: [number, number, number], w: [number, number, number]): number;
/**
 * Calculates the Manhattan distance between two 2D vectors.
 * @param v - The first vector.
 * @param w - The second vector.
 * @returns The Manhattan distance between the vectors.
 */
export declare function distanceManhattan2D(v: [number, number], w: [number, number]): number;
/**
 * Calculates the Manhattan distance between two 3D vectors.
 * @param v - The first vector.
 * @param w - The second vector.
 * @returns The Manhattan distance between the vectors.
 */
export declare function distanceManhattan3D(v: [number, number, number], w: [number, number, number]): number;
/**
 * Calculates the Minkowski distance between two 2D vectors.
 * @param v - The first vector.
 * @param w - The second vector.
 * @param p - The order of the Minkowski distance.
 * @returns The Minkowski distance between the vectors.
 */
export declare function distanceMinkowski2D(v: [number, number], w: [number, number], p: number): number;
/**
 * Calculates the Minkowski distance between two 3D vectors.
 * @param v - The first vector.
 * @param w - The second vector.
 * @param p - The order of the Minkowski distance.
 * @returns The Minkowski distance between the vectors.
 */
export declare function distanceMinkowski3D(v: [number, number, number], w: [number, number, number], p: number): number;
/**
 * Get a distance function based on dimensions and metric name.
 * @param dimensions - Number of dimensions. Either 2 or 3.
 * @param metricName - Name of the distance function.
 * @returns The distance function for the set dimensions.
 */
export declare function getDistanceFunction<D extends Dimension>(dimensions: Dimension, metricName: MetricName): DistanceFunction<D>;
