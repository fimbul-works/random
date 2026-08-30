import { FRAC, INT_32 } from "../constants.js";
import type {
  DecoratedRandomFunction,
  RandomFunction,
  RandomInt32Function,
  RandomInt64Function,
  Seed,
  StatefulRandomFunction,
} from "../types.js";

/**
 * Define a property on a target.
 *
 * @template T - Type of the property value.
 *
 * @param {any} target - Target to add a property.
 * @param {string} name - Property name.
 * @param {T} value - Value getter function.
 * @param {boolean} [writable=true] - Whether the value is writable. (Default: `true`)
 */
export const defineValue = <T>(target: any, name: string, value: T, writable: boolean = true): void =>
  Object.defineProperty(target, name, {
    value,
    writable,
    enumerable: true,
  });

/**
 * Make a random number generator stateful.
 *
 * @template T - Internal state type.
 * @template R - Type of function.
 *
 * @param {R} target - Function that returns a value.
 * @param {Seed} seed - Seed value (number or string).
 * @param {() => T} getState - Get the internal registry state.
 * @param {(state: T) => void} setState - Set the internal registry state.
 * @returns {R & StatefulRandomFunction<T>} Decorated random number generator.
 */
export const defineRandomState = <T, R = any>(
  target: R,
  seed: Seed,
  getState: () => T,
  setState: (state: T) => void,
): R & StatefulRandomFunction<T> => {
  defineValue(target, "seed", seed, false);
  defineValue(target, "getState", getState);
  defineValue(target, "setState", setState);
  return target as R & StatefulRandomFunction<T>;
};

/**
 * Apply decorators to a standard floating-point [0, 1] RandomFunction.
 *
 * @template T - Internal state type.
 *
 * @param {RandomFunction} random - Function that returns a floating point number in range [0, 1].
 * @returns {DecoratedRandomFunction} Decorated random number generator.
 */
export const decorateRandomFloat = (random: RandomFunction): DecoratedRandomFunction => {
  defineValue(random, "int", () => (random() * INT_32) >>> 0);
  defineValue(random, "int64", () => (BigInt((random() * INT_32) >>> 0) << 32n) | BigInt((random() * INT_32) >>> 0));
  defineValue(random, "double", () => random() + ((random() * 0x200000) | 0) * 1.1102230246251565e-16);
  defineValue(random, "bits", 32, false);

  return random as DecoratedRandomFunction;
};

/**
 * Alias for {@linkcode decorateRandomFloat}
 */
export const decorateRandom = decorateRandomFloat;

/**
 * Apply 32-bit decorators to a raw 32-bit integer RandomFunction.
 *
 * @param {RandomInt32Function} raw - Function that returns an unsigned 32-bit integer in range [0, 2^32 - 1].
 * @returns {DecoratedRandomFunction} Decorated random number generator.
 */
export const decorateRandomInt32 = (raw: RandomInt32Function): DecoratedRandomFunction => {
  const random: RandomFunction = () => (raw() >>> 0) * FRAC;

  defineValue(random, "int", () => raw() >>> 0);
  defineValue(random, "int64", () => (BigInt(raw() >>> 0) << 32n) | BigInt(raw() >>> 0));
  defineValue(random, "double", () => random() + ((random() * 0x200000) | 0) * 1.1102230246251565e-16);
  defineValue(random, "bits", 32, false);

  return random as DecoratedRandomFunction;
};

/**
 * Apply 64-bit decorators to a raw 64-bit integer RandomFunction.
 *
 * @param {RandomInt64Function} raw64 - Generator function returning a native 64-bit integer (bigint).
 * @returns {DecoratedRandomFunction} Decorated random number generator.
 */
export const decorateRandomInt64 = (raw64: RandomInt64Function): DecoratedRandomFunction => {
  const random: RandomFunction = () => Number(raw64() >> 32n) * FRAC;

  defineValue(random, "int", () => Number(raw64() >> 32n) >>> 0);
  defineValue(random, "int64", () => raw64());
  defineValue(random, "double", () => Number(raw64() >> 11n) * 1.1102230246251565e-16);
  defineValue(random, "bits", 64, false);

  return random as DecoratedRandomFunction;
};
