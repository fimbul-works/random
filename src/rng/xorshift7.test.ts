import { runRNGTests } from "./harness.js";
import { createXorshift7 } from "./xorshift7.js";

runRNGTests("Xorshift7", createXorshift7);
