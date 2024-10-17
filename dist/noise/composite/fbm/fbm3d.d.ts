import { Noise3D } from '../../types.js';
import { OctaveNoise3D } from '../types.js';
/**
 * Creates a 3D fractal Brownian motion (fBm) noise function.
 * @param noise3D - TBase 3D noise function.
 * @returns A function that generates fBm noise in the range [-amplitude, amplitude].
 */
export declare function fBm3D(noise3D: Noise3D): OctaveNoise3D;
