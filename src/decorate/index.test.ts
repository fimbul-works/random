import { describe, expect, it } from "vitest";
import * as DecorateModule from "./index.js";

describe("src/decorate index barrel exports", () => {
  it("should export all core decorator functions", () => {
    expect(typeof DecorateModule.defineValue).toBe("function");
    expect(typeof DecorateModule.defineRandomState).toBe("function");
    expect(typeof DecorateModule.decorateRandomFloat).toBe("function");
    expect(typeof DecorateModule.decorateRandomInt32).toBe("function");
    expect(typeof DecorateModule.decorateRandomInt64).toBe("function");
  });

  it("should export all array currying and decorator functions", () => {
    expect(typeof DecorateModule.curryIndex).toBe("function");
    expect(typeof DecorateModule.curryPick).toBe("function");
    expect(typeof DecorateModule.curryPickWeighted).toBe("function");
    expect(typeof DecorateModule.curryWeightedIndex).toBe("function");
    expect(typeof DecorateModule.curryShuffle).toBe("function");
    expect(typeof DecorateModule.curryShuffleInPlace).toBe("function");
    expect(typeof DecorateModule.currySample).toBe("function");
    expect(typeof DecorateModule.decorateRandomWithArray).toBe("function");
  });

  it("should export all distribution currying and decorator functions", () => {
    expect(typeof DecorateModule.curryGaussian).toBe("function");
    expect(typeof DecorateModule.curryExp).toBe("function");
    expect(typeof DecorateModule.curryLogistic).toBe("function");
    expect(typeof DecorateModule.curryPoisson).toBe("function");
    expect(typeof DecorateModule.decorateRandomWithDistribution).toBe("function");
  });

  it("should export all geometry currying and decorator functions", () => {
    expect(typeof DecorateModule.curryPointInCircle).toBe("function");
    expect(typeof DecorateModule.curryPointOnSphere).toBe("function");
    expect(typeof DecorateModule.decorateRandomWithGeometry).toBe("function");
  });

  it("should export all object currying and decorator functions", () => {
    expect(typeof DecorateModule.curryWeightedKey).toBe("function");
    expect(typeof DecorateModule.decorateRandomWithObject).toBe("function");
  });

  it("should export all range currying and decorator functions", () => {
    expect(typeof DecorateModule.curryRange).toBe("function");
    expect(typeof DecorateModule.curryIntRange).toBe("function");
    expect(typeof DecorateModule.curryBool).toBe("function");
    expect(typeof DecorateModule.currySign).toBe("function");
    expect(typeof DecorateModule.decorateRandomWithRange).toBe("function");
  });

  it("should export all string currying and decorator functions", () => {
    expect(typeof DecorateModule.curryString).toBe("function");
    expect(typeof DecorateModule.decorateRandomWithString).toBe("function");
  });
});
