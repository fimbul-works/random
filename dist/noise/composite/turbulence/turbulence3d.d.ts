import { Noise3D } from '../../types';
import { OctaveNoise3D } from '../types';
/**
 * Creates a turbulence noise function for 4D noise.
 * @param noise3D - Base 3D noise function.
 * @returns A function that generates turbulence noise.
 */
export declare function turbulence3D(noise3D: Noise3D): OctaveNoise3D;
