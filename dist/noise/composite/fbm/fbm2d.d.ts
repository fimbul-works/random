import { Noise2D } from '../../types.js';
import { OctaveNoise2D } from '../types.js';
/**
 * Creates a 2D fractal Brownian motion (fBm) noise function.
 * @param noise2D - The base 2D noise function.
 * @returns A function that generates fBm noise in the range [-amplitude, amplitude].
 */
export declare function fBm2D(noise2D: Noise2D): OctaveNoise2D;
