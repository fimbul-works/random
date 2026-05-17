# @fimbul-works/random

A comprehensive utility library for random number generation, noise functions, and related algorithms.

## Features

- Various hashing algorithms
- Multiple random number generators
- 2D, 3D, and 4D noise functions (Perlin, Simplex, Worley, etc.)
- Composite noise functions (fBm, turbulence, etc.)
- Utility functions for random number manipulation

## Installation

```bash
npm install @claus-codes/util-random
```

## Usage

Here are a few examples of what you can do with this library:

```typescript
import {
  createPerlinNoise2D,
  createRandomAlea,
  shuffleArray,
} from '@claus-codes/util-random';

// Create a seeded random number generator
const random = createRandomAlea(12345);
console.log(random());

// Create a 2D Perlin noise function
const noise2D = createPerlinNoise2D(random);
console.log(noise2D(0.5, 0.5));

// Shuffle an array
const array = [1, 2, 3, 4, 5];
console.log(shuffleArray(array, random));
```

## Documentation

For detailed documentation of all available functions and their usage, please refer to the [/docs](https://github.com/claus-codes/util-random/tree/main/docs) folder in the repository.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
