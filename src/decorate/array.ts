import { pickRandom, pickWeightedRandom, randomIndex, randomWeightedIndex, shuffleArray } from "../array.js";
import type { WeightMap } from "../object.js";
import type { RandomFunction } from "../types";

export const curryIndex =
  (random: RandomFunction) =>
  <T>(items: number | T[]) =>
    randomIndex(items, random);

export const curryPick =
  (random: RandomFunction) =>
  <T>(items: T[]) =>
    pickRandom(items, random);

export const curryPickWeighted =
  (random: RandomFunction) =>
  <T extends WeightMap>(items: T[], getWeight: (item: T) => number) =>
    pickWeightedRandom(items, getWeight, random);

export const curryShuffle =
  (random: RandomFunction) =>
  <T>(arr: T[]) =>
    shuffleArray(arr, random);

export const curryWeightedIndex =
  (random: RandomFunction) =>
  <T extends WeightMap>(items: T[], getWeight: (item: T) => number) =>
    randomWeightedIndex(items, getWeight, random);
