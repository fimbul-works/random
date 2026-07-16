import { createRandomAlea } from "./alea.js";
import { runRNGTests } from "./test-harness.js";

runRNGTests("Alea", createRandomAlea);
