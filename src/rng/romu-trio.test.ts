import { createRandomRomuTrio } from "./romu-trio.js";
import { runRNGTests } from "./test-harness.js";

runRNGTests("RomuTrio", createRandomRomuTrio);
