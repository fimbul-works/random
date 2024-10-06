/**
 * Applies a smooth interpolation curve to a value t.
 * This function is used to create smooth transitions in noise functions.
 * @param t - The input value, typically between 0 and 1.
 * @returns The faded value.
 */
export function fade(t: number): number {
  return t * t * t * (t * (t * 6 - 15) + 10);
}

/**
 * Performs linear interpolation between two values.
 * @param a - The start value.
 * @param b - The end value.
 * @param t - The interpolation factor, typically between 0 and 1.
 * @returns The interpolated value.
 */
export function lerp(a: number, b: number, t: number): number {
  return (1 - t) * a + t * b;
}
