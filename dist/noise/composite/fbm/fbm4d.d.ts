import { Noise4D } from '../../types.js';
import { OctaveNoise4D } from '../types.js';
/**
 * Creates a 4D fractal Brownian motion (fBm) noise function.
 * @param noise4D - Base 4D noise function.
 * @returns A function that generates fBm noise in the range [-amplitude, amplitude].
 */
export declare function fBm4D(noise4D: Noise4D): OctaveNoise4D;
