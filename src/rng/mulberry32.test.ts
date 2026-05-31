import { runRNGTests } from "./harness.js";
import { createMulberry32 } from "./mulberry32.js";

runRNGTests("Mulberry32", createMulberry32);
