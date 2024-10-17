/**
 * Creates a ridge noise function for 4D noise.
 * @param noise4D - Base 4D noise function.
 * @param x - X coordinate in 4D space.
 * @param y - Y coordinate in 4D space.
 * @param z - Z coordinate in 4D space.
 * @param w - W coordinate in 4D space.
 * @returns A ridge noise value in the range [0, 1].
 */
export function ridgeNoise4D(noise4D, x, y, z, w) {
    return 1 - Math.abs(noise4D(x, y, z, w));
}
