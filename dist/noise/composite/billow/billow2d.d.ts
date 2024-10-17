import { Noise2D } from '../../types.js';
import { OctaveNoise2D } from '../types.js';
/**
 * Creates a billow noise function for 2D noise.
 * @param noise2D - Base 2D noise function.
 * @returns A function that generates billow noise.
 */
export declare function billowNoise2D(noise2D: Noise2D): OctaveNoise2D;
