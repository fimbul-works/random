import { createRandomXoroshiro128StarStar } from "./xoroshiro128-starstar.js";
import { runRNGTests } from "./test-harness.js";

runRNGTests("Xoroshiro128**", createRandomXoroshiro128StarStar);
