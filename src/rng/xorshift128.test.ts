import { runRNGTests } from "./test-harness.js";
import { createRandomXorshift128 } from "./xorshift128.js";

runRNGTests("Xorshift128", createRandomXorshift128);
