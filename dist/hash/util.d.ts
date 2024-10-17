/**
 * Convert arbitrary data into a byte representation to use with hashing functions.
 * Unknown values are stringified to JSON before encoding.
 * @param data - The input data.
 * @returns An Uint8Array containing the data.
 */
export declare function getBytes(data: unknown): Uint8Array;
