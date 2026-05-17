# @fimbul-works/util-random

## Interfaces

### Int64RandomNumberGenerator()

Defined in: [types.ts:44](https://github.com/claus-codes/util-random/blob/main/src/types.ts#L44)

Implementation of the Alea random number generator.

#### Extends

- [`RandomNumberGenerator`](#randomnumbergenerator)\<`bigint`\>

```ts
Int64RandomNumberGenerator(): number;
```

Defined in: [types.ts:44](https://github.com/claus-codes/util-random/blob/main/src/types.ts#L44)

Return a random number between 0.0 and 1.0.

#### Returns

`number`

#### Properties

| Property | Modifier | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ | ------ |
| <a id="property-seed"></a> `seed?` | `readonly` | `bigint` | Read-only initial seed as an unsigned integer. | [`RandomNumberGenerator`](#randomnumbergenerator).[`seed`](#property-seed-1) | [types.ts:13](https://github.com/claus-codes/util-random/blob/main/src/types.ts#L13) |

#### Methods

##### double()

```ts
double(): number;
```

Defined in: [types.ts:23](https://github.com/claus-codes/util-random/blob/main/src/types.ts#L23)

Return a random double-precision floating point number between 0.0 and 1.0.

###### Returns

`number`

###### Inherited from

[`RandomNumberGenerator`](#randomnumbergenerator).[`double`](#double-1)

##### int()

```ts
int(): number;
```

Defined in: [types.ts:18](https://github.com/claus-codes/util-random/blob/main/src/types.ts#L18)

Return a random 32-bit number.

###### Returns

`number`

###### Inherited from

[`RandomNumberGenerator`](#randomnumbergenerator).[`int`](#int-1)

##### int64()

```ts
int64(): bigint;
```

Defined in: [types.ts:48](https://github.com/claus-codes/util-random/blob/main/src/types.ts#L48)

Return a random 64-bit number.

###### Returns

`bigint`

***

### RandomNumberGenerator()

Defined in: [types.ts:4](https://github.com/claus-codes/util-random/blob/main/src/types.ts#L4)

Decorated random number generator function.

#### Extended by

- [`StatefulRandomNumberGenerator`](#statefulrandomnumbergenerator)
- [`Int64RandomNumberGenerator`](#int64randomnumbergenerator)

#### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `T` | `number` |

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
| <a id="property-seed-1"></a> `seed?` | `readonly` | `T` | Read-only initial seed as an unsigned integer. | [types.ts:13](https://github.com/claus-codes/util-random/blob/main/src/types.ts#L13) |

#### Methods

##### double()

```ts
double(): number;
```

Defined in: [types.ts:23](https://github.com/claus-codes/util-random/blob/main/src/types.ts#L23)

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

***

### StatefulRandomNumberGenerator()

Defined in: [types.ts:26](https://github.com/claus-codes/util-random/blob/main/src/types.ts#L26)

Decorated random number generator function.

#### Extends

- [`RandomNumberGenerator`](#randomnumbergenerator)\<`S`\>

#### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `T` | - |
| `S` | `number` |

```ts
StatefulRandomNumberGenerator(): number;
```

Defined in: [types.ts:26](https://github.com/claus-codes/util-random/blob/main/src/types.ts#L26)

Return a random number between 0.0 and 1.0.

#### Returns

`number`

#### Properties

| Property | Modifier | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ | ------ |
| <a id="property-getstate"></a> `getState` | `public` | () => `T` | Get the internal registry state. | - | [types.ts:32](https://github.com/claus-codes/util-random/blob/main/src/types.ts#L32) |
| <a id="property-seed-2"></a> `seed?` | `readonly` | `S` | Read-only initial seed as an unsigned integer. | [`RandomNumberGenerator`](#randomnumbergenerator).[`seed`](#property-seed-1) | [types.ts:13](https://github.com/claus-codes/util-random/blob/main/src/types.ts#L13) |
| <a id="property-setstate"></a> `setState` | `public` | (`state`) => `void` | Set the internal registry state | - | [types.ts:38](https://github.com/claus-codes/util-random/blob/main/src/types.ts#L38) |

#### Methods

##### double()

```ts
double(): number;
```

Defined in: [types.ts:23](https://github.com/claus-codes/util-random/blob/main/src/types.ts#L23)

Return a random double-precision floating point number between 0.0 and 1.0.

###### Returns

`number`

###### Inherited from

[`RandomNumberGenerator`](#randomnumbergenerator).[`double`](#double-1)

##### int()

```ts
int(): number;
```

Defined in: [types.ts:18](https://github.com/claus-codes/util-random/blob/main/src/types.ts#L18)

Return a random 32-bit number.

###### Returns

`number`

###### Inherited from

[`RandomNumberGenerator`](#randomnumbergenerator).[`int`](#int-1)

## Type Aliases

### AleaState

```ts
type AleaState = [number, number, number, number];
```

Defined in: [rng/alea.ts:16](https://github.com/claus-codes/util-random/blob/main/src/rng/alea.ts#L16)

Alea internal registry state.

***

### MersenneTwisterState

```ts
type MersenneTwisterState = [number[], number];
```

Defined in: [rng/mersenne-twister.ts:12](https://github.com/claus-codes/util-random/blob/main/src/rng/mersenne-twister.ts#L12)

Mersenne Twister internal state (state and state index).

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

## Functions

### createMersenneTwister()

```ts
function createMersenneTwister(seed?): StatefulRandomNumberGenerator<MersenneTwisterState>;
```

Defined in: [rng/mersenne-twister.ts:19](https://github.com/claus-codes/util-random/blob/main/src/rng/mersenne-twister.ts#L19)

Creates a new Mersenne Twister random number generator.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `seed` | `number` | Seed for the random number generator. |

#### Returns

[`StatefulRandomNumberGenerator`](#statefulrandomnumbergenerator)\<[`MersenneTwisterState`](#mersennetwisterstate)\>

A new random number generator.

***

### createRandomAlea()

```ts
function createRandomAlea(seed?): StatefulRandomNumberGenerator<AleaState>;
```

Defined in: [rng/alea.ts:24](https://github.com/claus-codes/util-random/blob/main/src/rng/alea.ts#L24)

Creates a new Alea random number generator.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `seed` | `number` | Seed number |

#### Returns

[`StatefulRandomNumberGenerator`](#statefulrandomnumbergenerator)\<[`AleaState`](#aleastate)\>

A new random number generator

***

### createXorShiftRandom()

```ts
function createXorShiftRandom(seed?): RandomNumberGenerator;
```

Defined in: [rng/xor-shift.ts:11](https://github.com/claus-codes/util-random/blob/main/src/rng/xor-shift.ts#L11)

xorShiftMash — A tiny stateful PRNG using xorShift mixed with Mash constants.
Highly deterministic and good for string-seeded procedural generation.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `seed` | `number` | Starting internal state (defaults to the original Mash constant). |

#### Returns

[`RandomNumberGenerator`](#randomnumbergenerator)

A stateful hash function with a `next` method.

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

A new random number generator

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

A new random number generator

***

### mulberry32()

```ts
function mulberry32(seed?): RandomNumberGenerator;
```

Defined in: [rng/mulberry32.ts:10](https://github.com/claus-codes/util-random/blob/main/src/rng/mulberry32.ts#L10)

Creates a new Mulberry32 random number generator.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `seed` | `number` | The seed value for the random number generator |

#### Returns

[`RandomNumberGenerator`](#randomnumbergenerator)

A new random number generator

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
| `random` | () => `number` | `Math.random` | Random number generator that returns a value between 0.0 and 1.0 |

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
| `random` | () => `number` | `Math.random` | Random number generator that returns a value between 0.0 and 1.0 |

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
| `random` | () => `number` | `Math.random` | A random number generator function |

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
| `random` | () => `number` | `Math.random` | Random number generator that returns a value between 0.0 and 1.0. |

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
| `random` | () => `number` | `Math.random` | Random number generator that returns a value between 0.0 and 1.0 |

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
| `random` | () => `number` | `Math.random` | A random number generator function |

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
| `random` | () => `number` | `Math.random` | Random number generator that returns a value between 0.0 and 1.0 |

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
| `random` | () => `number` | `Math.random` | Random number generator that returns a value between 0.0 and 1.0 |

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
| `random` | () => `number` | `Math.random` | Random number generator that returns a value between 0.0 and 1.0 |

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
| `random` | () => `number` | `Math.random` | Random number generator that returns a value between 0.0 and 1.0 |

#### Returns

`T`[]

A shuffled copy of the array

***

### splitMix64()

```ts
function splitMix64(seed?): Int64RandomNumberGenerator;
```

Defined in: [rng/splitmix64.ts:11](https://github.com/claus-codes/util-random/blob/main/src/rng/splitmix64.ts#L11)

Creates a new SplitMix64 random number generator.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `seed` | `bigint` | The seed value for the random number generator |

#### Returns

[`Int64RandomNumberGenerator`](#int64randomnumbergenerator)

A new random number generator
