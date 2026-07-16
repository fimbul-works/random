# @fimbul-works/random

[![license](https://img.shields.io/npm/l/%40fimbul-works%2Frandom?color=brightgreen&style=flat-square)](LICENSE)
[![npm version](https://img.shields.io/npm/v/%40fimbul-works%2Frandom?color=blue&style=flat-square)](https://www.npmjs.com/package/@fimbul-works/random)
[![code style](https://img.shields.io/badge/code_style-biome-dfdbd6?style=flat-square)](https://biomejs.dev)
[![bundle size](https://img.shields.io/badge/bundle_size-ultra--light-blueviolet?style=flat-square)](#performance)

An ultra-lightweight, ESM-first mathematical toolkit for pseudo-random number generation (PRNG), statistical distributions, and high-performance composable utility functions.

---

## Key Differentiators

* **High-Entropy Seed Expansion**: Fully resolves the common "zero-entropy seed collapse" found in traditional JavaScript PRNGs. Uses the `fastMix` symmetric integer hashing algorithm to expand seeds into high-quality starting state vectors.
* **Stand-Alone & Tree-Shakeable**: Each generator (e.g. `xoshiro128++`, `Alea`, `MersenneTwister`) and utility is modularly bundled. Unused imports are entirely tree-shaken, keeping individual algorithm footprints under **1KB**.
* **Unix-Philosophy Design**: Keep state management (`getState`, `setState`), high-level value decoration (`int()`, `int64()`, `double()`), and raw math algorithms strictly decoupled.
* **Rich Utility Suite**: Native support for in-place Fisher-Yates shuffling, reservoir-based array sampling, circle/sphere sampling, and custom probability bias mappings.

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

## Features

### 1. Seedable and stateful PRNG Algorithms
Exposes a comprehensive suite of optimized generators, including:
* **Modern High-Quality**: `xoshiro128++`, `xoshiro128+`, `xor4096`, `xorwow`.
* **Ultra-Fast & Light**: `JSF32`, `JSF32B`, `SplitMix32`, `Mulberry32`, `Alea`.
* **Classic & Period Giants**: `MersenneTwister`, `ParkMiller`, `Xorshift7`, `Xorshift128`.

### 2. High-Performance Utilities
* **Array Operations**: Pure `shuffleArray()`, allocation-free `shuffleInPlace()`, pure weighted picking `pickWeightedRandom()`, and $O(k)$ unique sampling without replacement `sampleRandom()`.
* **Proportional Mappings**: Weighted key extraction from object configurations (`randomWeightedKey()`).
* **Statistical Distributions**: Uniform `randomRange()`, statistical `randomGaussian()`, `randomExp()`, `randomLogistic()`, and discrete `randomPoisson()`.
* **Geometry Samplers**: Uniform area coordinates inside a 2D circle (`randomPointInCircle()`) and uniform coordinates on a 3D sphere surface (`randomPointOnSphere()`).

---

## Usage

### Seeding a High-Quality PRNG
```typescript
import { createRandomXoshiro128PlusPlus } from "@fimbul-works/random";

// Seeded stateful generator
const rng = createRandomXoshiro128PlusPlus(123456);

// 1. Get raw double float in [0.0, 1.0)
const val = rng();

// 2. Get high-precision integers and double float boundaries via decorators
const int32 = rng.int();      // Unsigned 32-bit integer [0, 2^32 - 1]
const int64 = rng.int64();    // Unsigned 64-bit bigint [0n, 2^64 - 1n]
const double = rng.double();  // Double-precision float in [0.0, 1.0)

// 3. Serializing/restoring internal generator states (perfect for procgen/gaming)
const state = rng.getState();
const next1 = rng();
rng.setState(state);
const next2 = rng(); // next1 === next2
```

### Composed Utility Sampling
```typescript
import { createRandomAlea, shuffleInPlace, randomPointInCircle } from "@fimbul-works/random";

const random = createRandomAlea(42);

// In-place shuffle (non-allocating, safe for high-frequency game loop ticks)
const cards = [1, 2, 3, 4, 5];
shuffleInPlace(cards, random);

// Uniform 2D circle sampling
const [x, y] = randomPointInCircle(10.0, random);
```

---

## Documentation

For full type signatures and module documentation, refer to the co-located [/docs](https://github.com/fimbul-works/random/tree/main/docs) folder.

## License

MIT License - See [LICENSE](LICENSE) file for details.

---

Built with ⚡ by [FimbulWorks](https://github.com/fimbul-works)
