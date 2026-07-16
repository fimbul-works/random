import { runRNGTests } from "./test-harness.js";
import { createRandomXorshift32AMX } from "./xorshift32amx.js";

runRNGTests("Xorshift32AMX", createRandomXorshift32AMX);
