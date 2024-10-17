/**
 * Applies a smooth interpolation curve to a value t.
 * This function is used to create smooth transitions in noise functions.
 * @param t - The input value, typically between 0 and 1.
 * @returns The faded value.
 */
export declare function fade(t: number): number;
/**
 * Performs linear interpolation between two values.
 * @param a - The start value.
 * @param b - The end value.
 * @param t - The interpolation factor, typically between 0 and 1.
 * @returns The interpolated value.
 */
export declare function lerp(a: number, b: number, t: number): number;
