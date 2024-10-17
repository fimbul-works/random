import { fBm2D } from '../fbm/fbm2d.js';
/**
 * Creates a domain warping function for 2D noise.
 * @param noise2D - Base 2D noise function.
 * @returns A function that generates domain warped noise.
 */
export function domainWarp2D(noise2D) {
    const warp2D = fBm2D(noise2D);
    return (x, y, warpStrength = 1.0, octaves = 2, lacunarity = 2.0, gain = 0.5, frequency = 1.0, amplitude = 1.0, offsetX1 = 5.2, offsetY1 = 1.3) => {
        const wx = warp2D(x, y, octaves, lacunarity, gain, frequency, amplitude) *
            warpStrength;
        const wy = warp2D(x + offsetX1, y + offsetY1, octaves) * warpStrength;
        return noise2D(x + wx, y + wy);
    };
}
