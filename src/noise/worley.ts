import {
  Dimension,
  DistanceFunction,
  InferDimension,
  MetricName,
  VecType,
} from './types.js';
import { getDistanceFunction } from './util.js';

/**
 * Create an instance of Worley noise.
 * @param points - Array of 2D vectors [number, number].
 * @param metricName - Distance metric.
 * @returns A new Worley noise instance.
 */
export function createWorley<
  T extends [number, number][] | [number, number, number][],
>(points: T, metricName: MetricName = 'euclidean'): Worley<InferDimension<T>> {
  return new Worley(points as VecType<InferDimension<T>>[], metricName);
}

/**
 * Worley noise in 2D and 3D.
 */
export class Worley<D extends Dimension> {
  private distanceFunction: DistanceFunction<D>;

  points: VecType<D>[];

  /**
   * Creates a new Worley instance.
   * @param points - A list of [number, number] vectors representing points in the space.
   * @param metricName - Distance metric to use.
   */
  constructor(points: VecType<D>[], metricName: MetricName) {
    this.points = points;
    this.distanceFunction = getDistanceFunction(
      points[0].length as D,
      metricName,
    );
  }

  /**
   * Generates a Worley noise value for the given position.
   * @param position Current position.
   * @param e Minkowski exponent.
   * @returns A noise value between 0 and 1.
   */
  noise(position: VecType<D>, e: number = 3): number {
    const closestSpotColor = this.closest(position, e);
    return closestSpotColor / (this.points.length - 1);
  }

  /**
   * Returns the distance from the first closest spot to the position.
   * @param position Current position.
   * @param e Minkowski exponent.
   * @returns The distance from the first closest spot to the position.
   */
  closest(position: VecType<D>, e: number = 3): number {
    let stDistance = Infinity;
    for (let i = 0; i < this.points.length; i++) {
      const distance = this.distanceFunction(position, this.points[i], e);
      if (distance < stDistance) stDistance = distance;
    }
    return stDistance;
  }

  /**
   * Returns the distance from the first and second closest spot to the position.
   * @param position Current position.
   * @param e Minkowski exponent.
   * @return The distance from the first and second closest spot to the position.
   */
  closest2(position: VecType<D>, e: number = 3): number[] {
    let firstDistance = Infinity;
    let secondDistance = Infinity;
    for (let i = 0; i < this.points.length; i++) {
      const distance = this.distanceFunction(position, this.points[i], e);
      if (distance < firstDistance) {
        [secondDistance, firstDistance] = [firstDistance, distance];
      } else if (distance < secondDistance) {
        secondDistance = distance;
      }
    }
    return [firstDistance, secondDistance];
  }
}
