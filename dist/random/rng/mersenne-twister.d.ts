/**
 * This code is an implementation of the Mersenne Twister algorithm.
 * Based on the original implementation by Makoto Matsumoto and Takuji Nishimura.
 */
/**
 * Mersenne Twister internal state (state and state index).
 */
export type MersenneTwisterState = [number[], number];
/**
 * Implementation of the Mersenne Twister random number generator.
 */
export interface MersenneTwisterRandomNumberGenerator {
    /**
     * Return a random number between 0.0 and 1.0.
     */
    (): number;
    /**
     * Original seed number.
     * @type {number}
     */
    seed: number;
    /**
     * Generate a random 32-bit integer.
     * @returns A random 32-bit integer.
     */
    int: () => number;
    /**
     * Get the internal state of the generator.
     * @returns The internal state (state and state index).
     */
    getState: () => MersenneTwisterState;
    /**
     * Set the internal state of the generator.
     * @param state - The internal state to set (state and state index).
     * @throws {Error} Invalid state.
     */
    setState: (state: MersenneTwisterState) => void;
}
/**
 * Creates a new Mersenne Twister random number generator.
 * @param seed - Seed for the random number generator.
 * @returns A new random number generator.
 */
declare function createMersenneTwister(seed?: number): MersenneTwisterRandomNumberGenerator;
export default createMersenneTwister;
