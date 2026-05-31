import { describe, expect, it } from "vitest";
import { randomWeightedKey } from "./object.js";

describe("randomWeightedKey", () => {
  it("should select correct key based on weights", () => {
    const keyAndWeight = {
      apple: 1,
      banana: 2,
      cherry: 7,
    };

    // Total weight = 10
    // Mock random returning 0.05 -> target 0.5 -> matches first slot ("apple")
    expect(randomWeightedKey(keyAndWeight, () => 0.05)).toBe("apple");

    // Mock random returning 0.25 -> target 2.5 -> matches second slot ("banana")
    expect(randomWeightedKey(keyAndWeight, () => 0.25)).toBe("banana");

    // Mock random returning 0.8 -> target 8 -> matches third slot ("cherry")
    expect(randomWeightedKey(keyAndWeight, () => 0.8)).toBe("cherry");
  });

  it("should throw an error on empty keys or total weight <= 0", () => {
    expect(() => randomWeightedKey({})).toThrow("Invalid weighted key object");

    expect(() =>
      randomWeightedKey({
        a: 0,
        b: -10,
      }),
    ).toThrow("Invalid weighted key object");
  });
});
