/**
 * Type representing a seed value that can be either a number or a string.
 */
export type Seed = number | string;

/**
 * Type for a function that returns a number in range [0.0, 1.0].
 */
export type RandomFunction = () => number;

/**
 * Type for a function that returns a number in range [0, 2^32 - 1].
 */
export type RandomInt32Function = () => number;

/**
 * Type for a function that returns a number in range [0, 2^64 - 1].
 */
export type RandomInt64Function = () => bigint;

/**
 * RandomFunction that allows reading and writing it's internal state to allow resuming.
 *
 * @template T - The type of the internal state of the random number generator.
 */
export interface StatefulRandomFunction<T = any> extends RandomFunction {
  /**
   * Read-only initial seed as an unsigned integer.
   */
  readonly seed?: number;

  /**
   * Get the internal registry state.
   *
   * @returns The internal registry state.
   */
  getState: () => T;

  /**
   * Set the internal registry state
   * @param state - The internal registry state.
   */
  setState: (state: T) => void;
}

/**
 * RandomFunction with additional functionality.
 */
export interface DecoratedRandomFunction extends RandomFunction {
  /**
   * Return a random 32-bit float in range [0.0, 1.0].
   *
   * @returns A random 32-bit float in range [0.0, 1.0].
   */
  (): number;

  /**
   * Return a random unsigned 32-bit integer.
   *
   * @returns A random unsigned 32-bit integer.
   */
  int(): number;

  /**
   * Return a random unsigned 64-bit integer.
   *
   * @returns A random unsigned 64-bit integer.
   */
  int64(): bigint;

  /**
   * Return a random double-precision float in range [0.0, 1.0].
   *
   * @returns A random double-precision float in range [0.0, 1.0].
   */
  double(): number;

  /**
   * Number indicating how many bits this generator operates on.
   */
  readonly bits: number;
}

export type RandomNumberGenerator<T> = DecoratedRandomFunction & StatefulRandomFunction<T>;
