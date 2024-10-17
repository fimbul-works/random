/**
 * Computes the Cantor pairing function for two non-negative integers.
 * The Cantor pairing function is a bijective function that maps two natural numbers to a single natural number.
 * @param x - The first non-negative integer.
 * @param y - The second non-negative integer.
 * @returns The result of the Cantor pairing function.
 */
export declare function cantorPair(x: number, y: number): number;
/**
 * Reverses the Cantor pairing function, computing the original pair of numbers from the paired result.
 * @param z - The result of a previous Cantor pairing operation.
 * @returns An array containing the original pair of numbers [x, y].
 */
export declare function reverseCantorPair(z: number): [number, number];
