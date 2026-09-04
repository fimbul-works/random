import { describe, expect, it } from "vitest";
import { rotl64, rotl } from "./util.js";

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

describe("rot64l", () => {
  it("should shift bits left and rotate excess bits correctly in 64-bit space", () => {
    // 1 << 4 = 16
    expect(rotl64(1n, 4n)).toBe(16n);

    // 0x8000000000000000 rotated left by 1 should become 1 (since high bit wraps around to low bit)
    expect(rotl64(0x8000000000000000n, 1n)).toBe(1n);

    // 0xf0000000 rotated left by 4 should become 0xf
    expect(rotl64(0xf000000000000000n, 4n)).toBe(0xfn);
  });
});
