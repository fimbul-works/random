import { domainWarp4D } from '../domain-warp/domain-warp4d.js';
import { fBm4D } from '../fbm/fbm4d.js';
/**
 * Creates a Swiss turbulence noise function for 4D noise.
 * @param noise4D - Base 4D noise function.
 * @returns A function that generates Swiss turbulence noise.
 */
export function swissTurbulence4D(noise4D) {
    const fBm = fBm4D(noise4D);
    const warp = domainWarp4D(noise4D);
    return (x, y, z, w, warpStrength = 0.15, turbulenceFactor = 1.0, octaves = 1, lacunarity = 2.0, gain = 0.5, frequency = 1.0, amplitude = 1.0) => {
        const q = warp(x, y, z, w, warpStrength, octaves, lacunarity, gain, frequency, amplitude);
        const r = warp(x + 5.2, y + 1.3, z + 2.8, w + 3.7, warpStrength, octaves, lacunarity, gain, frequency, amplitude);
        return fBm(x + turbulenceFactor * q, y + turbulenceFactor * r, z, w, octaves, lacunarity, gain, frequency, amplitude);
    };
}
