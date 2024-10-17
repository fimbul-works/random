/**
 * Represents a two-dimensional octave noise function.
 * @param x - The X coordinate in 2D space.
 * @param y - The Y coordinate in 2D space.
 * @param octaves - The number of octaves (layers) of noise to combine.
 * @param lacunarity - The multiplier that determines how quickly the frequency increases
 *                     for each successive octave.
 * @param gain - The multiplier that determines how quickly the amplitude diminishes
 *               for each successive octave. Also known as persistence.
 * @param frequency - The initial frequency of the noise.
 * @param amplitude - The initial maximum absolute value that the noise function can produce.
 * @returns A noise value in the range [-amplitude, amplitude].
 */
export type OctaveNoise2D = (x: number, y: number, octaves?: number, lacunarity?: number, gain?: number, frequency?: number, amplitude?: number) => number;
/**
 * Represents a three-dimensional octave noise function.
 * @param x - The X coordinate in 2D space.
 * @param y - The Y coordinate in 2D space.
 * @param y - The Z coordinate in 3D space.
 * @param octaves - The number of octaves (layers) of noise to combine.
 * @param lacunarity - The multiplier that determines how quickly the frequency increases
 *                     for each successive octave.
 * @param gain - The multiplier that determines how quickly the amplitude diminishes
 *               for each successive octave. Also known as persistence.
 * @param frequency - The initial frequency of the noise.
 * @param amplitude - The initial maximum absolute value that the noise function can produce.
 * @returns A noise value in the range [-amplitude, amplitude].

 */
export type OctaveNoise3D = (x: number, y: number, z: number, octaves?: number, lacunarity?: number, gain?: number, frequency?: number, amplitude?: number) => number;
/**
 * Represents a four-dimensional octave noise function.
 * @param x - The X coordinate in 4D space.
 * @param y - The Y coordinate in 4D space.
 * @param y - The Z coordinate in 4D space.
 * @param w - The Z coordinate in 4D space.
 * @param octaves - The number of octaves (layers) of noise to combine.
 * @param lacunarity - The multiplier that determines how quickly the frequency increases
 *                     for each successive octave.
 * @param gain - The multiplier that determines how quickly the amplitude diminishes
 *               for each successive octave. Also known as persistence.
 * @param frequency - The initial frequency of the noise.
 * @param amplitude - The initial maximum absolute value that the noise function can produce.
 * @returns A noise value in the range [-amplitude, amplitude].
 */
export type OctaveNoise4D = (x: number, y: number, z: number, w: number, octaves?: number, lacunarity?: number, gain?: number, frequency?: number, amplitude?: number) => number;
