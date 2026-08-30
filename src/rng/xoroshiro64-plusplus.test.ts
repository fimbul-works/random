import { createRandomXoroshiro64PlusPlus } from "./xoroshiro64-plusplus.js";
import { runRNGTests } from "./test-harness.js";

runRNGTests("Xoroshiro64++", createRandomXoroshiro64PlusPlus);
