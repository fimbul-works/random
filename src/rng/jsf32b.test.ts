import { runRNGTests } from "./test-harness.js";
import { createRandomJSF32B } from "./jsf32b.js";

runRNGTests("JSF32b", createRandomJSF32B);
