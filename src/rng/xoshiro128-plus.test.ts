import { runRNGTests } from "./test-harness.js";
import { createRandomXoshiro128Plus } from "./xoshiro128-plus.js";

runRNGTests("Xoshiro128Plus", createRandomXoshiro128Plus);
