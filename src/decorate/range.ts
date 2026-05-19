import { randomIntRange, randomRange } from "../range";
import type { RandomFunction } from "../types";

export const curryRange = (random: RandomFunction) => (a: number, b: number) => () => randomRange(a, b, random);

export const curryIntRange = (random: RandomFunction) => (a: number, b: number) => () => randomIntRange(a, b, random);
