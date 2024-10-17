import { domainWarp3D } from '../domain-warp/domain-warp3d.js';
import { fBm3D } from '../fbm/fbm3d.js';
/**
 * Creates a Swiss turbulence noise function for 3D noise.
 * @param noise3D Base 3D noise function.
 * @returns A function that generates Swiss turbulence noise.
 */
export function swissTurbulence3D(noise3D) {
    const fBm = fBm3D(noise3D);
    const warp = domainWarp3D(noise3D);
    return (x, y, z, warpStrength = 0.15, turbulenceFactor = 1.0, octaves = 1, lacunarity = 2.0, gain = 0.5, frequency = 1.0, amplitude = 1.0) => {
        const q = warp(x, y, z, warpStrength, octaves, lacunarity, gain, frequency, amplitude);
        const r = warp(x + 5.2, y + 1.3, z + 2.8, warpStrength, octaves, lacunarity, gain, frequency, amplitude);
        return fBm(x + turbulenceFactor * q, y + turbulenceFactor * r, z, octaves, gain, lacunarity, frequency, amplitude);
    };
}
