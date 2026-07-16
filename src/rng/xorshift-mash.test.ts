import { runRNGTests } from "./test-harness.js";
import { createRandomXorShiftMash } from "./xorshift-mash.js";

runRNGTests("XorShiftMash", createRandomXorShiftMash);
