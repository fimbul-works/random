import { Vec2, Vec3 } from '@claus-codes/vec';
import { Dimension, DistanceFunction, MetricName, VecType } from './types.js';

/**
 * Voronoi noise in 2D and 3D.
 */
export class Voronoi<D extends Dimension> {
  private vectorClass: D extends 2 ? typeof Vec2 : typeof Vec3;
  private distanceFunction: DistanceFunction<D>;

  points: VecType<D>[];

  /**
   * Creates a new Voronoi instance.
   * @param points - A list of vectors representing points in the space.
   * @param {Dimension} dimensions - The number of dimensions.
   * @param {MetricName} [metricName] - Distance function to use.
   */
  constructor(
    points: VecType<D>[],
    dimensions: D,
    metricName: MetricName = 'euclidean',
  ) {
    this.dimensions = dimensions;
    this.metricName = metricName;
    this.points = points;

    this.vectorClass = (dimensions === 2 ? Vec2 : Vec3) as D extends 2
      ? typeof Vec2
      : typeof Vec3;

    this.distanceFunction = (() => 0) as (
      v1: VecType<D>,
      v2: VecType<D>,
      e?: number,
    ) => number;

    this.metricName = metricName;
  }

  /**
   * Set dimensions.
   * @param dimensions - The number of dimensions, either 2 or 3.
   */
  private set dimensions(dimensions: Dimension) {
    this.vectorClass = dimensions === 2 ? (Vec2 as never) : (Vec3 as never);
  }

  /**
   * Set metric.
   * @param metricName
   */
  private set metricName(metricName: MetricName) {
    this.metricName = metricName;
    switch (metricName) {
      case 'euclidean':
      default:
        this.distanceFunction = this.vectorClass.distance as never;
        break;
      case 'chebyshev':
        this.distanceFunction = this.vectorClass.distanceChebyshev as never;
        break;
      case 'manhattan':
        this.distanceFunction = this.vectorClass.distanceManhattan as never;
        break;
      case 'minkowski':
        this.distanceFunction = this.vectorClass.distanceMinkowski as never;
        break;
    }
  }

  /**
   * Returns the index of the closest point to the position.
   * @param position Current position.
   * @param e Minkowski exponent.
   * @returns The index of the closest point to the position.
   */
  closest(position: VecType<D>, e: number = 3): number {
    let closestDistance = Infinity;
    let closestIndex = -1;
    for (let i = 0; i < this.points.length; i++) {
      const distance = this.distanceFunction(position, this.points[i], e);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = i;
      }
    }
    return closestIndex;
  }

  /**
   * Generates a Voronoi noise value for the given position.
   * @param position Current position.
   * @param e Minkowski exponent.
   * @returns A noise value between 0 and 1.
   */
  noise(position: VecType<D>, e: number = 3): number {
    const closestSpotColor = this.closest(position, e);
    // Normalize the value between 0 and 1
    return closestSpotColor / (this.points.length - 1);
  }
}
