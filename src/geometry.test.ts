import { describe, expect, it } from "vitest";
import { randomPointInCircle, randomPointOnSphere } from "./geometry.js";

describe("randomPointInCircle", () => {
  it("should return coordinates within the circle radius", () => {
    const radius = 5;
    for (let i = 0; i < 1000; i++) {
      const [x, y] = randomPointInCircle(radius);
      const dist = Math.sqrt(x * x + y * y);
      expect(dist).toBeLessThanOrEqual(radius);
    }
  });

  it("should be deterministic with mock random", () => {
    const mockRandom = () => 0.25; // sqrt(0.25) = 0.5; theta = 0.25 * 2 * PI = PI / 2
    // cos(PI/2) = 0, sin(PI/2) = 1
    const [x, y] = randomPointInCircle(10, mockRandom);
    expect(x).toBeCloseTo(0, 5);
    expect(y).toBeCloseTo(5, 5);
  });
});

describe("randomPointOnSphere", () => {
  it("should return coordinates exactly on the sphere surface", () => {
    const radius = 3;
    for (let i = 0; i < 1000; i++) {
      const [x, y, z] = randomPointOnSphere(radius);
      const dist = Math.sqrt(x * x + y * y + z * z);
      expect(dist).toBeCloseTo(radius, 5);
    }
  });

  it("should be deterministic with mock random", () => {
    // u = 0.5 * 2 - 1 = 0
    // phi = 0.25 * 2 * PI = PI / 2
    // r = sqrt(1 - 0) = 1
    // x = cos(PI/2) = 0, y = sin(PI/2) = 1, z = 0
    const mockRandom = () => 0.5; // Make it returning different values if called sequentially, but our mock random is just returning a fixed value.
    // Let's trace it:
    // u = mockRandom() * 2.0 - 1.0 = 0.5 * 2 - 1 = 0
    // phi = mockRandom() * 2.0 * PI = 0.5 * 2 * PI = PI
    // r = radius * sqrt(1 - 0) = radius
    // x = r * cos(PI) = -radius, y = r * sin(PI) = 0, z = radius * 0 = 0
    const [x, y, z] = randomPointOnSphere(10, mockRandom);
    expect(x).toBeCloseTo(-10, 5);
    expect(y).toBeCloseTo(0, 5);
    expect(z).toBeCloseTo(0, 5);
  });
});
