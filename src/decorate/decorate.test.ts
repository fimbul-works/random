import { describe, expect, it } from "vitest";
import { FRAC, INT_32 } from "../constants.js";
import type { RandomFunction, RandomInt32Function, RandomInt64Function, Seed } from "../types.js";
import {
  decorateRandomFloat,
  decorateRandomInt32,
  decorateRandomInt64,
  defineRandomState,
  defineValue,
} from "./decorate.js";

describe("defineValue", () => {
  it("should define an enumerable property on a target object", () => {
    const target: Record<string, any> = {};
    defineValue(target, "testProp", 123);

    expect(target.testProp).toBe(123);
    expect(Object.keys(target)).toContain("testProp");
  });

  it("should define a writable property by default", () => {
    const target: Record<string, any> = {};
    defineValue(target, "writableProp", "initial");
    expect(target.writableProp).toBe("initial");

    target.writableProp = "modified";
    expect(target.writableProp).toBe("modified");
  });

  it("should define a non-writable property when writable is false", () => {
    const target: Record<string, any> = {};
    defineValue(target, "readOnlyProp", "fixed", false);
    expect(target.readOnlyProp).toBe("fixed");

    expect(() => {
      "use strict";
      target.readOnlyProp = "changed";
    }).toThrow(TypeError);
    expect(target.readOnlyProp).toBe("fixed");
  });

  it("should work on function objects", () => {
    const fn = () => 42;
    defineValue(fn, "extraFn", () => "hello");
    defineValue(fn, "staticVal", 999);

    expect(fn()).toBe(42);
    expect((fn as any).extraFn()).toBe("hello");
    expect((fn as any).staticVal).toBe(999);
  });
});

describe("defineRandomState", () => {
  it("should attach seed, getState, and setState to a function", () => {
    let state = 42;
    const baseRng: RandomInt32Function = () => 12345678;
    const seed: Seed = 12345;

    const statefulRng = defineRandomState(
      baseRng,
      seed,
      () => state,
      (newState) => {
        state = newState;
      },
    );

    expect(statefulRng).toBe(baseRng);
    expect(statefulRng()).toBe(12345678);
    expect(statefulRng.seed).toBe(12345);
    expect(statefulRng.getState()).toBe(42);

    statefulRng.setState(100);
    expect(statefulRng.getState()).toBe(100);
  });

  it("should make seed read-only", () => {
    const baseRng: RandomInt32Function = () => 0;
    const statefulRng = defineRandomState(
      baseRng,
      999,
      () => 0,
      () => {},
    );

    expect(() => {
      "use strict";
      (statefulRng as any).seed = 111;
    }).toThrow(TypeError);
    expect(statefulRng.seed).toBe(999);
  });
});

describe("decorateRandomFloat", () => {
  it("should attach .int(), .int64(), and .double() to a float [0, 1] generator", () => {
    let floatVal = 0.5;
    const randomFloat: RandomFunction = () => floatVal;
    const decorated = decorateRandomFloat(randomFloat);

    expect(decorated()).toBe(0.5);
    expect(decorated.int()).toBe(2147483648);
    expect(typeof decorated.int64()).toBe("bigint");
    expect(typeof decorated.double()).toBe("number");
    expect(decorated.bits).toBe(32);
  });
});

describe("decorateRandomInt32", () => {
  it("should convert integer output to [0, 1) float when called directly", () => {
    let val = 2147483648;
    const raw32: RandomInt32Function = () => val;
    const decorated = decorateRandomInt32(raw32);

    expect(decorated()).toBeCloseTo(0.5, 5);
  });

  it("should attach .int() and generate unsigned 32-bit integers directly", () => {
    let rawVal = 2147483648;
    const raw32: RandomInt32Function = () => rawVal;
    const decorated = decorateRandomInt32(raw32);

    expect(decorated.int()).toBe(2147483648);

    rawVal = 0;
    expect(decorated.int()).toBe(0);

    rawVal = 4294967295;
    expect(decorated.int()).toBe(4294967295);
  });

  it("should work seamlessly with outer defineRandomState", () => {
    let state = 99;
    const raw32: RandomInt32Function = () => 123;
    const decorated = decorateRandomInt32(raw32);
    const statefulRng = defineRandomState(
      decorated,
      777,
      () => state,
      (s) => {
        state = s;
      },
    );

    expect(statefulRng.seed).toBe(777);
    expect(statefulRng.getState()).toBe(99);
    statefulRng.setState(200);
    expect(statefulRng.getState()).toBe(200);
    expect(statefulRng.int()).toBe(123);
    expect(statefulRng.bits).toBe(32);
  });

  it("should attach .int64() and generate unsigned 64-bit BigInts correctly", () => {
    const sequence = [2147483648, 1073741824];
    let idx = 0;
    const raw32: RandomInt32Function = () => sequence[idx++ % sequence.length];
    const decorated = decorateRandomInt32(raw32);

    const expected = (BigInt(2147483648) << 32n) | BigInt(1073741824);
    expect(decorated.int64()).toBe(expected);
    expect(typeof decorated.int64()).toBe("bigint");
  });

  it("should attach .double() and generate double-precision floats in [0.0, 1.0)", () => {
    const raw32: RandomInt32Function = () => 2147483648;
    const decorated = decorateRandomInt32(raw32);

    const d = decorated.double();
    expect(typeof d).toBe("number");
    expect(d).toBeGreaterThanOrEqual(0.0);
    expect(d).toBeLessThan(1.0);
    expect(decorated.bits).toBe(32);
  });
});

describe("decorateRandomInt64", () => {
  it("should attach native 64-bit methods to a raw 64-bit integer generator", () => {
    let counter = 0x123456789abcdef0n;
    const raw64: RandomInt64Function = () => counter++;

    const decorated = decorateRandomInt64(raw64);

    // Base callable returns float in [0.0, 1.0)
    const val = decorated();
    expect(typeof val).toBe("number");
    expect(val).toBeGreaterThanOrEqual(0.0);
    expect(val).toBeLessThan(1.0);

    // .int64() returns native BigInt directly
    const bigVal = decorated.int64();
    expect(typeof bigVal).toBe("bigint");
    expect(bigVal).toBeGreaterThanOrEqual(0n);

    // .int() returns unsigned 32-bit integer
    const intVal = decorated.int();
    expect(typeof intVal).toBe("number");
    expect(Number.isInteger(intVal)).toBe(true);
    expect(intVal).toBeGreaterThanOrEqual(0);
    expect(intVal).toBeLessThanOrEqual(4294967295);

    // .double() returns double float in [0.0, 1.0)
    const doubleVal = decorated.double();
    expect(typeof doubleVal).toBe("number");
    expect(doubleVal).toBeGreaterThanOrEqual(0.0);
    expect(doubleVal).toBeLessThan(1.0);

    // bits property
    expect(decorated.bits).toBe(64);
  });
});
