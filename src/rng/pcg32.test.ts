import { createRandomPCG32 } from "./pcg32.js";
import { runRNGTests } from "./test-harness.js";

runRNGTests("PCG32", createRandomPCG32);
