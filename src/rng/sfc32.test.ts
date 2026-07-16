import { runRNGTests } from "./test-harness.js";
import { createRandomSFC32 } from "./sfc32.js";

runRNGTests("SFC32", createRandomSFC32);
