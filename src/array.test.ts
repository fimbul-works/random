import { describe, expect, it } from "vitest";
import {
  pickRandom,
  pickWeightedRandom,
  randomIndex,
  randomWeightedIndex,
  sampleRandom,
  shuffleArray,
  shuffleInPlace,
} from "./array.js";

describe("randomIndex", () => {
  it("should return a random index within bounds for a length", () => {
    const mockRandom = () => 0.5;
    expect(randomIndex(10, mockRandom)).toBe(5);
  });

  it("should return a random index within bounds for an array", () => {
    const mockRandom = () => 0.75;
    const arr = ["a", "b", "c", "d"];
    expect(randomIndex(arr, mockRandom)).toBe(3);
  });

  it("should return -1 for length <= 0", () => {
    expect(randomIndex(0)).toBe(-1);
    expect(randomIndex(-5)).toBe(-1);
  });
});

describe("pickRandom", () => {
  it("should pick a random element from an array", () => {
    const mockRandom = () => 0.5;
    const arr = ["a", "b", "c"];
    // 0.5 * 3 = 1.5 -> floor(1.5) = 1 -> "b"
    expect(pickRandom(arr, mockRandom)).toBe("b");
  });

  it("should throw an error on empty array", () => {
    expect(() => pickRandom([])).toThrow("Cannot pick from an empty array");
  });
});

describe("randomWeightedIndex", () => {
  it("should return correct index based on weights", () => {
    const items = [
      { id: "a", weight: 1 },
      { id: "b", weight: 2 },
      { id: "c", weight: 7 },
    ];
    const getWeight = (x: (typeof items)[0]) => x.weight;

    // Total weight = 10
    // Mock random returning 0.05 -> target 0.5 -> matches first slot ("a", index 0)
    expect(randomWeightedIndex(items, getWeight, () => 0.05)).toBe(0);

    // Mock random returning 0.25 -> target 2.5 -> matches second slot ("b", index 1)
    expect(randomWeightedIndex(items, getWeight, () => 0.25)).toBe(1);

    // Mock random returning 0.8 -> target 8 -> matches third slot ("c", index 2)
    expect(randomWeightedIndex(items, getWeight, () => 0.8)).toBe(2);
  });

  it("should return -1 if empty array or total weight <= 0", () => {
    expect(randomWeightedIndex([], () => 1)).toBe(-1);

    const items = [{ weight: 0 }, { weight: -5 }];
    expect(randomWeightedIndex(items, (x) => x.weight)).toBe(-1);
  });
});

describe("pickWeightedRandom", () => {
  it("should pick correct item based on weights", () => {
    const items = [
      { name: "foo", w: 10 },
      { name: "bar", w: 90 },
    ];
    const getWeight = (x: (typeof items)[0]) => x.w;

    expect(pickWeightedRandom(items, getWeight, () => 0.05).name).toBe("foo");
    expect(pickWeightedRandom(items, getWeight, () => 0.5).name).toBe("bar");
  });

  it("should throw an error if selection fails", () => {
    expect(() => pickWeightedRandom([], () => 1)).toThrow("Cannot pick from an empty array");
  });
});

describe("shuffleArray", () => {
  it("should return a shuffled clone of the array", () => {
    const arr = [1, 2, 3, 4, 5];
    const mockRandom = () => 0.2;
    const shuffled = shuffleArray(arr, mockRandom);

    // Shuffled copy should have different order (deterministic with mockRandom) but same elements
    expect(shuffled).not.toBe(arr); // should be a new array instance
    expect(shuffled.sort()).toEqual(arr.slice().sort());
  });
});

describe("shuffleInPlace", () => {
  it("should shuffle the array in-place without allocating a new array", () => {
    const arr = [1, 2, 3, 4, 5];
    const mockRandom = () => 0.2;
    const shuffled = shuffleInPlace(arr, mockRandom);

    expect(shuffled).toBe(arr); // should be the identical array instance
    expect(shuffled.sort()).toEqual([1, 2, 3, 4, 5]);
  });
});

describe("sampleRandom", () => {
  it("should select k unique random items from an array without replacement", () => {
    const items = ["a", "b", "c", "d", "e"];
    const mockRandom = () => 0.4;
    const sample = sampleRandom(items, 3, mockRandom);

    expect(sample.length).toBe(3);
    // Unique check
    const unique = new Set(sample);
    expect(unique.size).toBe(3);
    for (const item of sample) {
      expect(items.includes(item)).toBe(true);
    }
  });

  it("should return empty array for k <= 0 or empty array", () => {
    expect(sampleRandom([], 3)).toEqual([]);
    expect(sampleRandom(["a", "b"], 0)).toEqual([]);
  });

  it("should return a copy of the entire array if k >= length", () => {
    const arr = ["a", "b"];
    const sample = sampleRandom(arr, 5);
    expect(sample).not.toBe(arr);
    expect(sample).toEqual(arr);
  });
});
