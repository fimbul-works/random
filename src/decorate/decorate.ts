import { INT_32 } from "../constants.js";
import type { DecoratedRandomFunction, RandomFunction, Seed, StatefulRandomFunction } from "../types.js";

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
 * @template R - Type of RandomFunction.
 *
 * @param {R} random - Function that returns a value.
 * @param {Seed} seed - Seed value (number or string).
 * @param {() => T} getState - Get the internal registry state.
 * @param {(state: T) => void} setState - Set the internal registry state.
 * @returns {R & StatefulRandomFunction<T>} Decorated random number generator.
 */
export const defineRandomState = <T, R = RandomFunction>(
  random: R,
  seed: Seed,
  getState: () => T,
  setState: (state: T) => void,
): R & StatefulRandomFunction<T> => {
  defineValue(random, "seed", seed, false);
  defineValue(random, "getState", getState);
  defineValue(random, "setState", setState);
  return random as R & StatefulRandomFunction<T>;
};

/**
 * Apply decorators to a RandomFunction.
 *
 * @template T - Type of RandomFunction.
 *
 * @param {T} random - Function that returns a value.
 * @param {Record<string, () => any>} props - Additional properties.
 * @returns {T & DecoratedRandomFunction} Decorated random number generator.
 */
export const decorateRandom = <T extends RandomFunction>(
  random: T,
  props: Record<string, () => any> = {},
): T & DecoratedRandomFunction => {
  defineValue(random, "int", () => (random() * INT_32) >>> 0);
  defineValue(random, "int64", () => (BigInt((random() * INT_32) >>> 0) << 32n) | BigInt((random() * INT_32) >>> 0));
  defineValue(random, "double", () => random() + ((random() * 0x200000) | 0) * 1.1102230246251565e-16);

  // Custom properties
  for (const [name, value] of Object.entries(props)) {
    defineValue(random, name, value);
  }

  return random as T & DecoratedRandomFunction;
};
