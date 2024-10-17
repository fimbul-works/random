import { Noise2D } from '../../types.js';
import { OctaveNoise2D } from '../types.js';
/**
 * Creates a turbulence noise function for 2D noise.
 * @param noise2D - Base 2D noise function.
 * @returns A function that generates turbulence noise.
 */
export declare function turbulence2D(noise2D: Noise2D): OctaveNoise2D;
