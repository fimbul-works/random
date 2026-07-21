import { describe, expect, it } from "vitest";
import { expandSeed, hashString, normalizeSeed, rotl } from "./util.js";

describe("hashString", () => {
  it("should return a function that generates 32-bit unsigned integers", () => {
    const nextHash = hashString("hello");
    expect(typeof nextHash).toBe("function");

    const hash = nextHash();
    expect(typeof hash).toBe("number");
    expect(Number.isInteger(hash)).toBe(true);
    expect(hash).toBeGreaterThanOrEqual(0);
    expect(hash).toBeLessThanOrEqual(0xffffffff);
  });

  it("should produce consistent hashes for the same string", () => {
    const nextHash1 = hashString("hello");
    const nextHash2 = hashString("hello");

    // Each call should produce the same sequence
    for (let i = 0; i < 10; i++) {
      expect(nextHash1()).toBe(nextHash2());
    }
  });

  it("should produce different hashes for different strings", () => {
    const nextHash1 = hashString("hello");
    const nextHash2 = hashString("world");

    expect(nextHash1()).not.toBe(nextHash1()); // Different calls produce different values
    expect(nextHash1()).not.toBe(nextHash2()); // Different strings produce different sequences
  });

  it("should handle empty strings", () => {
    const nextHash = hashString("");
    const hash = nextHash();
    expect(typeof hash).toBe("number");
    expect(Number.isInteger(hash)).toBe(true);
    expect(hash).toBeGreaterThanOrEqual(0);
  });

  it("should generate different values on successive calls", () => {
    const nextHash = hashString("test");
    const values = new Set();

    for (let i = 0; i < 100; i++) {
      values.add(nextHash());
    }

    // Should generate 100 unique values
    expect(values.size).toBe(100);
  });
});

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

  it("should hash string seeds to 32-bit integers", () => {
    const normalized = normalizeSeed("test-seed");
    expect(typeof normalized).toBe("number");
    expect(Number.isInteger(normalized)).toBe(true);
    expect(normalized).toBeGreaterThanOrEqual(0);
    expect(normalized).toBeLessThanOrEqual(0xffffffff);
  });

  it("should produce consistent normalized values for the same string", () => {
    const hash1 = normalizeSeed("hello");
    const hash2 = normalizeSeed("hello");
    expect(hash1).toBe(hash2);
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

  it("should expand string seeds into vectors", () => {
    const vector = expandSeed("test-string", 4);
    expect(vector.length).toBe(4);
    for (const val of vector) {
      expect(typeof val).toBe("number");
      expect(Number.isInteger(val)).toBe(true);
      expect(val).toBeGreaterThanOrEqual(0);
    }
  });

  it("should produce consistent vectors for the same string seed", () => {
    const vec1 = expandSeed("my-seed", 4);
    const vec2 = expandSeed("my-seed", 4);
    expect(vec1).toEqual(vec2);
  });

  it("should produce different vectors for different string seeds", () => {
    const vec1 = expandSeed("seed-one", 4);
    const vec2 = expandSeed("seed-two", 4);
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
