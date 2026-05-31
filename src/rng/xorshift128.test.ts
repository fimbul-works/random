import { runRNGTests } from "./harness.js";
import { createXorshift128 } from "./xorshift128.js";

runRNGTests("Xorshift128", createXorshift128);
