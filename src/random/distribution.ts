import { RandomNumberGenerator } from './types.js';

/**
 * Get a random number from a Gaussian distribution.
 * @param mean - The mean value.
 * @param stdev - The standard deviation.
 * @returns A random float.
 */
export function randomGaussian(
  mean: number = 0,
  stdev: number = 1.0,
  random: RandomNumberGenerator = Math.random,
): number {
  return (
    mean +
    stdev *
      Math.sqrt(-2.0 * Math.log(random())) *
      Math.cos(2.0 * Math.PI * random())
  );
}

export function exponentialDistribution(
  lambda: number,
  random: RandomNumberGenerator = Math.random,
): number {
  return -Math.log(random()) / lambda;
}

export function logisticDistribution(
  mu: number,
  s: number,
  random: RandomNumberGenerator = Math.random,
): number {
  const u = random();
  return mu + s * Math.log(u / (1 - u));
}
