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
* **Ultra-Fast & Light**: `JSF32`, `JSF32b`, `SplitMix32`, `Mulberry32`, `alea`.
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
import { createXoshiro128PlusPlus } from "@fimbul-works/random";

// Seeded stateful generator
const rng = createXoshiro128PlusPlus(123456);

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
import { createAlea, shuffleInPlace, randomPointInCircle } from "@fimbul-works/random";

const random = createAlea(42);

// In-place shuffle (non-allocating, safe for high-frequency game loop ticks)
const cards = [1, 2, 3, 4, 5];
shuffleInPlace(cards, random);

// Uniform 2D circle sampling
const [x, y] = randomPointInCircle(10.0, random);
```

---

## Performance & Quality Leaderboard

Generated using `pnpm benchmark` on a standard runtime environment. Scores are normalized against the fastest generator, combined with their statistical randomness quality score:

| Rank | Algorithm | Gen Speed (per Iter) | Quality Pass | Speed Factor | Overall Score |
| :---: | :--- | :---: | :---: | :---: | :---: |
| 1 | **JSF32b** | 85.49 µs | 8 / 8 | 100.0% | **10.000** |
| 2 | **xor4096** | 92.80 µs | 8 / 8 | 92.1% | **9.213** |
| 3 | **Tyche-i** | 90.65 µs | 7 / 8 | 94.3% | **8.370** |
| 4 | **xorshift7** | 102.71 µs | 8 / 8 | 83.2% | **8.323** |
| 5 | **JSF32** | 106.28 µs | 8 / 8 | 80.4% | **8.044** |
| 6 | **SplitMix32** | 106.94 µs | 8 / 8 | 79.9% | **7.995** |
| 7 | **MersenneTwister** | 109.28 µs | 8 / 8 | 78.2% | **7.823** |
| 8 | **xorshiftMash** | 112.89 µs | 8 / 8 | 75.7% | **7.573** |
| 9 | **Mulberry32** | 137.28 µs | 8 / 8 | 62.3% | **6.228** |
| 10 | **Alea** | 155.42 µs | 8 / 8 | 55.0% | **5.500** |
| 11 | **xoshiro128+** | 156.02 µs | 8 / 8 | 54.8% | **5.480** |
| 12 | **xoshiro128++** | 172.93 µs | 8 / 8 | 49.4% | **4.944** |
| 13 | **xor128** | 212.41 µs | 8 / 8 | 40.2% | **4.025** |
| 14 | **ParkMiller** | 198.94 µs | 7 / 8 | 43.0% | **3.814** |
| 15 | **SFC32** | 226.71 µs | 8 / 8 | 37.7% | **3.771** |
| 16 | **xorwow** | 243.61 µs | 8 / 8 | 35.1% | **3.509** |

---

## Documentation

For full type signatures and module documentation, refer to the co-located [/docs](https://github.com/fimbul-works/random/tree/main/docs) folder.

## License

MIT License - See [LICENSE](LICENSE) file for details.

---

Built with ⚡ by [FimbulWorks](https://github.com/fimbul-works)
