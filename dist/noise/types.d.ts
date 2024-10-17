/**
 * Two dimensional noise.
 */
export type Noise2D = (x: number, y: number) => number;
/**
 * Three dimensional noise.
 */
export type Noise3D = (x: number, y: number, z: number) => number;
/**
 * Four dimensional noise.
 */
export type Noise4D = (x: number, y: number, z: number, w: number) => number;
/**
 * Number of of dimensions.
 */
export type Dimension = 2 | 3;
/**
 * Type of distance function.
 */
export type MetricName = 'euclidean' | 'manhattan' | 'chebyshev' | 'minkowski';
/**
 * Vector types based on dimentions.
 */
export type VecType<D extends Dimension> = D extends 2 ? [number, number] : [number, number, number];
/**
 * Distance function.
 */
export type DistanceFunction<D extends Dimension> = (v1: VecType<D>, v2: VecType<D>, e?: number) => number;
export type InferDimension<T extends number[][]> = T[number] extends [
    number,
    number
] ? 2 : 3;
