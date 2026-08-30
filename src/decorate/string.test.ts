import { describe, expect, it } from "vitest";
import type { RandomFunction } from "../types.js";
import { curryString, decorateRandomWithString } from "./string.js";

describe("curryString", () => {
  it("should generate a random string of specified length using default alphabet", () => {
    const mockRng: RandomFunction = () => 0.0;
    const stringFn = curryString(mockRng);

    const str = stringFn(10);
    expect(str.length).toBe(10);
    // Index 0 in default alphabet "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789" is "A"
    expect(str).toBe("AAAAAAAAAA");
  });

  it("should generate a random string using custom alphabet", () => {
    const sequence = [0.0, 0.5, 0.99];
    let idx = 0;
    const mockRng: RandomFunction = () => sequence[idx++ % sequence.length];
    const stringFn = curryString(mockRng);

    const alphabet = "ABC";
    // 0.0 * 3 = 0 -> "A"
    // 0.5 * 3 = 1.5 -> 1 -> "B"
    // 0.99 * 3 = 2.97 -> 2 -> "C"
    const str = stringFn(3, alphabet);
    expect(str).toBe("ABC");
  });

  it("should return an empty string when length is 0", () => {
    const stringFn = curryString(() => 0.5);
    expect(stringFn(0)).toBe("");
  });
});

describe("decorateRandomWithString", () => {
  it("should attach string function to target generator", () => {
    const mockRng: RandomFunction = () => 0.0;
    const decorated = decorateRandomWithString(mockRng);

    expect(decorated).toBe(mockRng);
    expect(typeof decorated.string).toBe("function");

    expect(decorated.string(5, "XYZ")).toBe("XXXXX");
  });
});
