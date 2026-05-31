import { runRNGTests } from "./harness.js";
import { createMersenneTwister } from "./mersenne-twister.js";

runRNGTests("MersenneTwister", createMersenneTwister);
