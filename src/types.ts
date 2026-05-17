/**
 * Decorated PRNG function.
 */
export interface RandomNumberGenerator {
  /**
   * Return a random number between 0.0 and 1.0.
   */
  (): number;

  /**
   * Read-only initial seed as an unsigned integer.
   */
  readonly seed?: number;

  /**
   * Return a random 32-bit number.
   */
  int(): number;

  /**
   * Return a random 64-bit number.
   */
  int64(): bigint;

  /**
   * Return a random double-precision floating point number between 0.0 and 1.0.
   */
  double(): number;
}

export interface StatefulRandomNumberGenerator<T> extends RandomNumberGenerator {
  /**
   * Get the internal registry state.
   *
   * @returns The internal registry state
   */
  getState: () => T;

  /**
   * Set the internal registry state
   * @param state - The internal registry state
   */
  setState: (state: T) => void;
}
