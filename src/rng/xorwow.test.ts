import { runRNGTests } from "./test-harness.js";
import { createRandomXorwow } from "./xorwow.js";

runRNGTests("Xorwow", createRandomXorwow);
