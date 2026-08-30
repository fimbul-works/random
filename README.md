# @fimbul-works/random

[![license](https://img.shields.io/npm/l/%40fimbul-works%2Frandom?color=brightgreen&style=flat-square)](LICENSE)
[![npm version](https://img.shields.io/npm/v/%40fimbul-works%2Frandom?color=blue&style=flat-square)](https://www.npmjs.com/package/@fimbul-works/random)
[![code style](https://img.shields.io/badge/code_style-biome-dfdbd6?style=flat-square)](https://biomejs.dev)
[![bundle size](https://img.shields.io/badge/bundle_size-ultra--light-blueviolet?style=flat-square)](#performance)

An ultra-lightweight, ESM-first mathematical toolkit for pseudo-random number generation (PRNG), statistical distributions, and high-performance composable procedural generation utilities.

---

## Key Differentiators

* **High-Entropy Seed Expansion**: Fully resolves the common "zero-entropy seed collapse" found in traditional JavaScript PRNGs. Uses `@fimbul-works/hash` (`fastMix`) to expand seeds (numbers or strings) into high-quality starting state vectors.
* **Native 32-bit and 64-bit Integer Engines**: Dedicated support for both 32-bit uint generators and 64-bit BigInt algorithms (e.g., `Lehmer64`, `Wyrand`, `xoshiro256**`). Inspectable via the `.bits` property.
* **Stand-Alone & Tree-Shakeable**: Each generator and utility is modularly bundled. Unused imports are entirely tree-shaken, keeping individual algorithm footprints under **1 KB**.
* **Decoupled State Management**: Full serialization and restoration via `.getState()` and `.setState()`, enabling seamless save systems, deterministic replays, and procedural chunk streaming.
* **Multi-Precision Decorators**: Uniform callable `random()` returning `[0.0, 1.0)`, alongside native `.int()`, `.int64()`, and `.double()` helper methods.
* **Rich Procedural Generation Utilities**: In-place Fisher-Yates shuffling, reservoir sampling, Gaussian/exponential/Poisson distributions, 2D/3D geometry sampling, and curried functional combinators.

---

## Installation

```bash
pnpm add @fimbul-works/random
# or
npm install @fimbul-works/random
# or
yarn add @fimbul-works/random
```

---

## Algorithms

`@fimbul-works/random` includes 33 optimized PRNG implementations categorized by bit-width:

### 32-Bit Integer & Float Algorithms (`bits === 32`)
* **xoshiro / xoroshiro Family**: `xoshiro128++`, `xoshiro128+`, `xoroshiro64++`, `xoroshiro64**`.
* **Romu Family**: `RomuDuoJr`, `RomuTrio`, `RomuQuad` (Mark A. Overton's nonlinear fast PRNGs).
* **JSF / Bob Jenkins**: `JSF32`, `JSF32B` (Small Fast Counting PRNG).
* **Speed & Procgen Favorites**: `SplitMix32`, `Mulberry32`, `SFC32`, `GJRand32`, `Tychei`.
* **Xorshift Variants**: `Xorshift32`, `Xorshift32AMX`, `Xorshift32M`, `Xorshift7`, `Xorshift128`, `XorShiftMash`, `Xorwow`, `Xor4096`.
* **Classics**: `Alea` (Johannes Baagøe's high-entropy float PRNG), `MersenneTwister`, `ParkMiller` (MINSTD).

### 64-Bit Integer Algorithms (`bits === 64`)
* **Lehmer64**: Ultra-fast, minimal multiplicative 64-bit congruential generator.
* **Wyrand**: State-of-the-art fast 64-bit PRNG by Wang Yi with excellent statistical properties.
* **SplitMix64**: Fast 64-bit generator with period $2^{64}$, ideal for generating initial states.
* **MiddleSquareWeyl**: Bernard Widynski's Middle Square Weyl Sequence PRNG.
* **xoshiro256++ / xoshiro256\*\***: David Blackman and Sebastiano Vigna's flagship 256-bit state generators.
* **xoroshiro128\*\***: 128-bit state 64-bit output generator from the xoroshiro family.

---

## High-Performance Utilities

* **Array Operations**: Pure `shuffleArray()`, allocation-free `shuffleInPlace()`, pure weighted picking `pickWeightedRandom()`, and $O(k)$ unique sampling without replacement `sampleRandom()`.
* **Proportional Mappings**: Weighted key extraction from object configurations (`randomWeightedKey()`).
* **Statistical Distributions**: Uniform `randomRange()`, statistical `randomGaussian()`, `randomExp()`, `randomLogistic()`, and discrete `randomPoisson()`.
* **Geometry Samplers**: Uniform area coordinates inside a 2D circle (`randomPointInCircle()`) and uniform coordinates on a 3D sphere surface (`randomPointOnSphere()`).
* **Strings & Ranges**: Alphanumeric / custom alphabet strings (`randomString()`), random booleans with custom bias (`randomBool()`), and random signs (`randomSign()`).

---

## Usage

### 1. 32-Bit PRNG Usage
```typescript
import { createRandomXoshiro128PlusPlus } from "@fimbul-works/random";

// Seeded stateful generator
const rng = createRandomXoshiro128PlusPlus("seed-value-or-number");

// 1. Get raw float in [0.0, 1.0)
const val = rng();

// 2. High-precision integer and double float boundaries
const int32 = rng.int();      // Unsigned 32-bit integer [0, 2^32 - 1]
const int64 = rng.int64();    // Unsigned 64-bit bigint [0n, 2^64 - 1n]
const double = rng.double();  // Double-precision float in [0.0, 1.0)

// 3. Inspect bit-width
console.log(rng.bits); // 32

// 4. Save and restore internal state
const state = rng.getState();
const next1 = rng();
rng.setState(state);
const next2 = rng(); // next1 === next2
```

### 2. 64-Bit Native PRNG Usage
```typescript
import { createRandomLehmer64, createRandomWyrand } from "@fimbul-works/random";

const rng64 = createRandomLehmer64(42n);

console.log(rng64.bits); // 64
const bigVal = rng64.int64(); // Native 64-bit BigInt
const floatVal = rng64();     // Standard [0.0, 1.0) float
```

### 3. Composable Utilities & In-Place Shuffling
```typescript
import {
  createRandomAlea,
  shuffleInPlace,
  sampleRandom,
  randomPointInCircle,
  randomGaussian,
} from "@fimbul-works/random";

const random = createRandomAlea(42);

// Non-allocating in-place Fisher-Yates shuffle
const deck = [1, 2, 3, 4, 5];
shuffleInPlace(deck, random);

// Sample 3 unique items without replacement
const hand = sampleRandom(deck, 3, random);

// Uniform 2D circle sampling
const [x, y] = randomPointInCircle(10.0, random);

// Gaussian normal distribution (mean: 0, stdev: 1.5)
const sample = randomGaussian(0, 1.5, random);
```

### 4. Decorator Extensions
```typescript
import {
  createRandomSplitMix32,
  decorateRandomWithArray,
  decorateRandomWithDistribution,
} from "@fimbul-works/random";

// Compose domain-specific helper methods directly onto the PRNG function
const rng = decorateRandomWithDistribution(
  decorateRandomWithArray(createRandomSplitMix32(12345))
);

const item = rng.pick(["apple", "banana", "cherry"]);
const normalVal = rng.gaussian(100, 15);
```

---

## Documentation

For full type signatures and module documentation, refer to the co-located [/docs](https://github.com/fimbul-works/hash/tree/main/docs) folder.

## License

MIT License - See [LICENSE](LICENSE) file for details.

---

Built with ⚡ by [FimbulWorks](https://github.com/fimbul-works)
