/**
 * Normalize the output of a nouse value between -1 and 1.
 * @param value
 * @returns The value normalized between 0 and 1.
 */
export function normalize(value: number): number {
  return value * 2 - 1;
}
