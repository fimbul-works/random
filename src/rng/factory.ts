import { createAlea } from "./alea.js";
import { createJSF32 } from "./jsf32.js";
import { createJSF32b } from "./jsf32b.js";
import { createMersenneTwister } from "./mersenne-twister.js";
import { createMulberry32 } from "./mulberry32.js";
import { createParkMiller } from "./park-miller.js";
import { createSFC32 } from "./sfc32.js";
import { createSplitMix32 } from "./splitmix32.js";
import { createTychei } from "./tychei.js";
import { createXor4096 } from "./xor4096.js";
import { createXorShiftMash } from "./xorshift-mash.js";
import { createXorshift7 } from "./xorshift7.js";
import { createXorshift128 } from "./xorshift128.js";
import { createXorwow } from "./xorwow.js";
import { createXoshiro128Plus } from "./xoshiro128-plus.js";
import { createXoshiro128PlusPlus } from "./xoshiro128-plusplus.js";

export const randomFactories = {
  Alea: createAlea,
  JSF32: createJSF32,
  JSF32b: createJSF32b,
  MersenneTwister: createMersenneTwister,
  Mulberry32: createMulberry32,
  ParkMiller: createParkMiller,
  SFC32: createSFC32,
  SplitMix32: createSplitMix32,
  "Tyche-i": createTychei,
  xorshiftMash: createXorShiftMash,
  xorshift7: createXorshift7,
  xorwow: createXorwow,
  xor128: createXorshift128,
  xor4096: createXor4096,
  "xoshiro128+": createXoshiro128Plus,
  "xoshiro128++": createXoshiro128PlusPlus,
};

export default randomFactories;
