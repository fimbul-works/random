import { runRNGTests } from "./test-harness.js";
import { createRandomJSF32 } from "./jsf32.js";

runRNGTests("JSF32", createRandomJSF32);
