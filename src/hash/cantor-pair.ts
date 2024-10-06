/**
 * Computes the Cantor pairing function for two non-negative integers.
 * The Cantor pairing function is a bijective function that maps two natural numbers to a single natural number.
 * @param x - The first non-negative integer.
 * @param y - The second non-negative integer.
 * @returns The result of the Cantor pairing function.
 */
export function cantorPair(x: number, y: number): number {
  if (x < 0 || y < 0)
    throw new Error('Cantor pairing works only on positive integers');
  return ((x + y) * (x + y + 1)) / 2 + y;
}

/**
 * Reverses the Cantor pairing function, computing the original pair of numbers from the paired result.
 * @param z - The result of a previous Cantor pairing operation.
 * @returns An array containing the original pair of numbers [x, y].
 */
export function reverseCantorPair(z: number): [number, number] {
  if (z < 0)
    throw new Error('Reverse cantor pairing works only on positive integers');
  const t = Math.floor((-1 + Math.sqrt(1 + 8 * z)) / 2);
  return [(t * (t + 3)) / 2 - z, z - (t * (t + 1)) / 2];
}
