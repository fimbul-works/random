/**
 * This code is an implementation of Alea algorithm; (C) 2010 Johannes Baagøe.
 * Alea is licensed according to the http://en.wikipedia.org/wiki/MIT_License.
 */
/**
 * Alea internal registry state.
 */
export type AleaState = [number, number, number, number];
/**
 * Implementation of the Alea random number generator.
 */
export interface AleaRandomNumberGenerator {
    /**
     * Return a random number between 0.0 and 1.0.
     */
    (): number;
    /**
     * Original seed number.
     */
    seed: number;
    /**
     * Generate a random 32-bit integer.
     * @returns A random 32-bit integer.
     */
    int: () => number;
    /**
     * Get the internal registry state, to allow you to manually save it.
     * @returns The internal registry state.
     */
    getState: () => AleaState;
    /**
     * Set the internal registry state, to allow you to manually restore it.
     * @param state - The internal registry state.
     */
    setState: (state: AleaState) => void;
}
/**
 * Creates a new Alea random number generator.
 * @param {number} seed - Seed number.
 * @param {number} MAGIC1 - Magic number.
 * @param {number} MAGIC2 - Another magic number.
 * @returns A new random number generator.
 */
export declare function createRandomAlea(seed?: number, MAGIC1?: number, MAGIC2?: number): AleaRandomNumberGenerator;
