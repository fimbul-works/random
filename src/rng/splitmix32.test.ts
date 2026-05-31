import { runRNGTests } from "./harness.js";
import { createSplitMix32 } from "./splitmix32.js";

runRNGTests("SplitMix32", createSplitMix32);
