import { randomString } from "../string";
import type { RandomFunction } from "../types";

export const curryString = (random: RandomFunction) => (length: number, alphabet?: string) => () =>
  randomString(length, alphabet, random);
