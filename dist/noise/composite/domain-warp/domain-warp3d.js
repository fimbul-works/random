import { fBm3D } from '../fbm/fbm3d.js';
/**
 * Creates a domain warping function for 3D noise.
 * @param noise3D - Base 3D noise function.
 * @returns A function that generates domain warped noise.
 */
export function domainWarp3D(noise3D) {
    const warp3D = fBm3D(noise3D);
    return (x, y, z, warpStrength = 1.0, octaves = 2, lacunarity = 2.0, gain = 0.5, frequency = 1.0, amplitude = 1.0, offsetX1 = 5.2, offsetY1 = 1.3, offsetZ1 = 2.8, offsetX2 = 3.7, offsetY2 = 6.1, offsetZ2 = 4.2) => {
        const wx = warp3D(x, y, z, octaves, lacunarity, gain, frequency, amplitude) *
            warpStrength;
        const wy = warp3D(x + offsetX1, y + offsetY1, z + offsetZ1, octaves, lacunarity, gain, frequency, amplitude) * warpStrength;
        const wz = warp3D(x + offsetX2, y + offsetY2, z + offsetZ2, octaves, lacunarity, gain, frequency, amplitude) * warpStrength;
        return noise3D(x + wx, y + wy, z + wz);
    };
}
