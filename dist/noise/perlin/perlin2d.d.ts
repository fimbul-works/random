import { RandomNumberGenerator } from '../../random';
import { Noise2D } from '../types';
/**
 * Create a 2D Perlin Noise function.
 * @param random - Random number generator function.
 * @return 2D Perlin noise function.
 */
export declare function createPerlinNoise2D(random?: RandomNumberGenerator): Noise2D;
