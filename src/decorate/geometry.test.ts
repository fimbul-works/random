import { describe, expect, it } from "vitest";
import type { RandomFunction } from "../types.js";
import { curryPointInCircle, curryPointOnSphere, decorateRandomWithGeometry } from "./geometry.js";

describe("curryPointInCircle", () => {
  it("should return a curried function generating 2D coordinates within default circle radius (1.0)", () => {
    let mockVal = 0.25;
    const mockRng: RandomFunction = () => mockVal;
    const pointInCircleFn = curryPointInCircle(mockRng);

    const [x, y] = pointInCircleFn();
    const distSq = x * x + y * y;
    expect(distSq).toBeLessThanOrEqual(1.0 + 1e-10);
  });

  it("should generate coordinates within custom circle radius", () => {
    let mockVal = 0.5;
    const mockRng: RandomFunction = () => mockVal;
    const pointInCircleFn = curryPointInCircle(mockRng);

    const radius = 5.0;
    const [x, y] = pointInCircleFn(radius);
    const distSq = x * x + y * y;
    expect(distSq).toBeLessThanOrEqual(radius * radius + 1e-10);
  });
});

describe("curryPointOnSphere", () => {
  it("should return a curried function generating 3D coordinates on default sphere surface (radius 1.0)", () => {
    let mockVal = 0.3;
    const mockRng: RandomFunction = () => mockVal;
    const pointOnSphereFn = curryPointOnSphere(mockRng);

    const [x, y, z] = pointOnSphereFn();
    const r = Math.sqrt(x * x + y * y + z * z);
    expect(r).toBeCloseTo(1.0, 5);
  });

  it("should generate coordinates on custom sphere surface", () => {
    let mockVal = 0.4;
    const mockRng: RandomFunction = () => mockVal;
    const pointOnSphereFn = curryPointOnSphere(mockRng);

    const radius = 10.0;
    const [x, y, z] = pointOnSphereFn(radius);
    const r = Math.sqrt(x * x + y * y + z * z);
    expect(r).toBeCloseTo(radius, 5);
  });
});

describe("decorateRandomWithGeometry", () => {
  it("should attach geometry functions to target random generator", () => {
    const mockRng: RandomFunction = () => 0.5;
    const decorated = decorateRandomWithGeometry(mockRng);

    expect(decorated).toBe(mockRng);
    expect(typeof decorated.pointInCircle).toBe("function");
    expect(typeof decorated.pointOnSphere).toBe("function");

    const circlePoint = decorated.pointInCircle(3.0);
    expect(circlePoint.length).toBe(2);

    const spherePoint = decorated.pointOnSphere(2.0);
    expect(spherePoint.length).toBe(3);
  });
});
