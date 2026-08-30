import { createRandomLehmer64 } from "./lehmer64.js";
import { runRNGTests } from "./test-harness.js";

runRNGTests("Lehmer64", createRandomLehmer64);
