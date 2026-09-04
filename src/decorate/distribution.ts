import { randomExp, randomGaussian, randomLogistic, randomPoisson } from "../util/distribution.js";
import type { RandomFunction } from "../types.js";
import { defineValue } from "./decorate.js";

export type RandomDistributionFunctions = {
  /**
   * Get a random number from a Gaussian distribution.
   *
   * @param mean - The mean value.
   * @param stdev - The standard deviation.
   * @returns A random value between the specified mean and standard deviation.
   */
  gaussian(mean?: number, stdev?: number): number;

  /**
   * Generate a random number from an exponential distribution.
   *
   * @param lambda - The rate parameter of the exponential distribution.
   * @returns A random number from the exponential distribution.
   */
  exp(lambda: number): number;

  /**
   * Generate a random number from a logistic distribution.
   *
   * @param mu - The location parameter (mean) of the logistic distribution.
   * @param s - The scale parameter of the logistic distribution.
   * @returns A random number from the logistic distribution.
   */
  logistic(mu: number, s: number): number;

  /**
   * Generate a random integer from a Poisson distribution.
   *
   * @param lambda - Average number of events (λ > 0).
   * @returns A non-negative integer sampled from the Poisson distribution.
   */
  poisson(lambda: number): number;
};

/**
 * Curried version of {@linkcode randomGaussian} bound to a PRNG function.
 *
 * @param {RandomFunction} random - Function that returns a floating point number in range [0, 1].
 * @returns {(mean?: number, stdev?: number) => number} Function sampling from Gaussian distribution.
 */
export const curryGaussian =
  (random: RandomFunction) =>
  (mean: number = 0, stdev: number = 1.0): number =>
    randomGaussian(mean, stdev, random);

/**
 * Curried version of {@linkcode randomExp} bound to a PRNG function.
 *
 * @param {RandomFunction} random - Function that returns a floating point number in range [0, 1].
 * @returns {(lambda: number) => number} Function sampling from exponential distribution.
 */
export const curryExp =
  (random: RandomFunction) =>
  (lambda: number): number =>
    randomExp(lambda, random);

/**
 * Curried version of {@linkcode randomLogistic} bound to a PRNG function.
 *
 * @param {RandomFunction} random - Function that returns a floating point number in range [0, 1].
 * @returns {(mu: number, s: number) => number} Function sampling from logistic distribution.
 */
export const curryLogistic =
  (random: RandomFunction) =>
  (mu: number, s: number): number =>
    randomLogistic(mu, s, random);

/**
 * Curried version of {@linkcode randomPoisson} bound to a PRNG function.
 *
 * @param {RandomFunction} random - Function that returns a floating point number in range [0, 1].
 * @returns {(lambda: number) => number} Function sampling from Poisson distribution.
 */
export const curryPoisson =
  (random: RandomFunction) =>
  (lambda: number): number =>
    randomPoisson(lambda, random);

/**
 * Apply distribution function decorators to a RandomFunction.
 *
 * @template T - Type of RandomFunction.
 * @param {T} random - Function that returns a value.
 * @returns {T & RandomDistributionFunctions} Decorated random number generator with distribution functions.
 */
export const decorateRandomWithDistribution = <T extends RandomFunction>(
  random: T,
): T & RandomDistributionFunctions => {
  defineValue(random, "gaussian", curryGaussian(random));
  defineValue(random, "exp", curryExp(random));
  defineValue(random, "logistic", curryLogistic(random));
  defineValue(random, "poisson", curryPoisson(random));

  return random as T & RandomDistributionFunctions;
};
