import { randomWeightedKey, type WeightMap } from "../object";
import type { RandomFunction } from "../types";

export const curryWeightedKey =
  (random: RandomFunction) =>
  <T extends WeightMap>(keyAndWeight: T) =>
    randomWeightedKey(keyAndWeight, random);
