import { describe, expect, it } from "vitest";
import type { RandomFunction } from "../types.js";
import {
  curryIndex,
  curryPick,
  curryPickWeighted,
  currySample,
  curryShuffle,
  curryShuffleInPlace,
  curryWeightedIndex,
  decorateRandomWithArray,
} from "./array.js";

describe("curryIndex", () => {
  it("should return a curried function using the provided RNG for length", () => {
    const mockRng: RandomFunction = () => 0.5;
    const indexFn = curryIndex(mockRng);

    // 0.5 * 10 = 5
    expect(indexFn(10)).toBe(5);
  });

  it("should return a random index within bounds for an array", () => {
    const mockRng: RandomFunction = () => 0.75;
    const indexFn = curryIndex(mockRng);
    const arr = ["a", "b", "c", "d"];

    // 0.75 * 4 = 3
    expect(indexFn(arr)).toBe(3);
  });

  it("should return -1 for non-positive length or empty array", () => {
    const mockRng: RandomFunction = () => 0.5;
    const indexFn = curryIndex(mockRng);

    expect(indexFn(0)).toBe(-1);
    expect(indexFn(-5)).toBe(-1);
    expect(indexFn([])).toBe(-1);
  });
});

describe("curryPick", () => {
  it("should pick a random element from an array using curried RNG", () => {
    const mockRng: RandomFunction = () => 0.5;
    const pickFn = curryPick(mockRng);
    const items = ["alpha", "beta", "gamma"];

    // 0.5 * 3 = 1.5 -> index 1 -> "beta"
    expect(pickFn(items)).toBe("beta");
  });

  it("should throw error on empty array", () => {
    const mockRng: RandomFunction = () => 0.5;
    const pickFn = curryPick(mockRng);

    expect(() => pickFn([])).toThrow("Cannot pick from an empty array");
  });
});

describe("curryPickWeighted", () => {
  it("should pick correct item based on weights", () => {
    const mockRng: RandomFunction = () => 0.05;
    const pickWeightedFn = curryPickWeighted(mockRng);
    const items = [
      { name: "foo", weight: 10 },
      { name: "bar", weight: 90 },
    ];
    const getWeight = (x: (typeof items)[0]) => x.weight;

    expect(pickWeightedFn(items, getWeight).name).toBe("foo");
  });

  it("should throw error on empty array", () => {
    const mockRng: RandomFunction = () => 0.5;
    const pickWeightedFn = curryPickWeighted(mockRng);

    expect(() => pickWeightedFn([], (x: any) => x.w)).toThrow("Cannot pick from an empty array");
  });
});

describe("curryWeightedIndex", () => {
  it("should return correct index based on weights", () => {
    const items = [
      { id: "a", w: 1 },
      { id: "b", w: 2 },
      { id: "c", w: 7 },
    ];
    const getWeight = (x: (typeof items)[0]) => x.w;

    expect(curryWeightedIndex(() => 0.05)(items, getWeight)).toBe(0);
    expect(curryWeightedIndex(() => 0.25)(items, getWeight)).toBe(1);
    expect(curryWeightedIndex(() => 0.8)(items, getWeight)).toBe(2);
  });

  it("should return -1 if empty array or total weight <= 0", () => {
    const weightedIndexFn = curryWeightedIndex(() => 0.5);
    expect(weightedIndexFn([], () => 1)).toBe(-1);

    const zeroWeightItems = [{ w: 0 }, { w: -5 }];
    expect(weightedIndexFn(zeroWeightItems, (x) => x.w)).toBe(-1);
  });
});

describe("curryShuffle", () => {
  it("should return a new shuffled array without modifying the original", () => {
    const mockRng: RandomFunction = () => 0.3;
    const shuffleFn = curryShuffle(mockRng);
    const original = [1, 2, 3, 4, 5];
    const originalCopy = [...original];

    const result = shuffleFn(original);

    expect(result).not.toBe(original);
    expect(original).toEqual(originalCopy);
    expect(result.sort()).toEqual(originalCopy.sort());
  });
});

describe("curryShuffleInPlace", () => {
  it("should shuffle array in-place and return the same array reference", () => {
    const mockRng: RandomFunction = () => 0.3;
    const shuffleInPlaceFn = curryShuffleInPlace(mockRng);
    const arr = [1, 2, 3, 4, 5];

    const result = shuffleInPlaceFn(arr);

    expect(result).toBe(arr);
    expect(arr.sort()).toEqual([1, 2, 3, 4, 5]);
  });
});

describe("currySample", () => {
  it("should sample k unique random items without replacement", () => {
    const mockRng: RandomFunction = () => 0.4;
    const sampleFn = currySample(mockRng);
    const items = ["a", "b", "c", "d", "e"];

    const sample = sampleFn(items, 3);

    expect(sample.length).toBe(3);
    expect(new Set(sample).size).toBe(3);
    for (const item of sample) {
      expect(items).toContain(item);
    }
  });

  it("should handle edge cases (k <= 0, empty array, k >= length)", () => {
    const sampleFn = currySample(() => 0.5);
    const items = ["a", "b"];

    expect(sampleFn([], 2)).toEqual([]);
    expect(sampleFn(items, 0)).toEqual([]);
    expect(sampleFn(items, -1)).toEqual([]);

    const overSample = sampleFn(items, 5);
    expect(overSample).not.toBe(items);
    expect(overSample).toEqual(items);
  });
});

describe("decorateRandomWithArray", () => {
  it("should attach all array functions and return the decorated generator", () => {
    let mockVal = 0.5;
    const mockRng: RandomFunction = () => mockVal;
    const decorated = decorateRandomWithArray(mockRng);

    expect(decorated).toBe(mockRng);
    expect(typeof decorated.index).toBe("function");
    expect(typeof decorated.pick).toBe("function");
    expect(typeof decorated.pickWeighted).toBe("function");
    expect(typeof decorated.weightedIndex).toBe("function");
    expect(typeof decorated.shuffle).toBe("function");
    expect(typeof decorated.shuffleInPlace).toBe("function");
    expect(typeof decorated.sample).toBe("function");

    // Test decorated method invocation using host RNG
    expect(decorated.index(10)).toBe(5);

    const items = ["x", "y", "z"];
    expect(decorated.pick(items)).toBe("y");

    const sample = decorated.sample(items, 2);
    expect(sample.length).toBe(2);
  });
});
