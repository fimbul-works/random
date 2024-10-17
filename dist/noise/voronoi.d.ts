import { Dimension, InferDimension, MetricName, VecType } from './types.js';
/**
 * Create an instance of Voronoi noise.
 * @param points - Array of 2D vectors [number, number].
 * @param metricName - Distance metric.
 * @returns A new Voronoi noise instance.
 */
export declare function createVoronoi<T extends [number, number][] | [number, number, number][]>(points: T, metricName?: MetricName): Voronoi<InferDimension<T>>;
/**
 * Voronoi noise in 2D and 3D.
 */
export declare class Voronoi<D extends Dimension> {
    private distanceFunction;
    points: VecType<D>[];
    /**
     * Creates a new Voronoi instance.
     * @param points - A list of vectors representing points in the space.
     * @param metricName - Distance function to use.
     */
    constructor(points: VecType<D>[], metricName?: MetricName);
    /**
     * Generates a Voronoi noise value for the given position.
     * @param position Current position.
     * @param e Minkowski exponent.
     * @returns A noise value between 0 and 1.
     */
    noise(position: VecType<D>, e?: number): number;
    /**
     * Returns the index of the closest point to the position.
     * @param position Current position.
     * @param e Minkowski exponent.
     * @returns The index of the closest point to the position.
     */
    closest(position: VecType<D>, e?: number): number;
}
