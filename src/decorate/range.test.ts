import { describe, expect, it } from "vitest";
import type { RandomFunction } from "../types.js";
import { curryBool, curryIntRange, curryRange, currySign, decorateRandomWithRange } from "./range.js";

describe("curryRange", () => {
  it("should return a curried function producing float in range [a, b)", () => {
    // 0.5 * (10 - 2) + 2 = 6.0
    const mockRng: RandomFunction = () => 0.5;
    const rangeFn = curryRange(mockRng);

    expect(rangeFn(2, 10)).toBe(6.0);
  });

  it("should handle inverted bounds (a > b)", () => {
    const mockRng: RandomFunction = () => 0.25;
    const rangeFn = curryRange(mockRng);

    // 0.25 * (10 - 2) + 2 = 4.0
    expect(rangeFn(10, 2)).toBe(4.0);
  });

  it("should handle identical bounds (a === b)", () => {
    const mockRng: RandomFunction = () => 0.5;
    const rangeFn = curryRange(mockRng);

    expect(rangeFn(5, 5)).toBe(5);
  });
});

describe("curryIntRange", () => {
  it("should return a curried function producing integer in range [a, b] inclusive", () => {
    const mockRng: RandomFunction = () => 0.5;
    const intRangeFn = curryIntRange(mockRng);

    // floor(0.5 * (10 - 1 + 1) + 1) = floor(0.5 * 10 + 1) = floor(6) = 6
    expect(intRangeFn(1, 10)).toBe(6);
  });

  it("should handle inverted bounds (a > b)", () => {
    const mockRng: RandomFunction = () => 0.5;
    const intRangeFn = curryIntRange(mockRng);

    expect(intRangeFn(10, 1)).toBe(6);
  });

  it("should handle identical bounds (a === b)", () => {
    const mockRng: RandomFunction = () => 0.99;
    const intRangeFn = curryIntRange(mockRng);

    expect(intRangeFn(7, 7)).toBe(7);
  });
});

describe("curryBool", () => {
  it("should return a curried boolean function with default 0.5 bias", () => {
    expect(curryBool(() => 0.3)()).toBe(true);
    expect(curryBool(() => 0.7)()).toBe(false);
  });

  it("should respect custom bias", () => {
    const boolFn = curryBool(() => 0.6);

    // 0.6 < 0.8 -> true
    expect(boolFn(0.8)).toBe(true);
    // 0.6 < 0.4 -> false
    expect(boolFn(0.4)).toBe(false);
  });
});

describe("currySign", () => {
  it("should return 1 when random < 0.5 and -1 when random >= 0.5", () => {
    expect(currySign(() => 0.2)()).toBe(1);
    expect(currySign(() => 0.8)()).toBe(-1);
  });
});

describe("decorateRandomWithRange", () => {
  it("should attach all range methods to target generator", () => {
    let mockVal = 0.5;
    const mockRng: RandomFunction = () => mockVal;
    const decorated = decorateRandomWithRange(mockRng);

    expect(decorated).toBe(mockRng);
    expect(typeof decorated.range).toBe("function");
    expect(typeof decorated.intRange).toBe("function");
    expect(typeof decorated.bool).toBe("function");
    expect(typeof decorated.sign).toBe("function");

    expect(decorated.range(0, 10)).toBe(5);
    expect(decorated.intRange(0, 10)).toBe(5);
    expect(decorated.bool(0.6)).toBe(true);
    expect(decorated.sign()).toBe(-1);
  });
});
