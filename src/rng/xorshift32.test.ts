import { runRNGTests } from "./test-harness.js";
import { createRandomXorshift32 } from "./xorshift32.js";

runRNGTests("Xorshift32", createRandomXorshift32);
