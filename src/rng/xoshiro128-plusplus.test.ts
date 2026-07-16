import { runRNGTests } from "./test-harness.js";
import { createRandomXoshiro128PlusPlus } from "./xoshiro128-plusplus.js";

runRNGTests("Xoshiro128PlusPlus", createRandomXoshiro128PlusPlus);
