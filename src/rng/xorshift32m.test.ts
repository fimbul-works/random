import { runRNGTests } from "./test-harness.js";
import { createRandomXorshift32M } from "./xorshift32m.js";

runRNGTests("Xorshift32M", createRandomXorshift32M);
