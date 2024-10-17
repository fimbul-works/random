import { RandomNumberGenerator } from './types.js';
/**
 * Get a random number from a Gaussian distribution.
 * @param mean - The mean value.
 * @param stdev - The standard deviation.
 * @returns A random float.
 */
export declare function randomGaussian(mean?: number, stdev?: number, random?: RandomNumberGenerator): number;
/**
 * Generate a random number from an exponential distribution.
 * @param lambda - The rate parameter of the exponential distribution.
 * @param random - A random number generator function.
 * @returns A random number from the exponential distribution.
 */
export declare function exponentialDistribution(lambda: number, random?: RandomNumberGenerator): number;
/**
 * Generate a random number from a logistic distribution.
 * @param mu - The location parameter (mean) of the logistic distribution.
 * @param s - The scale parameter of the logistic distribution.
 * @param random - A random number generator function.
 * @returns A random number from the logistic distribution.
 */
export declare function logisticDistribution(mu: number, s: number, random?: RandomNumberGenerator): number;
