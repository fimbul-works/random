import { runRNGTests } from "./harness.js";
import { createParkMiller } from "./park-miller.js";

runRNGTests("ParkMiller", createParkMiller);
