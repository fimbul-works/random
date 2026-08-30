import { createRandomXoshiro256PlusPlus } from "./xoshiro256-plusplus.js";
import { runRNGTests } from "./test-harness.js";

runRNGTests("Xoshiro256++", createRandomXoshiro256PlusPlus);
