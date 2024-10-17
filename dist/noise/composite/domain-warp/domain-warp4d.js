import { fBm4D } from '../fbm/fbm4d.js';
/**
 * Creates a domain warping function for 4D noise.
 * @param noise4D - Base 4D noise function.
 * @returns A function that generates domain warped noise.
 */
export function domainWarp4D(noise4D) {
    const warp4D = fBm4D(noise4D);
    return (x, y, z, w, warpStrength = 1.0, octaves = 2, lacunarity = 2.0, gain = 0.5, frequency = 1.0, amplitude = 1.0, offsetX1 = 5.2, offsetY1 = 1.3, offsetZ1 = 2.8, offsetW1 = 7.1, offsetX2 = 3.7, offsetY2 = 6.1, offsetZ2 = 4.2, offsetW2 = 8.3, offsetX3 = 1.9, offsetY3 = 9.4, offsetZ3 = 5.0, offsetW3 = 3.2) => {
        const wx = warp4D(x, y, z, w, octaves, lacunarity, gain, frequency, amplitude) *
            warpStrength;
        const wy = warp4D(x + offsetX1, y + offsetY1, z + offsetZ1, w + offsetW1, octaves, lacunarity, gain, frequency, amplitude) * warpStrength;
        const wz = warp4D(x + offsetX2, y + offsetY2, z + offsetZ2, w + offsetW2, octaves, lacunarity, gain, frequency, amplitude) * warpStrength;
        const ww = warp4D(x + offsetX3, y + offsetY3, z + offsetZ3, w + offsetW3, octaves, lacunarity, gain, frequency, amplitude) * warpStrength;
        return noise4D(x + wx, y + wy, z + wz, w + ww);
    };
}
