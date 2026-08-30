import { createRandomMiddleSquareWeyl } from "./middle-square-weyl.js";
import { runRNGTests } from "./test-harness.js";

runRNGTests("MiddleSquareWeyl", createRandomMiddleSquareWeyl);
