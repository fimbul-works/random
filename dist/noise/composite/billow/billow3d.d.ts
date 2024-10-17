import { Noise3D } from '../../types.js';
import { OctaveNoise3D } from '../types.js';
/**
 * Creates a billow noise function for 3D noise.
 * @param noise3D - Base 3D noise function.
 * @returns A function that generates billow noise.
 */
export declare function billowNoise3D(noise3D: Noise3D): OctaveNoise3D;
