import { createRandomXoshiro256StarStar } from "./xoshiro256-starstar.js";
import { runRNGTests } from "./test-harness.js";

runRNGTests("Xoshiro256**", createRandomXoshiro256StarStar);
