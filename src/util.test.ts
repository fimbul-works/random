import { describe, expect, it } from "vitest";
import { expandSeed, normalizeSeed, rotl } from "./util.js";

describe("normalizeSeed", () => {
  it("should normalize floating-point seeds less than 1 into scaled standard integers", () => {
    const seed = 0.5;
    const normalized = normalizeSeed(seed);
    expect(Number.isInteger(normalized)).toBe(true);
    expect(normalized).toBeGreaterThanOrEqual(0);
    // 0.5 * 2^32 = 2147483648
    expect(normalized).toBe(2147483648);
  });

  it("should return unsigned 32-bit integers for larger seeds", () => {
    const seed = 123456789;
    expect(normalizeSeed(seed)).toBe(123456789);

    const negativeSeed = -0.5;
    // -0.5 * INT_32 = -2147483648 -> -2147483648 >>> 0 = 2147483648
    expect(normalizeSeed(negativeSeed)).toBe(2147483648);
  });
});

describe("expandSeed", () => {
  it("should generate a non-zero 32-bit vector of specified length", () => {
    const vector = expandSeed(12345, 8);
    expect(vector.length).toBe(8);
    for (const val of vector) {
      expect(typeof val).toBe("number");
      expect(Number.isInteger(val)).toBe(true);
      expect(val).toBeGreaterThanOrEqual(0);
      expect(val).toBeLessThanOrEqual(4294967295);
    }
  });

  it("should produce completely different vectors for different seeds", () => {
    const vec1 = expandSeed(12345, 8);
    const vec2 = expandSeed(54321, 8);
    expect(vec1).not.toEqual(vec2);
  });
});

describe("rotl", () => {
  it("should shift bits left and rotate excess bits correctly in 32-bit space", () => {
    // 1 << 4 = 16
    expect(rotl(1, 4)).toBe(16);

    // 0x80000000 rotated left by 1 should become 1 (since high bit wraps around to low bit)
    expect(rotl(0x80000000, 1)).toBe(1);

    // 0xf0000000 rotated left by 4 should become 0xf
    expect(rotl(0xf0000000, 4)).toBe(0xf);
  });
});
