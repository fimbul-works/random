import type { RandomFunction } from "./types.js";

/**
 * Get a random number from a Gaussian distribution.
 *
 * @param {number} [mean=0] - The mean value.
 * @param {number} [stdev=1.0] - The standard deviation.
 * @param {RandomFunction} [random=Math.random] - Function that returns a value in range [0, 1].
 * @returns {number} A random value between the specified mean and standard deviation.
 */
export const randomGaussian = (mean: number = 0, stdev: number = 1.0, random: RandomFunction = Math.random): number =>
  mean + stdev * Math.sqrt(-2.0 * Math.log(random())) * Math.cos(2.0 * Math.PI * random());

/**
 * Generate a random number from an exponential distribution.
 *
 * @param {number} lambda - The rate parameter of the exponential distribution.
 * @param {RandomFunction} [random=Math.random] - Function that returns a value in range [0, 1].
 * @returns {number} A random number from the exponential distribution.
 */
export const randomExp = (lambda: number, random: RandomFunction = Math.random): number => -Math.log(random()) / lambda;

/**
 * Generate a random number from a logistic distribution.
 *
 * @param {number} mu - The location parameter (mean) of the logistic distribution.
 * @param {number} s - The scale parameter of the logistic distribution.
 * @param {RandomFunction} [random=Math.random] - Function that returns a value in range [0, 1].
 * @returns {number} A random number from the logistic distribution.
 */
export const randomLogistic = (mu: number, s: number, random: RandomFunction = Math.random): number => {
  const u = random();
  return mu + s * Math.log(u / (1 - u));
};

/**
 * Generate a random integer from a Poisson distribution.
 *
 * Models the number of events occurring in a fixed interval, given an average
 * rate. Uses the Knuth method (product of uniforms).
 *
 * Accurate for small λ, but runs in O(λ) time - prefer a rejection-based method for λ > ~30.
 *
 * @param {number} lambda - Average number of events (λ > 0).
 * @param {RandomFunction} [random=Math.random] - Function that returns a value in range [0, 1].
 * @returns {number} A non-negative integer sampled from the Poisson distribution.
 */
export const randomPoisson = (lambda: number, random: RandomFunction = Math.random): number => {
  const L = Math.exp(-lambda);
  let k = 0;
  let p = 1;
  do {
    k++;
    p *= random();
  } while (p > L);
  return k - 1;
};
