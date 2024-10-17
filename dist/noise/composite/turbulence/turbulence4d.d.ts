import { Noise4D } from '../../types.js';
import { OctaveNoise4D } from '../types.js';
/**
 * Creates a turbulence noise function for 4D noise.
 * @param noise4D - Base 4D noise function.
 * @returns A function that generates turbulence noise.
 */
export declare function turbulence4D(noise4D: Noise4D): OctaveNoise4D;
