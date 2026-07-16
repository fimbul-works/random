import { runRNGTests } from "./test-harness.js";
import { createRandomXorshift7 } from "./xorshift7.js";

runRNGTests("Xorshift7", createRandomXorshift7);
