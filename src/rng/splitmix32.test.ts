import { runRNGTests } from "./test-harness.js";
import { createRandomSplitMix32 } from "./splitmix32.js";

runRNGTests("SplitMix32", createRandomSplitMix32);
