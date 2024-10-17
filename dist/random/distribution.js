/**
 * Get a random number from a Gaussian distribution.
 * @param mean - The mean value.
 * @param stdev - The standard deviation.
 * @returns A random float.
 */
export function randomGaussian(mean = 0, stdev = 1.0, random = Math.random) {
    return (mean +
        stdev *
            Math.sqrt(-2.0 * Math.log(random())) *
            Math.cos(2.0 * Math.PI * random()));
}
/**
 * Generate a random number from an exponential distribution.
 * @param lambda - The rate parameter of the exponential distribution.
 * @param random - A random number generator function.
 * @returns A random number from the exponential distribution.
 */
export function exponentialDistribution(lambda, random = Math.random) {
    return -Math.log(random()) / lambda;
}
/**
 * Generate a random number from a logistic distribution.
 * @param mu - The location parameter (mean) of the logistic distribution.
 * @param s - The scale parameter of the logistic distribution.
 * @param random - A random number generator function.
 * @returns A random number from the logistic distribution.
 */
export function logisticDistribution(mu, s, random = Math.random) {
    const u = random();
    return mu + s * Math.log(u / (1 - u));
}
