import { Vec2, Vec3 } from '@claus-codes/vec';
import { Dimension, DistanceFunction, MetricName, VecType } from './types.js';

/**
 * Worley noise in 2D and 3D.
 */
export class Worley<D extends Dimension> {
  private vectorClass: D extends 2 ? typeof Vec2 : typeof Vec3;
  private distanceFunction: DistanceFunction<D>;

  points: VecType<D>[];

  /**
   * Creates a new Worley instance.
   * @param points - A list of vector representing points in the space.
   * @param {Dimension} [dimentions] - The number of dimensions.
   * @param {MetricName} [metricName] - Distance function to use.
   */
  constructor(points: VecType<D>[], dimentions: D, metricName: MetricName) {
    this.metricName = metricName;
    this.dimentions = dimentions;
    this.points = points;

    this.vectorClass = (dimentions === 2 ? Vec2 : Vec3) as D extends 2
      ? typeof Vec2
      : typeof Vec3;

    this.distanceFunction = (() => 0) as (
      v1: VecType<D>,
      v2: VecType<D>,
      e?: number,
    ) => number;
  }

  /**
   * Set dimentions.
   * @param dimentions - The name of the dimension, either "2d" or "3d".
   */
  private set dimentions(dimentions: Dimension) {
    this.vectorClass = dimentions === 2 ? (Vec2 as never) : (Vec3 as never);
  }

  /**
   * Set metric.
   * @param metricName
   */
  private set metricName(metricName: MetricName) {
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
