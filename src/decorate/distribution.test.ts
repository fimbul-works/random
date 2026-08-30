import { describe, expect, it } from "vitest";
import type { RandomFunction } from "../types.js";
import {
  curryExp,
  curryGaussian,
  curryLogistic,
  curryPoisson,
  decorateRandomWithDistribution,
} from "./distribution.js";

describe("curryGaussian", () => {
  it("should return a curried gaussian function with default mean 0 and stdev 1", () => {
    // Math.sqrt(-2.0 * Math.log(0.5)) * Math.cos(2.0 * Math.PI * 0.5)
    // = Math.sqrt(-2.0 * -0.693147) * Math.cos(PI)
    // = Math.sqrt(1.386294) * (-1) ≈ -1.17741
    const mockRng: RandomFunction = () => 0.5;
    const gaussianFn = curryGaussian(mockRng);

    const val = gaussianFn();
    expect(val).toBeCloseTo(-1.17741, 4);
  });

  it("should apply custom mean and stdev", () => {
    const mockRng: RandomFunction = () => 0.5;
    const gaussianFn = curryGaussian(mockRng);

    // mean 10, stdev 2 -> 10 + 2 * (-1.17741) ≈ 7.64518
    const val = gaussianFn(10, 2);
    expect(val).toBeCloseTo(7.64518, 4);
  });
});

describe("curryExp", () => {
  it("should return a curried exponential distribution function", () => {
    // -Math.log(0.5) / 2 = 0.693147 / 2 ≈ 0.34657
    const mockRng: RandomFunction = () => 0.5;
    const expFn = curryExp(mockRng);

    const val = expFn(2);
    expect(val).toBeCloseTo(0.34657, 4);
  });
});

describe("curryLogistic", () => {
  it("should return a curried logistic distribution function", () => {
    // u = 0.5 -> log(0.5 / 0.5) = log(1) = 0
    // mu + s * 0 = mu
    const mockRng: RandomFunction = () => 0.5;
    const logisticFn = curryLogistic(mockRng);

    const val = logisticFn(5, 2);
    expect(val).toBe(5);
  });
});

describe("curryPoisson", () => {
  it("should return a curried Poisson distribution function producing non-negative integers", () => {
    const mockRng: RandomFunction = () => 0.5;
    const poissonFn = curryPoisson(mockRng);

    const val = poissonFn(1.0);
    expect(Number.isInteger(val)).toBe(true);
    expect(val).toBeGreaterThanOrEqual(0);
  });
});

describe("decorateRandomWithDistribution", () => {
  it("should attach all distribution functions to target random generator", () => {
    const mockRng: RandomFunction = () => 0.5;
    const decorated = decorateRandomWithDistribution(mockRng);

    expect(decorated).toBe(mockRng);
    expect(typeof decorated.gaussian).toBe("function");
    expect(typeof decorated.exp).toBe("function");
    expect(typeof decorated.logistic).toBe("function");
    expect(typeof decorated.poisson).toBe("function");

    expect(decorated.logistic(10, 1)).toBe(10);
    expect(typeof decorated.gaussian()).toBe("number");
    expect(typeof decorated.exp(1)).toBe("number");
    expect(typeof decorated.poisson(2)).toBe("number");
  });
});
