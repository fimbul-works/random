import { RandomNumberGenerator } from '../../random';
import { Noise3D } from '../types';
/**
 * Create a 3D Perlin Noise function.
 * @param random - Random number generator function.
 * @return 3D Perlin noise function.
 */
export declare function createPerlinNoise3D(random?: RandomNumberGenerator): Noise3D;
