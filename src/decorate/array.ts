import {
  pickRandom,
  pickWeightedRandom,
  randomIndex,
  randomWeightedIndex,
  sampleRandom,
  shuffleArray,
  shuffleInPlace,
} from "../util/array.js";
import type { RandomFunction } from "../types.js";
import { defineValue } from "./decorate.js";

export type RandomArrayFunctions = {
  /**
   * Return a random index using a length or an array as value.
   *
   * @template T The type of an array item, if length is an array.
   * @param lengthOrArray Number or array.
   * @returns A random integer, or -1 if length is zero.
   */
  index<T>(lengthOrArray: number | T[]): number;

  /**
   * Pick a random item from an array.
   *
   * @template T The type of the items in the array.
   * @param items An array of options to pick from.
   * @returns Random item.
   * @throws {Error} When passed an empty array.
   */
  pick<T>(items: T[]): T;

  /**
   * Pick a random item from an array of objects based on their weights.
   *
   * @template T The type of the objects in the array.
   * @param items An array of objects.
   * @param getWeight A function that extracts the weight from an item.
   * @returns Selected random item.
   * @throws {Error} When passed an empty array.
   */
  pickWeighted<T extends object>(items: T[], getWeight: (item: T) => number): T;

  /**
   * Select a random index from an array of objects based on their weights.
   *
   * @template T The type of an array item.
   * @param items An array of objects
   * @param getWeight A function that extracts the weight from an item.
   * @returns Selected random index, or -1 if the array is empty.
   */
  weightedIndex<T extends object>(items: T[], getWeight: (item: T) => number): number;

  /**
   * Create a shuffled copy of an array.
   *
   * @template T The type of the items in the array.
   * @param arr The array to shuffle
   * @returns A shuffled copy of the array.
   */
  shuffle<T>(arr: T[]): T[];

  /**
   * Shuffle an array in-place, modifying the original array (no allocation).
   *
   * @template T The type of the items in the array.
   * @param arr The array to shuffle.
   * @returns The same array instance, shuffled.
   */
  shuffleInPlace<T>(arr: T[]): T[];

  /**
   * Select k unique random items from an array without replacement.
   *
   * @template T The type of the items in the array.
   * @param items An array of options to sample from.
   * @param k The number of unique items to pick.
   * @returns An array containing k unique items.
   */
  sample<T>(items: T[], k: number): T[];
};

/**
 * Curried version of {@linkcode randomIndex} bound to a PRNG function.
 *
 * @param {RandomFunction} random - Function that returns a floating point number in range [0, 1].
 * @returns {(lengthOrArray: number | T[]) => number} Function returning a random index.
 */
export const curryIndex =
  (random: RandomFunction) =>
  <T>(lengthOrArray: number | T[]): number =>
    randomIndex(lengthOrArray, random);

/**
 * Curried version of {@linkcode pickRandom} bound to a PRNG function.
 *
 * @param {RandomFunction} random - Function that returns a floating point number in range [0, 1].
 * @returns {(items: T[]) => T} Function returning a random item from an array.
 */
export const curryPick =
  (random: RandomFunction) =>
  <T>(items: T[]): T =>
    pickRandom(items, random);

/**
 * Curried version of {@linkcode pickWeightedRandom} bound to a PRNG function.
 *
 * @param {RandomFunction} random - Function that returns a floating point number in range [0, 1].
 * @returns {(items: T[], getWeight: (item: T) => number) => T} Function returning a weighted random item.
 */
export const curryPickWeighted =
  (random: RandomFunction) =>
  <T extends object>(items: T[], getWeight: (item: T) => number): T =>
    pickWeightedRandom(items, getWeight, random);

/**
 * Curried version of {@linkcode randomWeightedIndex} bound to a PRNG function.
 *
 * @param {RandomFunction} random - Function that returns a floating point number in range [0, 1].
 * @returns {(items: T[], getWeight: (item: T) => number) => number} Function returning a weighted random index.
 */
export const curryWeightedIndex =
  (random: RandomFunction) =>
  <T extends object>(items: T[], getWeight: (item: T) => number): number =>
    randomWeightedIndex(items, getWeight, random);

/**
 * Curried version of {@linkcode shuffleArray} bound to a PRNG function.
 *
 * @param {RandomFunction} random - Function that returns a floating point number in range [0, 1].
 * @returns {(arr: T[]) => T[]} Function returning a shuffled copy of an array.
 */
export const curryShuffle =
  (random: RandomFunction) =>
  <T>(arr: T[]): T[] =>
    shuffleArray(arr, random);

/**
 * Curried version of {@linkcode shuffleInPlace} bound to a PRNG function.
 *
 * @param {RandomFunction} random - Function that returns a floating point number in range [0, 1].
 * @returns {(arr: T[]) => T[]} Function shuffling an array in-place.
 */
export const curryShuffleInPlace =
  (random: RandomFunction) =>
  <T>(arr: T[]): T[] =>
    shuffleInPlace(arr, random);

/**
 * Curried version of {@linkcode sampleRandom} bound to a PRNG function.
 *
 * @param {RandomFunction} random - Function that returns a floating point number in range [0, 1].
 * @returns {(items: T[], k: number) => T[]} Function sampling k unique items from an array.
 */
export const currySample =
  (random: RandomFunction) =>
  <T>(items: T[], k: number): T[] =>
    sampleRandom(items, k, random);

/**
 * Apply array function decorators to a RandomFunction.
 *
 * @template T - Type of RandomFunction.
 * @param {T} random - Function that returns a value.
 * @returns {T & RandomArrayFunctions} Decorated random number generator with array functions.
 */
export const decorateRandomWithArray = <T extends RandomFunction>(random: T): T & RandomArrayFunctions => {
  defineValue(random, "index", curryIndex(random));
  defineValue(random, "pick", curryPick(random));
  defineValue(random, "pickWeighted", curryPickWeighted(random));
  defineValue(random, "weightedIndex", curryWeightedIndex(random));
  defineValue(random, "shuffle", curryShuffle(random));
  defineValue(random, "shuffleInPlace", curryShuffleInPlace(random));
  defineValue(random, "sample", currySample(random));

  return random as T & RandomArrayFunctions;
};
