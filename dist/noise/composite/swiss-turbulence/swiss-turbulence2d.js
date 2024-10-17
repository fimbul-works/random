import { domainWarp2D } from '../domain-warp/domain-warp2d.js';
import { fBm2D } from '../fbm/fbm2d.js';
/**
 * Creates a Swiss turbulence noise function for 2D noise.
 * @param noise2D - Base 2D noise function.
 * @returns A function that generates Swiss turbulence noise.
 */
export function swissTurbulence2D(noise2D) {
    const fBm = fBm2D(noise2D);
    const warp = domainWarp2D(noise2D);
    return (x, y, warpStrength = 0.15, turbulenceFactor = 1.0, octaves = 1, lacunarity = 2.0, gain = 0.5, frequency = 1.0, amplitude = 1.0) => {
        const q = warp(x, y, warpStrength, octaves, lacunarity, gain, frequency, amplitude);
        const r = warp(x + 5.2, y + 1.3, warpStrength, octaves, lacunarity, gain, frequency, amplitude);
        return fBm(x + turbulenceFactor * q, y + turbulenceFactor * r, octaves, lacunarity, gain, frequency, amplitude);
    };
}
