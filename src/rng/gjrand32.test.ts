import { createRandomGJRand32 } from "./gjrand32.js";
import { runRNGTests } from "./test-harness.js";

runRNGTests("GJRand32", createRandomGJRand32);
