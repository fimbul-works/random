import { runRNGTests } from "./harness.js";
import { createXor4096 } from "./xor4096.js";

runRNGTests("Xor4096", createXor4096);
