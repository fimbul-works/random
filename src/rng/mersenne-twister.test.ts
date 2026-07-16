import { runRNGTests } from "./test-harness.js";
import { createRandomMersenneTwister } from "./mersenne-twister.js";

runRNGTests("MersenneTwister", createRandomMersenneTwister);
