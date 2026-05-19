import { randomExp, randomGaussian, randomLogistic } from "../distribution";
import type { RandomFunction } from "../types";

export const curryGaussian = (random: RandomFunction) => (mean: number, stdev: number) => () =>
  randomGaussian(mean, stdev, random);

export const curryExp = (random: RandomFunction) => (lambda: number) => randomExp(lambda, random);

export const curryLogistic = (random: RandomFunction) => (mu: number, s: number) => () => randomLogistic(mu, s, random);
