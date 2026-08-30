import { createRandomSplitMix64 } from "./splitmix64.js";
import { runRNGTests } from "./test-harness.js";

runRNGTests("SplitMix64", createRandomSplitMix64);
