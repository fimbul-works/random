/**
 * A stateful function that accepts arbitrary data as input, and outputs a number between 0.0 - 1.0.
 */
export type Mash = (data: unknown) => number;
/**
 * Create a new instance of the Mash algorithm.
 * @returns A function that takes data and returns a new value.
 */
export declare function createMash(): Mash;
