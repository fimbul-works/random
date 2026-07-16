import { runRNGTests } from "./test-harness.js";
import { createRandomXor4096 } from "./xor4096.js";

runRNGTests("Xor4096", createRandomXor4096);
