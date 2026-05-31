import { runRNGTests } from "./harness.js";
import { createXorShiftMash } from "./xorshift-mash.js";

runRNGTests("XorShiftMash", createXorShiftMash);
