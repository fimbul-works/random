/**
 * Convert arbitrary data into a byte representation to use with hashing functions.
 * Unknown values are stringified to JSON before encoding.
 * @param data - The input data.
 * @returns An Uint8Array containing the data.
 */
export function getBytes(data: unknown): Uint8Array {
  if (typeof data === 'string') {
    return new TextEncoder().encode(data);
  } else if (
    data instanceof Uint8Array ||
    (typeof Buffer !== 'undefined' && data instanceof Buffer)
  ) {
    return data;
  } else {
    return new TextEncoder().encode(JSON.stringify(data));
  }
}
