import { runRNGTests } from "./harness.js";
import { createXoshiro128PlusPlus } from "./xoshiro128-plusplus.js";

runRNGTests("Xoshiro128PlusPlus", createXoshiro128PlusPlus);
