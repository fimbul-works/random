import { Dimension, InferDimension, MetricName, VecType } from './types.js';
/**
 * Create an instance of Worley noise.
 * @param points - Array of 2D vectors [number, number].
 * @param metricName - Distance metric.
 * @returns A new Worley noise instance.
 */
export declare function createWorley<T extends [number, number][] | [number, number, number][]>(points: T, metricName?: MetricName): Worley<InferDimension<T>>;
/**
 * Worley noise in 2D and 3D.
 */
export declare class Worley<D extends Dimension> {
    private distanceFunction;
    points: VecType<D>[];
    /**
     * Creates a new Worley instance.
     * @param points - A list of [number, number] vectors representing points in the space.
     * @param metricName - Distance metric to use.
     */
    constructor(points: VecType<D>[], metricName: MetricName);
    /**
     * Generates a Worley noise value for the given position.
     * @param position Current position.
     * @param e Minkowski exponent.
     * @returns A noise value between 0 and 1.
     */
    noise(position: VecType<D>, e?: number): number;
    /**
     * Returns the distance from the first closest spot to the position.
     * @param position Current position.
     * @param e Minkowski exponent.
     * @returns The distance from the first closest spot to the position.
     */
    closest(position: VecType<D>, e?: number): number;
    /**
     * Returns the distance from the first and second closest spot to the position.
     * @param position Current position.
     * @param e Minkowski exponent.
     * @return The distance from the first and second closest spot to the position.
     */
    closest2(position: VecType<D>, e?: number): number[];
}
