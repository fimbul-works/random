import { runRNGTests } from "./test-harness.js";
import { createRandomParkMiller } from "./park-miller.js";

runRNGTests("ParkMiller", createRandomParkMiller);
