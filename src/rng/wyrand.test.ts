import { createRandomWyrand } from "./wyrand.js";
import { runRNGTests } from "./test-harness.js";

runRNGTests("Wyrand", createRandomWyrand);
