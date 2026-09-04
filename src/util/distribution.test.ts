import { describe, expect, it } from "vitest";
import { randomExp, randomGaussian, randomLogistic, randomPoisson } from "./distribution.js";

describe("randomGaussian", () => {
  it("should return values that statistically match the specified mean and standard deviation", () => {
    // We can run a large sample to check statistical bounds
    const mean = 5;
    const stdev = 2;
    const samples: number[] = [];
    for (let i = 0; i < 5000; i++) {
      samples.push(randomGaussian(mean, stdev));
    }

    const calculatedMean = samples.reduce((sum, val) => sum + val, 0) / samples.length;
    const variance = samples.reduce((sum, val) => sum + (val - calculatedMean) ** 2, 0) / samples.length;
    const calculatedStdev = Math.sqrt(variance);

    // Assert that the mean and standard deviation are very close to expected values
    expect(calculatedMean).toBeCloseTo(mean, 0); // close to 5
    expect(calculatedStdev).toBeCloseTo(stdev, 0); // close to 2
  });

  it("should return deterministic values with mock random", () => {
    // cos(2 * PI * 0.25) = cos(PI / 2) = 0 (or close to it due to precision)
    const val = randomGaussian(0, 1, () => 0.25);
    expect(val).toBeCloseTo(0, 5);
  });
});

describe("randomExp", () => {
  it("should generate values from exponential distribution", () => {
    const lambda = 2;
    // mock random returning e^-2 -> -log(e^-2) / 2 = 2 / 2 = 1
    const mockVal = Math.exp(-2);
    expect(randomExp(lambda, () => mockVal)).toBeCloseTo(1, 5);
  });

  it("should return positive numbers for standard Math.random", () => {
    for (let i = 0; i < 100; i++) {
      const val = randomExp(1.5);
      expect(val).toBeGreaterThanOrEqual(0);
    }
  });
});

describe("randomLogistic", () => {
  it("should return correct logistic values deterministically", () => {
    const mu = 3;
    const s = 2;
    // mock random returning 0.5 -> log(0.5 / 0.5) = log(1) = 0 -> mu + s * 0 = mu
    expect(randomLogistic(mu, s, () => 0.5)).toBe(mu);
  });
});

describe("randomPoisson", () => {
  it("should return integers >= 0 matching average lambda statistically", () => {
    const lambda = 3;
    const samples: number[] = [];
    for (let i = 0; i < 5000; i++) {
      const val = randomPoisson(lambda);
      expect(Number.isInteger(val)).toBe(true);
      expect(val).toBeGreaterThanOrEqual(0);
      samples.push(val);
    }

    const calculatedMean = samples.reduce((sum, val) => sum + val, 0) / samples.length;
    expect(calculatedMean).toBeCloseTo(lambda, 0); // close to 3
  });
});
