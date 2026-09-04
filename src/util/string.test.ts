import { describe, expect, it } from "vitest";
import { randomString } from "./string.js";

describe("randomString", () => {
  it("should generate a string of correct length", () => {
    expect(randomString(10).length).toBe(10);
    expect(randomString(0).length).toBe(0);
  });

  it("should use the custom alphabet exclusively when provided", () => {
    const alphabet = "abc";
    const result = randomString(100, alphabet);
    for (const char of result) {
      expect(alphabet.includes(char)).toBe(true);
    }
  });

  it("should be deterministic with mock random", () => {
    const alphabet = "abcdef";
    // mock random returning 0.5 -> floor(0.5 * 6) = 3 -> "d"
    const mockRandom = () => 0.5;
    expect(randomString(5, alphabet, mockRandom)).toBe("ddddd");
  });
});
