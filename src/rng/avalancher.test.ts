import { createRandomAvalancher } from "./avalancher.js";
import { runRNGTests } from "./test-harness.js";

runRNGTests("Avalancher", createRandomAvalancher);
