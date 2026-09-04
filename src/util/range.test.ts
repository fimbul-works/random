import { describe, expect, it } from "vitest";
import { randomBool, randomIntRange, randomRange, randomSign } from "./range.js";

describe("randomRange", () => {
  it("should return a random float in range [a, b)", () => {
    const mockRandom = () => 0.5;
    expect(randomRange(10, 20, mockRandom)).toBe(15);
  });

  it("should handle backwards parameters by swapping a and b", () => {
    const mockRandom = () => 0.5;
    expect(randomRange(20, 10, mockRandom)).toBe(15);
  });

  it("should return correct boundaries", () => {
    const mockRandomMin = () => 0;
    const mockRandomMax = () => 0.999999;
    expect(randomRange(5, 8, mockRandomMin)).toBe(5);
    expect(randomRange(5, 8, mockRandomMax)).toBeLessThan(8);
  });
});

describe("randomIntRange", () => {
  it("should return a random integer in range [a, b] inclusive", () => {
    const mockRandomMin = () => 0;
    const mockRandomMax = () => 0.999999;
    const mockRandomMid = () => 0.5;

    // Range [5, 8] -> possible: 5, 6, 7, 8
    expect(randomIntRange(5, 8, mockRandomMin)).toBe(5);
    expect(randomIntRange(5, 8, mockRandomMax)).toBe(8);
    expect(randomIntRange(5, 8, mockRandomMid)).toBe(7); // floor(0.5 * 4 + 5) = floor(7.0) = 7
  });

  it("should handle backwards parameters by swapping a and b", () => {
    const mockRandom = () => 0.5;
    expect(randomIntRange(8, 5, mockRandom)).toBe(7);
  });
});

describe("randomBool", () => {
  it("should return correct boolean based on bias and mock random", () => {
    const mockRandomLow = () => 0.2;
    const mockRandomHigh = () => 0.8;

    // Standard 0.5 bias
    expect(randomBool(0.5, mockRandomLow)).toBe(true);
    expect(randomBool(0.5, mockRandomHigh)).toBe(false);

    // Custom bias (e.g. 0.9)
    expect(randomBool(0.9, mockRandomHigh)).toBe(true);
  });
});

describe("randomSign", () => {
  it("should return 1 or -1 based on mock random", () => {
    const mockRandomLow = () => 0.2;
    const mockRandomHigh = () => 0.8;

    expect(randomSign(mockRandomLow)).toBe(1);
    expect(randomSign(mockRandomHigh)).toBe(-1);
  });
});
