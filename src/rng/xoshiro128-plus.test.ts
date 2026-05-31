import { runRNGTests } from "./harness.js";
import { createXoshiro128Plus } from "./xoshiro128-plus.js";

runRNGTests("Xoshiro128Plus", createXoshiro128Plus);
