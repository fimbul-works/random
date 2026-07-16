import { runRNGTests } from "./test-harness.js";
import { createRandomMulberry32 } from "./mulberry32.js";

runRNGTests("Mulberry32", createRandomMulberry32);
