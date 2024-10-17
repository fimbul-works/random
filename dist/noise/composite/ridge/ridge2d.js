/**
 * Creates a ridge noise function for 2D noise.
 * @param noise2D - Base 2D noise function.
 * @param x - X coordinate in 2D space.
 * @param y - Y coordinate in 2D space.
 * @returns A ridge noise value in the range [0, 1].
 */
export function ridgeNoise2D(noise2D, x, y) {
    return 1 - Math.abs(noise2D(x, y));
}
