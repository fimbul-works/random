import { getDistanceFunction } from './util.js';
/**
 * Create an instance of Voronoi noise.
 * @param points - Array of 2D vectors [number, number].
 * @param metricName - Distance metric.
 * @returns A new Voronoi noise instance.
 */
export function createVoronoi(points, metricName = 'euclidean') {
    return new Voronoi(points, metricName);
}
/**
 * Voronoi noise in 2D and 3D.
 */
export class Voronoi {
    distanceFunction;
    points;
    /**
     * Creates a new Voronoi instance.
     * @param points - A list of vectors representing points in the space.
     * @param metricName - Distance function to use.
     */
    constructor(points, metricName = 'euclidean') {
        this.points = points;
        this.distanceFunction = getDistanceFunction(points[0].length, metricName);
    }
    /**
     * Generates a Voronoi noise value for the given position.
     * @param position Current position.
     * @param e Minkowski exponent.
     * @returns A noise value between 0 and 1.
     */
    noise(position, e = 3) {
        const closestSpotColor = this.closest(position, e);
        return closestSpotColor / (this.points.length - 1);
    }
    /**
     * Returns the index of the closest point to the position.
     * @param position Current position.
     * @param e Minkowski exponent.
     * @returns The index of the closest point to the position.
     */
    closest(position, e = 3) {
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
}
