import { describe, expect, it } from "vitest";
import type { RandomFunction } from "../types.js";
import { curryWeightedKey, decorateRandomWithObject } from "./object.js";

describe("curryWeightedKey", () => {
  it("should return a curried function that selects keys based on weight", () => {
    const weights = { common: 80, rare: 20 };

    // Total weight = 100
    // Mock 0.1 -> target 10 -> matches "common"
    expect(curryWeightedKey(() => 0.1)(weights)).toBe("common");

    // Mock 0.9 -> target 90 -> target - 80 = 10 -> matches "rare"
    expect(curryWeightedKey(() => 0.9)(weights)).toBe("rare");
  });

  it("should throw an error for empty or non-positive weight maps", () => {
    const weightedKeyFn = curryWeightedKey(() => 0.5);

    expect(() => weightedKeyFn({})).toThrow("Invalid weighted key object");
    expect(() => weightedKeyFn({ a: 0, b: -10 })).toThrow("Invalid weighted key object");
  });
});

describe("decorateRandomWithObject", () => {
  it("should attach weightedKey function to target random generator", () => {
    const mockRng: RandomFunction = () => 0.1;
    const decorated = decorateRandomWithObject(mockRng);

    expect(decorated).toBe(mockRng);
    expect(typeof decorated.weightedKey).toBe("function");

    const weights = { a: 10, b: 90 };
    expect(decorated.weightedKey(weights)).toBe("a");
  });
});
