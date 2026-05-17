# @fimbul-works/random

## Interfaces

### RandomNumberGenerator()

Defined in: [types.ts:4](https://github.com/claus-codes/util-random/blob/main/src/types.ts#L4)

Decorated PRNG function.

#### Extended by

- [`StatefulRandomNumberGenerator`](#statefulrandomnumbergenerator)

```ts
RandomNumberGenerator(): number;
```

Defined in: [types.ts:8](https://github.com/claus-codes/util-random/blob/main/src/types.ts#L8)

Return a random number between 0.0 and 1.0.

#### Returns

`number`

#### Properties

| Property | Modifier | Type | Description | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-seed"></a> `seed?` | `readonly` | `number` | Read-only initial seed as an unsigned integer. | [types.ts:13](https://github.com/claus-codes/util-random/blob/main/src/types.ts#L13) |

#### Methods

##### double()

```ts
double(): number;
```

Defined in: [types.ts:28](https://github.com/claus-codes/util-random/blob/main/src/types.ts#L28)

Return a random double-precision floating point number between 0.0 and 1.0.

###### Returns

`number`

##### int()

```ts
int(): number;
```

Defined in: [types.ts:18](https://github.com/claus-codes/util-random/blob/main/src/types.ts#L18)

Return a random 32-bit number.

###### Returns

`number`

##### int64()

```ts
int64(): bigint;
```

Defined in: [types.ts:23](https://github.com/claus-codes/util-random/blob/main/src/types.ts#L23)

Return a random 64-bit number.

###### Returns

`bigint`

***

### StatefulRandomNumberGenerator()

Defined in: [types.ts:31](https://github.com/claus-codes/util-random/blob/main/src/types.ts#L31)

Decorated PRNG function.

#### Extends

- [`RandomNumberGenerator`](#randomnumbergenerator)

#### Type Parameters

| Type Parameter |
| ------ |
| `T` |

```ts
StatefulRandomNumberGenerator(): number;
```

Defined in: [types.ts:31](https://github.com/claus-codes/util-random/blob/main/src/types.ts#L31)

Return a random number between 0.0 and 1.0.

#### Returns

`number`

#### Properties

| Property | Modifier | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ | ------ |
| <a id="property-getstate"></a> `getState` | `public` | () => `T` | Get the internal registry state. | - | [types.ts:37](https://github.com/claus-codes/util-random/blob/main/src/types.ts#L37) |
| <a id="property-seed-1"></a> `seed?` | `readonly` | `number` | Read-only initial seed as an unsigned integer. | [`RandomNumberGenerator`](#randomnumbergenerator).[`seed`](#property-seed) | [types.ts:13](https://github.com/claus-codes/util-random/blob/main/src/types.ts#L13) |
| <a id="property-setstate"></a> `setState` | `public` | (`state`) => `void` | Set the internal registry state | - | [types.ts:43](https://github.com/claus-codes/util-random/blob/main/src/types.ts#L43) |

#### Methods

##### double()

```ts
double(): number;
```

Defined in: [types.ts:28](https://github.com/claus-codes/util-random/blob/main/src/types.ts#L28)

Return a random double-precision floating point number between 0.0 and 1.0.

###### Returns

`number`

###### Inherited from

[`RandomNumberGenerator`](#randomnumbergenerator).[`double`](#double)

##### int()

```ts
int(): number;
```

Defined in: [types.ts:18](https://github.com/claus-codes/util-random/blob/main/src/types.ts#L18)

Return a random 32-bit number.

###### Returns

`number`

###### Inherited from

[`RandomNumberGenerator`](#randomnumbergenerator).[`int`](#int)

##### int64()

```ts
int64(): bigint;
```

Defined in: [types.ts:23](https://github.com/claus-codes/util-random/blob/main/src/types.ts#L23)

Return a random 64-bit number.

###### Returns

`bigint`

###### Inherited from

[`RandomNumberGenerator`](#randomnumbergenerator).[`int64`](#int64)

## Type Aliases

### AleaState

```ts
type AleaState = [number, number, number, number];
```

Defined in: [rng/alea.ts:12](https://github.com/claus-codes/util-random/blob/main/src/rng/alea.ts#L12)

Alea internal registry state.

***

### MersenneTwisterState

```ts
type MersenneTwisterState = [number[], number];
```

Defined in: [rng/mersenne-twister.ts:12](https://github.com/claus-codes/util-random/blob/main/src/rng/mersenne-twister.ts#L12)

Mersenne Twister internal state (state and state index).

***

### SFC32State

```ts
type SFC32State = [number, number, number, number];
```

Defined in: [rng/sfc32.ts:8](https://github.com/claus-codes/util-random/blob/main/src/rng/sfc32.ts#L8)

SFC32 internal registry state.

***

### TycheiState

```ts
type TycheiState = [number, number, number, number];
```

Defined in: [rng/tychei.ts:8](https://github.com/claus-codes/util-random/blob/main/src/rng/tychei.ts#L8)

Tyche-i internal registry state.

***

### WeightExtractor

```ts
type WeightExtractor<T> = (item) => number;
```

Defined in: [array.ts:6](https://github.com/claus-codes/util-random/blob/main/src/array.ts#L6)

A function that extracts a weight from an object of type T.

#### Type Parameters

| Type Parameter |
| ------ |
| `T` *extends* `object` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `item` | `T` | Object to extract a weight value from |

#### Returns

`number`

Number representing weight

***

### Xiroshiro128State

```ts
type Xiroshiro128State = [number, number, number, number];
```

Defined in: [rng/xoshiro128-plus.ts:8](https://github.com/claus-codes/util-random/blob/main/src/rng/xoshiro128-plus.ts#L8)

Xiroshiro-128 internal registry state.

***

### Xor128State

```ts
type Xor128State = [number, number, number, number];
```

Defined in: [rng/xor128.ts:8](https://github.com/claus-codes/util-random/blob/main/src/rng/xor128.ts#L8)

Xor128 internal registry state.

***

### Xor4096State

```ts
type Xor4096State = [number, number[], number];
```

Defined in: [rng/xor4096.ts:8](https://github.com/claus-codes/util-random/blob/main/src/rng/xor4096.ts#L8)

Xor4096 internal registry state.

***

### XorShift7State

```ts
type XorShift7State = [number[], number];
```

Defined in: [rng/xor-shift7.ts:9](https://github.com/claus-codes/util-random/blob/main/src/rng/xor-shift7.ts#L9)

XorShift7 internal registry state.

***

### XorWowState

```ts
type XorWowState = [number, number, number, number, number, number];
```

Defined in: [rng/xor-wow.ts:8](https://github.com/claus-codes/util-random/blob/main/src/rng/xor-wow.ts#L8)

XorWow internal registry state.

## Functions

### createAlea()

```ts
function createAlea(seed?): StatefulRandomNumberGenerator<AleaState>;
```

Defined in: [rng/alea.ts:20](https://github.com/claus-codes/util-random/blob/main/src/rng/alea.ts#L20)

Creates a new Alea PRNG.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `seed` | `number` | Seed number |

#### Returns

[`StatefulRandomNumberGenerator`](#statefulrandomnumbergenerator)\<[`AleaState`](#aleastate)\>

A new PRNG

***

### createMersenneTwister()

```ts
function createMersenneTwister(seed?): StatefulRandomNumberGenerator<MersenneTwisterState>;
```

Defined in: [rng/mersenne-twister.ts:19](https://github.com/claus-codes/util-random/blob/main/src/rng/mersenne-twister.ts#L19)

Creates a new Mersenne Twister PRNG.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `seed` | `number` | Seed number |

#### Returns

[`StatefulRandomNumberGenerator`](#statefulrandomnumbergenerator)\<[`MersenneTwisterState`](#mersennetwisterstate)\>

A new PRNG

***

### createMulberry32()

```ts
function createMulberry32(seed?): RandomNumberGenerator;
```

Defined in: [rng/mulberry32.ts:11](https://github.com/claus-codes/util-random/blob/main/src/rng/mulberry32.ts#L11)

Creates a new Mulberry32 PRNG.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `seed` | `number` | The seed value for the PRNG |

#### Returns

[`RandomNumberGenerator`](#randomnumbergenerator)

A new PRNG

***

### createParkMiller()

```ts
function createParkMiller(seed?): StatefulRandomNumberGenerator<number>;
```

Defined in: [rng/park-miller.ts:12](https://github.com/claus-codes/util-random/blob/main/src/rng/park-miller.ts#L12)

Park-Miller LCG (MINSTD) PRNG.
Reference: https://en.wikipedia.org/wiki/Lehmer_random_number_generator
Reference: https://www.firstpr.com.au/dsp/rand31/

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `seed` | `number` | Seed number |

#### Returns

[`StatefulRandomNumberGenerator`](#statefulrandomnumbergenerator)\<`number`\>

A new PRNG

***

### createSFC32()

```ts
function createSFC32(seed?): StatefulRandomNumberGenerator<SFC32State>;
```

Defined in: [rng/sfc32.ts:17](https://github.com/claus-codes/util-random/blob/main/src/rng/sfc32.ts#L17)

SFC32 (Small Fast Chaotic) PRNG by Chris Doty-Humphrey.
Reference: https://github.com/bryc/code/blob/master/jshash/PRNGs.md

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `seed` | `number` | Seed number |

#### Returns

[`StatefulRandomNumberGenerator`](#statefulrandomnumbergenerator)\<[`SFC32State`](#sfc32state)\>

A new PRNG

***

### createSplitMix32()

```ts
function createSplitMix32(seed?): RandomNumberGenerator;
```

Defined in: [rng/splitmix32.ts:11](https://github.com/claus-codes/util-random/blob/main/src/rng/splitmix32.ts#L11)

Creates a new SplitMix32 PRNG.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `seed` | `number` | Seed number |

#### Returns

[`RandomNumberGenerator`](#randomnumbergenerator)

A new PRNG

***

### createTychei()

```ts
function createTychei(seed?): StatefulRandomNumberGenerator<TycheiState>;
```

Defined in: [rng/tychei.ts:17](https://github.com/claus-codes/util-random/blob/main/src/rng/tychei.ts#L17)

Tyche-i PRNG by Samuel Neves and Filipe Araujo.
Reference: https://link.springer.com/chapter/10.1007/978-3-642-31464-3_10

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `seed` | `number` | Seed number |

#### Returns

[`StatefulRandomNumberGenerator`](#statefulrandomnumbergenerator)\<[`TycheiState`](#tycheistate)\>

A new PRNG

***

### createXor128()

```ts
function createXor128(seed?): StatefulRandomNumberGenerator<Xor128State>;
```

Defined in: [rng/xor128.ts:19](https://github.com/claus-codes/util-random/blob/main/src/rng/xor128.ts#L19)

Xor128 PRNG by George Marsaglia.
Reference: https://doi.org/10.18637/jss.v008.i14
Reference: https://www.semanticscholar.org/paper/Xorshift-RNGs-RNGs-Marsaglia/2f8b197c3b34d86478f1eaed1fb61f5b1c556fa5
Reference: https://vigna.di.unimi.it/ftp/papers/xorshift.pdf

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `seed` | `number` | Seed number |

#### Returns

[`StatefulRandomNumberGenerator`](#statefulrandomnumbergenerator)\<[`Xor128State`](#xor128state)\>

A new PRNG

***

### createXor4096()

```ts
function createXor4096(seed?): StatefulRandomNumberGenerator<Xor4096State>;
```

Defined in: [rng/xor4096.ts:17](https://github.com/claus-codes/util-random/blob/main/src/rng/xor4096.ts#L17)

Xor4096 PRNG by Richard Brent.
Reference: https://github.com/davidbau/seedrandom

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `seed` | `number` | Seed number |

#### Returns

[`StatefulRandomNumberGenerator`](#statefulrandomnumbergenerator)\<[`Xor4096State`](#xor4096state)\>

A new PRNG

***

### createXorShift7()

```ts
function createXorShift7(seed?): StatefulRandomNumberGenerator<XorShift7State>;
```

Defined in: [rng/xor-shift7.ts:18](https://github.com/claus-codes/util-random/blob/main/src/rng/xor-shift7.ts#L18)

XorShift7 PRNG by François Panneton and Pierre L'Ecuyer.
Reference: https://www.iro.umontreal.ca/~lecuyer/myftp/papers/xorshift.pdf

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `seed` | `number` | Seed number |

#### Returns

[`StatefulRandomNumberGenerator`](#statefulrandomnumbergenerator)\<[`XorShift7State`](#xorshift7state)\>

A new PRNG

***

### createXorShiftMash()

```ts
function createXorShiftMash(seed?): RandomNumberGenerator;
```

Defined in: [rng/xor-shift-mash.ts:12](https://github.com/claus-codes/util-random/blob/main/src/rng/xor-shift-mash.ts#L12)

XorShiftMash — A tiny stateful PRNG using xorShift mixed with Mash constants.
Highly deterministic and good for string-seeded procedural generation.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `seed` | `number` | Seed number |

#### Returns

[`RandomNumberGenerator`](#randomnumbergenerator)

A new PRNG

***

### createXorWow()

```ts
function createXorWow(seed?): StatefulRandomNumberGenerator<XorWowState>;
```

Defined in: [rng/xor-wow.ts:17](https://github.com/claus-codes/util-random/blob/main/src/rng/xor-wow.ts#L17)

XorWow PRNG by François Panneton and Pierre L'Ecuyer.
Reference: https://www.iro.umontreal.ca/~lecuyer/myftp/papers/xorshift.pdf

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `seed` | `number` | Seed number |

#### Returns

[`StatefulRandomNumberGenerator`](#statefulrandomnumbergenerator)\<[`XorWowState`](#xorwowstate)\>

A new PRNG

***

### createXoshiro128Plus()

```ts
function createXoshiro128Plus(seed?): StatefulRandomNumberGenerator<Xiroshiro128State>;
```

Defined in: [rng/xoshiro128-plus.ts:17](https://github.com/claus-codes/util-random/blob/main/src/rng/xoshiro128-plus.ts#L17)

Xoshiro128+ PRNG by David Blackman and Sebastiano Vigna.
Reference: https://prng.di.unimi.it/xoshiro128plus.c

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `seed` | `number` | Seed number |

#### Returns

[`StatefulRandomNumberGenerator`](#statefulrandomnumbergenerator)\<[`Xiroshiro128State`](#xiroshiro128state)\>

A new PRNG

***

### createXoshiro128PlusPlus()

```ts
function createXoshiro128PlusPlus(seed?): StatefulRandomNumberGenerator<Xiroshiro128State>;
```

Defined in: [rng/xoshiro128-plusplus.ts:13](https://github.com/claus-codes/util-random/blob/main/src/rng/xoshiro128-plusplus.ts#L13)

Xoshiro128++ PRNG by David Blackman and Sebastiano Vigna.
Reference: https://prng.di.unimi.it/xoshiro128plusplus.c

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `seed` | `number` | Seed number |

#### Returns

[`StatefulRandomNumberGenerator`](#statefulrandomnumbergenerator)\<[`Xiroshiro128State`](#xiroshiro128state)\>

A new PRNG

***

### pickRandom()

```ts
function pickRandom<T>(items, random?): T;
```

Defined in: [array.ts:63](https://github.com/claus-codes/util-random/blob/main/src/array.ts#L63)

Pick a random item from an array.

#### Type Parameters

| Type Parameter |
| ------ |
| `T` |

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `items` | `T`[] | `undefined` | An array of choices. |
| `random` | () => `number` | `Math.random` | PRNG that returns a value between 0.0 and 1.0 |

#### Returns

`T`

Random item

#### Throws

When passed an empty array

***

### pickWeightedRandom()

```ts
function pickWeightedRandom<T>(
   items, 
   getWeight, 
   random?): T;
```

Defined in: [array.ts:79](https://github.com/claus-codes/util-random/blob/main/src/array.ts#L79)

Pick a random item from an array of objects based on their weights.

#### Type Parameters

| Type Parameter |
| ------ |
| `T` *extends* `object` |

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `items` | `T`[] | `undefined` | An array of objects |
| `getWeight` | [`WeightExtractor`](#weightextractor)\<`T`\> | `undefined` | A function that extracts the weight from an item. Defaults to assuming the item is a number |
| `random` | () => `number` | `Math.random` | PRNG that returns a value between 0.0 and 1.0 |

#### Returns

`T`

Selected random item, or null if the array is empty

#### Throws

When passed an empty array

***

### randomExp()

```ts
function randomExp(lambda, random?): number;
```

Defined in: [distribution.ts:18](https://github.com/claus-codes/util-random/blob/main/src/distribution.ts#L18)

Generate a random number from an exponential distribution.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `lambda` | `number` | `undefined` | The rate parameter of the exponential distribution |
| `random` | () => `number` | `Math.random` | A PRNG function |

#### Returns

`number`

A random number from the exponential distribution

***

### randomGaussian()

```ts
function randomGaussian(
   mean?, 
   stdev?, 
   random?): number;
```

Defined in: [distribution.ts:8](https://github.com/claus-codes/util-random/blob/main/src/distribution.ts#L8)

Get a random number from a Gaussian distribution.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `mean` | `number` | `0` | The mean value |
| `stdev` | `number` | `1.0` | The standard deviation |
| `random` | () => `number` | `Math.random` | - |

#### Returns

`number`

A random float

***

### randomIndex()

```ts
function randomIndex<T>(length, random?): number;
```

Defined in: [array.ts:15](https://github.com/claus-codes/util-random/blob/main/src/array.ts#L15)

Return a random index using a length or an array as value.

#### Type Parameters

| Type Parameter |
| ------ |
| `T` |

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `length` | `number` \| `T`[] | `undefined` | Number or array. |
| `random` | () => `number` | `Math.random` | PRNG that returns a value between 0.0 and 1.0. |

#### Returns

`number`

A random integer, or -1 if length is zero.

***

### randomIntRange()

```ts
function randomIntRange(
   a, 
   b, 
   random?): number;
```

Defined in: [range.ts:20](https://github.com/claus-codes/util-random/blob/main/src/range.ts#L20)

Return a random integer in range.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `a` | `number` | `undefined` | First value |
| `b` | `number` | `undefined` | Second value |
| `random` | () => `number` | `Math.random` | PRNG that returns a value between 0.0 and 1.0 |

#### Returns

`number`

A random integer in [a, b] inclusive

***

### randomLogistic()

```ts
function randomLogistic(
   mu, 
   s, 
   random?): number;
```

Defined in: [distribution.ts:28](https://github.com/claus-codes/util-random/blob/main/src/distribution.ts#L28)

Generate a random number from a logistic distribution.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `mu` | `number` | `undefined` | The location parameter (mean) of the logistic distribution |
| `s` | `number` | `undefined` | The scale parameter of the logistic distribution |
| `random` | () => `number` | `Math.random` | A PRNG function |

#### Returns

`number`

A random number from the logistic distribution

***

### randomRange()

```ts
function randomRange(
   a, 
   b, 
   random?): number;
```

Defined in: [range.ts:9](https://github.com/claus-codes/util-random/blob/main/src/range.ts#L9)

Return a random float in range.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `a` | `number` | `undefined` | First value |
| `b` | `number` | `undefined` | Second value |
| `random` | () => `number` | `Math.random` | PRNG that returns a value between 0.0 and 1.0 |

#### Returns

`number`

A random float

***

### randomString()

```ts
function randomString(
   len, 
   random?, 
   alphabet?): string;
```

Defined in: [string.ts:8](https://github.com/claus-codes/util-random/blob/main/src/string.ts#L8)

Generate a random string.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `len` | `number` | `undefined` | The length of the string to generate. |
| `random` | () => `number` | `Math.random` | The random function to use. |
| `alphabet` | `string` | `"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"` | The alphabet to use. |

#### Returns

`string`

The generated string.

***

### randomWeightedIndex()

```ts
function randomWeightedIndex<T>(
   items, 
   getWeight, 
   random?): number;
```

Defined in: [array.ts:29](https://github.com/claus-codes/util-random/blob/main/src/array.ts#L29)

Select a random index from an array of objects based on their weights.

#### Type Parameters

| Type Parameter |
| ------ |
| `T` *extends* `object` |

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `items` | `T`[] | `undefined` | An array of objects |
| `getWeight` | [`WeightExtractor`](#weightextractor)\<`T`\> | `undefined` | A function that extracts the weight from an item. Defaults to assuming the item is a number |
| `random` | () => `number` | `Math.random` | PRNG that returns a value between 0.0 and 1.0 |

#### Returns

`number`

Selected random index, or -1 if the array is empty

***

### randomWeightedKey()

```ts
function randomWeightedKey(keyAndWeight, random?): string;
```

Defined in: [object.ts:9](https://github.com/claus-codes/util-random/blob/main/src/object.ts#L9)

Pick a random key from an object with weight as the value.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `keyAndWeight` | `Record`\<`string`, `number`\> | `undefined` | An object with keys and values as weight |
| `random` | () => `number` | `Math.random` | PRNG that returns a value between 0.0 and 1.0 |

#### Returns

`string`

A random key, or null on error

#### Throws

On invalid weighted key object

***

### shuffleArray()

```ts
function shuffleArray<T>(arr, random?): T[];
```

Defined in: [array.ts:98](https://github.com/claus-codes/util-random/blob/main/src/array.ts#L98)

Create a shuffled copy of an array.

#### Type Parameters

| Type Parameter |
| ------ |
| `T` |

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `arr` | `T`[] | `undefined` | The array to shuffle |
| `random` | () => `number` | `Math.random` | PRNG that returns a value between 0.0 and 1.0 |

#### Returns

`T`[]

A shuffled copy of the array
