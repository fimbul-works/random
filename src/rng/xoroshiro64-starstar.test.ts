import { createRandomXoroshiro64StarStar } from "./xoroshiro64-starstar.js";
import { runRNGTests } from "./test-harness.js";

runRNGTests("Xoroshiro64**", createRandomXoroshiro64StarStar);
