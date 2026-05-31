# @fimbul-works/random

## Interfaces

### DecoratedRandomFunction()

Defined in: [types.ts:34](https://github.com/claus-codes/util-random/blob/main/src/types.ts#L34)

RandomFunction with additional functionality.

#### Extends

- [`RandomFunction`](#randomfunction)

```ts
DecoratedRandomFunction(): number;
```

Defined in: [types.ts:34](https://github.com/claus-codes/util-random/blob/main/src/types.ts#L34)

RandomFunction with additional functionality.

#### Returns

`number`

#### Methods

##### double()

```ts
double(): number;
```

Defined in: [types.ts:54](https://github.com/claus-codes/util-random/blob/main/src/types.ts#L54)

Return a random double-precision float in range [0.0, 1.0].

###### Returns

`number`

A random double-precision float in range [0.0, 1.0].

##### int()

```ts
int(): number;
```

Defined in: [types.ts:40](https://github.com/claus-codes/util-random/blob/main/src/types.ts#L40)

Return a random unsigned 32-bit integer.

###### Returns

`number`

A random unsigned 32-bit integer.

##### int64()

```ts
int64(): bigint;
```

Defined in: [types.ts:47](https://github.com/claus-codes/util-random/blob/main/src/types.ts#L47)

Return a random unsigned 64-bit integer.

###### Returns

`bigint`

A random unsigned 64-bit integer.

***

### StatefulRandomFunction()

Defined in: [types.ts:11](https://github.com/claus-codes/util-random/blob/main/src/types.ts#L11)

RandomFunction that allows reading and writing it's internal state to allow resuming.

#### Extends

- [`RandomFunction`](#randomfunction)

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | The type of the internal state of the random number generator. |

```ts
StatefulRandomFunction(): number;
```

Defined in: [types.ts:4](https://github.com/claus-codes/util-random/blob/main/src/types.ts#L4)

RandomFunction that allows reading and writing it's internal state to allow resuming.

#### Returns

`number`

#### Properties

| Property | Modifier | Type | Description | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-getstate"></a> `getState` | `public` | () => `T` | Get the internal registry state. | [types.ts:22](https://github.com/claus-codes/util-random/blob/main/src/types.ts#L22) |
| <a id="property-seed"></a> `seed?` | `readonly` | `number` | Read-only initial seed as an unsigned integer. | [types.ts:15](https://github.com/claus-codes/util-random/blob/main/src/types.ts#L15) |
| <a id="property-setstate"></a> `setState` | `public` | (`state`) => `void` | Set the internal registry state | [types.ts:28](https://github.com/claus-codes/util-random/blob/main/src/types.ts#L28) |

## Type Aliases

### AleaState

```ts
type AleaState = [number, number, number, number];
```

Defined in: [rng/types.ts:4](https://github.com/claus-codes/util-random/blob/main/src/rng/types.ts#L4)

Alea internal registry state.

***

### JSF32State

```ts
type JSF32State = [number, number, number, number];
```

Defined in: [rng/types.ts:9](https://github.com/claus-codes/util-random/blob/main/src/rng/types.ts#L9)

JSF32 internal registry state.

***

### MersenneTwisterState

```ts
type MersenneTwisterState = [number[], number];
```

Defined in: [rng/types.ts:14](https://github.com/claus-codes/util-random/blob/main/src/rng/types.ts#L14)

Mersenne Twister internal registry state.

***

### RandomFunction

```ts
type RandomFunction = () => number;
```

Defined in: [types.ts:4](https://github.com/claus-codes/util-random/blob/main/src/types.ts#L4)

Type for a function that returns a number in range [0.0, 1.0].

#### Returns

`number`

***

### RandomNumberGenerator

```ts
type RandomNumberGenerator<T> = DecoratedRandomFunction & StatefulRandomFunction<T>;
```

Defined in: [types.ts:57](https://github.com/claus-codes/util-random/blob/main/src/types.ts#L57)

#### Type Parameters

| Type Parameter |
| ------ |
| `T` |

***

### SFC32State

```ts
type SFC32State = [number, number, number, number];
```

Defined in: [rng/types.ts:19](https://github.com/claus-codes/util-random/blob/main/src/rng/types.ts#L19)

SFC32 internal registry state.

***

### TycheiState

```ts
type TycheiState = [number, number, number, number];
```

Defined in: [rng/types.ts:24](https://github.com/claus-codes/util-random/blob/main/src/rng/types.ts#L24)

Tyche-i internal registry state.

***

### WeightExtractor

```ts
type WeightExtractor<T> = (item) => number;
```

Defined in: [array.ts:10](https://github.com/claus-codes/util-random/blob/main/src/array.ts#L10)

A function that extracts a weight from an object of type T.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` *extends* `object` | The type of the object to extract the weight from. |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `item` | `T` | Object to extract a weight value from. |

#### Returns

`number`

Number representing weight.

***

### WeightMap

```ts
type WeightMap = Record<string, number>;
```

Defined in: [object.ts:6](https://github.com/claus-codes/util-random/blob/main/src/object.ts#L6)

A mapping of string keys to numeric weights, used for weighted random selection.

***

### Xor4096State

```ts
type Xor4096State = [number[], number, number];
```

Defined in: [rng/types.ts:44](https://github.com/claus-codes/util-random/blob/main/src/rng/types.ts#L44)

Xor4096 internal registry state.

***

### Xorshift128State

```ts
type Xorshift128State = [number, number, number, number];
```

Defined in: [rng/types.ts:39](https://github.com/claus-codes/util-random/blob/main/src/rng/types.ts#L39)

Xorshift128 internal registry state.

***

### Xorshift7State

```ts
type Xorshift7State = [number[], number];
```

Defined in: [rng/types.ts:29](https://github.com/claus-codes/util-random/blob/main/src/rng/types.ts#L29)

Xorshift7 internal registry state.

***

### XorwowState

```ts
type XorwowState = [number, number, number, number, number, number];
```

Defined in: [rng/types.ts:34](https://github.com/claus-codes/util-random/blob/main/src/rng/types.ts#L34)

Xorwow internal registry state.

***

### Xoshiro128State

```ts
type Xoshiro128State = [number, number, number, number];
```

Defined in: [rng/types.ts:49](https://github.com/claus-codes/util-random/blob/main/src/rng/types.ts#L49)

Xoshiro128 internal registry state.

## Functions

### createAlea()

```ts
function createAlea(seed?): RandomNumberGenerator<AleaState>;
```

Defined in: [rng/alea.ts:15](https://github.com/claus-codes/util-random/blob/main/src/rng/alea.ts#L15)

Creates a new Alea PRNG.

This code is an implementation of Alea algorithm by Johannes Baagøe.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `seed?` | `number` | Optional seed number. Defaults to current time if not provided. |

#### Returns

[`RandomNumberGenerator`](#randomnumbergenerator)\<[`AleaState`](#aleastate)\>

A new PRNG.

***

### createJSF32()

```ts
function createJSF32(seed?): RandomNumberGenerator<JSF32State>;
```

Defined in: [rng/jsf32.ts:15](https://github.com/claus-codes/util-random/blob/main/src/rng/jsf32.ts#L15)

Creates a new JSF32 PRNG.

This is an implementation of the JSF32 PRNG by Bob Jenkin.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `seed?` | `number` | Optional seed number. Defaults to current time if not provided. |

#### Returns

[`RandomNumberGenerator`](#randomnumbergenerator)\<[`JSF32State`](#jsf32state)\>

A new PRNG.

***

### createJSF32b()

```ts
function createJSF32b(seed?): RandomNumberGenerator<JSF32State>;
```

Defined in: [rng/jsf32b.ts:15](https://github.com/claus-codes/util-random/blob/main/src/rng/jsf32b.ts#L15)

Creates a new JSF32 PRNG.

This is an implementation of the JSF32 PRNG by Bob Jenkin.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `seed?` | `number` | Optional seed number. Defaults to current time if not provided. |

#### Returns

[`RandomNumberGenerator`](#randomnumbergenerator)\<[`JSF32State`](#jsf32state)\>

A new PRNG.

***

### createMersenneTwister()

```ts
function createMersenneTwister(seed?): RandomNumberGenerator<MersenneTwisterState>;
```

Defined in: [rng/mersenne-twister.ts:14](https://github.com/claus-codes/util-random/blob/main/src/rng/mersenne-twister.ts#L14)

Creates a new Mersenne Twister PRNG.

This code is an implementation of the Mersenne Twister algorithm by Makoto Matsumoto and Takuji Nishimura.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `seed?` | `number` | Optional seed number. Defaults to current time if not provided. |

#### Returns

[`RandomNumberGenerator`](#randomnumbergenerator)\<[`MersenneTwisterState`](#mersennetwisterstate)\>

A new PRNG.

***

### createMulberry32()

```ts
function createMulberry32(seed?): RandomNumberGenerator<number>;
```

Defined in: [rng/mulberry32.ts:14](https://github.com/claus-codes/util-random/blob/main/src/rng/mulberry32.ts#L14)

Creates a new Mulberry32 PRNG.

This code is an implementation of the Mulberry32 algorithm by Tommy Ettinger.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `seed?` | `number` | Optional seed number. Defaults to current time if not provided. |

#### Returns

[`RandomNumberGenerator`](#randomnumbergenerator)\<`number`\>

A new PRNG.

***

### createParkMiller()

```ts
function createParkMiller(seed?): RandomNumberGenerator<number>;
```

Defined in: [rng/park-miller.ts:13](https://github.com/claus-codes/util-random/blob/main/src/rng/park-miller.ts#L13)

Creates a new Park-Miller LCG (MINSTD) PRNG.

This is an implementation of the Park-Miller LGC (MINSTD) algorithm by Stephen K. Park and Keith W. Miller.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `seed?` | `number` | Optional seed number. Defaults to current time if not provided. |

#### Returns

[`RandomNumberGenerator`](#randomnumbergenerator)\<`number`\>

A new PRNG.

***

### createSFC32()

```ts
function createSFC32(seed?): RandomNumberGenerator<SFC32State>;
```

Defined in: [rng/sfc32.ts:15](https://github.com/claus-codes/util-random/blob/main/src/rng/sfc32.ts#L15)

Creates a new SFC32 PRNG.

This is an implementation of the SFC32 (Small Fast Chaotic) PRNG by Chris Doty-Humphrey.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `seed?` | `number` | Optional seed number. Defaults to current time if not provided. |

#### Returns

[`RandomNumberGenerator`](#randomnumbergenerator)\<[`SFC32State`](#sfc32state)\>

A new PRNG.

***

### createSplitMix32()

```ts
function createSplitMix32(seed?): RandomNumberGenerator<number>;
```

Defined in: [rng/splitmix32.ts:14](https://github.com/claus-codes/util-random/blob/main/src/rng/splitmix32.ts#L14)

Creates a new SplitMix32 PRNG.

This is an implementation of the SplitMix32 algorithm by G. L. Steele, D. Lea and C. H. Flood.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `seed?` | `number` | Optional seed number. Defaults to current time if not provided. |

#### Returns

[`RandomNumberGenerator`](#randomnumbergenerator)\<`number`\>

A new PRNG.

***

### createTychei()

```ts
function createTychei(seed?): RandomNumberGenerator<TycheiState>;
```

Defined in: [rng/tychei.ts:15](https://github.com/claus-codes/util-random/blob/main/src/rng/tychei.ts#L15)

Creates a new Tyche-i PRNG.

This is an implementation of the Tyche-i algorithm by Samuel Neves and Filipe Araujo.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `seed?` | `number` | Optional seed number. Defaults to current time if not provided. |

#### Returns

[`RandomNumberGenerator`](#randomnumbergenerator)\<[`TycheiState`](#tycheistate)\>

A new PRNG.

***

### createXor4096()

```ts
function createXor4096(seed?): RandomNumberGenerator<Xor4096State>;
```

Defined in: [rng/xor4096.ts:15](https://github.com/claus-codes/util-random/blob/main/src/rng/xor4096.ts#L15)

Creates a new Xor4096 PRNG.

This is an implementation of the Xor4096 algorithm by Richard Brent.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `seed?` | `number` | Optional seed number. Defaults to current time if not provided. |

#### Returns

[`RandomNumberGenerator`](#randomnumbergenerator)\<[`Xor4096State`](#xor4096state)\>

A new PRNG.

***

### createXorshift128()

```ts
function createXorshift128(seed?): RandomNumberGenerator<Xorshift128State>;
```

Defined in: [rng/xorshift128.ts:15](https://github.com/claus-codes/util-random/blob/main/src/rng/xorshift128.ts#L15)

Creates a new Xorshift128 PRNG.

This is an implementation of the Xorshift128 algorithm by George Marsaglia.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `seed?` | `number` | Optional seed number. Defaults to current time if not provided. |

#### Returns

[`RandomNumberGenerator`](#randomnumbergenerator)\<[`Xorshift128State`](#xorshift128state)\>

A new PRNG.

***

### createXorshift7()

```ts
function createXorshift7(seed?): RandomNumberGenerator<Xorshift7State>;
```

Defined in: [rng/xorshift7.ts:15](https://github.com/claus-codes/util-random/blob/main/src/rng/xorshift7.ts#L15)

Creates a new Xorshift7 PRNG.

This is an implementation of the XorShift7 algorithm by François Panneton and Pierre L'Ecuyer.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `seed?` | `number` | Optional seed number. Defaults to current time if not provided. |

#### Returns

[`RandomNumberGenerator`](#randomnumbergenerator)\<[`Xorshift7State`](#xorshift7state)\>

A new PRNG.

***

### createXorShiftMash()

```ts
function createXorShiftMash(seed?): RandomNumberGenerator<number>;
```

Defined in: [rng/xorshift-mash.ts:14](https://github.com/claus-codes/util-random/blob/main/src/rng/xorshift-mash.ts#L14)

Creates a new XorshiftMash PRNG.

This is an implementation of the XorshiftMash algorithm by George Marsaglia.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `seed?` | `number` | Optional seed number. Defaults to current time if not provided. |

#### Returns

[`RandomNumberGenerator`](#randomnumbergenerator)\<`number`\>

A new PRNG.

***

### createXorwow()

```ts
function createXorwow(seed?): RandomNumberGenerator<XorwowState>;
```

Defined in: [rng/xorwow.ts:15](https://github.com/claus-codes/util-random/blob/main/src/rng/xorwow.ts#L15)

Creates a new Xorwow PRNG.

This is an implementation of the Xorwow algorithm by François Panneton and Pierre L'Ecuyer.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `seed?` | `number` | Optional seed number. Defaults to current time if not provided. |

#### Returns

[`RandomNumberGenerator`](#randomnumbergenerator)\<[`XorwowState`](#xorwowstate)\>

A new PRNG

***

### createXoshiro128Plus()

```ts
function createXoshiro128Plus(seed?): RandomNumberGenerator<Xoshiro128State>;
```

Defined in: [rng/xoshiro128-plus.ts:15](https://github.com/claus-codes/util-random/blob/main/src/rng/xoshiro128-plus.ts#L15)

Creates a new Xoshiro128+ PRNG.

This is an implementation of the Xoshiro128+ algorithm by David Blackman and Sebastiano Vigna.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `seed?` | `number` | Optional seed number. Defaults to current time if not provided. |

#### Returns

[`RandomNumberGenerator`](#randomnumbergenerator)\<[`Xoshiro128State`](#xoshiro128state)\>

A new PRNG.

***

### createXoshiro128PlusPlus()

```ts
function createXoshiro128PlusPlus(seed?): RandomNumberGenerator<Xoshiro128State>;
```

Defined in: [rng/xoshiro128-plusplus.ts:15](https://github.com/claus-codes/util-random/blob/main/src/rng/xoshiro128-plusplus.ts#L15)

Creates a new Xoshiro128++ PRNG.

This is an implementation of the Xoshiro128++ algorithm by David Blackman and Sebastiano Vigna.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `seed?` | `number` | Optional seed number. Defaults to current time if not provided. |

#### Returns

[`RandomNumberGenerator`](#randomnumbergenerator)\<[`Xoshiro128State`](#xoshiro128state)\>

A new PRNG.

***

### decorateRandom()

```ts
function decorateRandom<T>(random, props?): T & DecoratedRandomFunction;
```

Defined in: [decorate/decorate.ts:52](https://github.com/claus-codes/util-random/blob/main/src/decorate/decorate.ts#L52)

Apply decorators to a RandomFunction.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` *extends* [`RandomFunction`](#randomfunction) | Type of RandomFunction. |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `random` | `T` | Function that returns a value. |
| `props` | `Record`\<`string`, () => `any`\> | Additional properties. |

#### Returns

`T` & [`DecoratedRandomFunction`](#decoratedrandomfunction)

Decorated random number generator.

***

### defineRandomState()

```ts
function defineRandomState<T, R>(
   random, 
   seed, 
   getState, 
setState): R & StatefulRandomFunction<T>;
```

Defined in: [decorate/decorate.ts:31](https://github.com/claus-codes/util-random/blob/main/src/decorate/decorate.ts#L31)

Make a random number generator stateful.

#### Type Parameters

| Type Parameter | Default type | Description |
| ------ | ------ | ------ |
| `T` | - | Internal state type. |
| `R` | [`RandomFunction`](#randomfunction) | Type of RandomFunction. |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `random` | `R` | Function that returns a value. |
| `seed` | `number` | Seed value. |
| `getState` | () => `T` | - |
| `setState` | (`state`) => `void` | - |

#### Returns

`R` & [`StatefulRandomFunction`](#statefulrandomfunction)\<`T`\>

Decorated random number generator.

***

### defineValue()

```ts
function defineValue<T>(
   target, 
   name, 
   value, 
   writable?): void;
```

Defined in: [decorate/decorate.ts:14](https://github.com/claus-codes/util-random/blob/main/src/decorate/decorate.ts#L14)

Define a property on a target.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | Type of the property value. |

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `target` | `any` | `undefined` | Target to add a property. |
| `name` | `string` | `undefined` | Property name. |
| `value` | `T` | `undefined` | Value getter function. |
| `writable?` | `boolean` | `true` | Whether the value is writable. |

#### Returns

`void`

***

### pickRandom()

```ts
function pickRandom<T>(items, random?): T;
```

Defined in: [array.ts:38](https://github.com/claus-codes/util-random/blob/main/src/array.ts#L38)

Pick a random item from an array.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | The type of the items in the array. |

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `items` | `T`[] | `undefined` | An array of options to pick from. |
| `random?` | [`RandomFunction`](#randomfunction) | `Math.random` | Function that returns a value in range [0, 1]. |

#### Returns

`T`

Random item.

#### Throws

When passed an empty array.

***

### pickWeightedRandom()

```ts
function pickWeightedRandom<T>(
   items, 
   getWeight, 
   random?): T;
```

Defined in: [array.ts:92](https://github.com/claus-codes/util-random/blob/main/src/array.ts#L92)

Pick a random item from an array of objects based on their weights.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` *extends* `object` | The type of the objects in the array. |

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `items` | `T`[] | `undefined` | An array of objects. |
| `getWeight` | [`WeightExtractor`](#weightextractor)\<`T`\> | `undefined` | A function that extracts the weight from an item. Defaults to assuming the item is a number. |
| `random?` | [`RandomFunction`](#randomfunction) | `Math.random` | Function that returns a value in range [0, 1]. |

#### Returns

`T`

Selected random item.

#### Throws

When passed an empty array.

***

### randomExp()

```ts
function randomExp(lambda, random?): number;
```

Defined in: [distribution.ts:21](https://github.com/claus-codes/util-random/blob/main/src/distribution.ts#L21)

Generate a random number from an exponential distribution.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `lambda` | `number` | `undefined` | The rate parameter of the exponential distribution. |
| `random?` | [`RandomFunction`](#randomfunction) | `Math.random` | Function that returns a value in range [0, 1]. |

#### Returns

`number`

A random number from the exponential distribution.

***

### randomGaussian()

```ts
function randomGaussian(
   mean?, 
   stdev?, 
   random?): number;
```

Defined in: [distribution.ts:11](https://github.com/claus-codes/util-random/blob/main/src/distribution.ts#L11)

Get a random number from a Gaussian distribution.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `mean?` | `number` | `0` | The mean value. |
| `stdev?` | `number` | `1.0` | The standard deviation. |
| `random?` | [`RandomFunction`](#randomfunction) | `Math.random` | Function that returns a value in range [0, 1]. |

#### Returns

`number`

A random value between the specified mean and standard deviation.

***

### randomIndex()

```ts
function randomIndex<T>(lengthOrArray, random?): number;
```

Defined in: [array.ts:21](https://github.com/claus-codes/util-random/blob/main/src/array.ts#L21)

Return a random index using a length or an array as value.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | The type of an array item, if length is an array. |

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `lengthOrArray` | `number` \| `T`[] | `undefined` | Number or array. |
| `random?` | [`RandomFunction`](#randomfunction) | `Math.random` | Function that returns a value in range [0, 1]. |

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

Defined in: [range.ts:22](https://github.com/claus-codes/util-random/blob/main/src/range.ts#L22)

Return a random integer in range.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `a` | `number` | `undefined` | First value. |
| `b` | `number` | `undefined` | Second value. |
| `random?` | [`RandomFunction`](#randomfunction) | `Math.random` | Function that returns a value in range [0, 1]. |

#### Returns

`number`

A random integer in [a, b] inclusive.

***

### randomLogistic()

```ts
function randomLogistic(
   mu, 
   s, 
   random?): number;
```

Defined in: [distribution.ts:31](https://github.com/claus-codes/util-random/blob/main/src/distribution.ts#L31)

Generate a random number from a logistic distribution.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `mu` | `number` | `undefined` | The location parameter (mean) of the logistic distribution. |
| `s` | `number` | `undefined` | The scale parameter of the logistic distribution. |
| `random?` | [`RandomFunction`](#randomfunction) | `Math.random` | Function that returns a value in range [0, 1]. |

#### Returns

`number`

A random number from the logistic distribution.

***

### randomPoisson()

```ts
function randomPoisson(lambda, random?): number;
```

Defined in: [distribution.ts:48](https://github.com/claus-codes/util-random/blob/main/src/distribution.ts#L48)

Generate a random integer from a Poisson distribution.

Models the number of events occurring in a fixed interval, given an average
rate. Uses the Knuth method (product of uniforms).

Accurate for small λ, but runs in O(λ) time - prefer a rejection-based method for λ > ~30.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `lambda` | `number` | `undefined` | Average number of events (λ > 0). |
| `random?` | [`RandomFunction`](#randomfunction) | `Math.random` | Function that returns a value in range [0, 1]. |

#### Returns

`number`

A non-negative integer sampled from the Poisson distribution.

***

### randomRange()

```ts
function randomRange(
   a, 
   b, 
   random?): number;
```

Defined in: [range.ts:11](https://github.com/claus-codes/util-random/blob/main/src/range.ts#L11)

Return a random float in range.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `a` | `number` | `undefined` | First value. |
| `b` | `number` | `undefined` | Second value. |
| `random?` | [`RandomFunction`](#randomfunction) | `Math.random` | Function that returns a value in range [0, 1]. |

#### Returns

`number`

A random float in [a, b] (inclusive of a, exclusive of b).

***

### randomString()

```ts
function randomString(
   len, 
   alphabet?, 
   random?): string;
```

Defined in: [string.ts:13](https://github.com/claus-codes/util-random/blob/main/src/string.ts#L13)

Generate a random string.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `len` | `number` | `undefined` | The length of the string to generate. |
| `alphabet?` | `string` | `undefined` | The alphabet to use for generating the string. Defaults to alphanumeric characters. |
| `random?` | [`RandomFunction`](#randomfunction) | `Math.random` | Function that returns a value in range [0, 1]. |

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

Defined in: [array.ts:55](https://github.com/claus-codes/util-random/blob/main/src/array.ts#L55)

Select a random index from an array of objects based on their weights.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` *extends* `object` | The type of an array item. |

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `items` | `T`[] | `undefined` | An array of objects |
| `getWeight` | [`WeightExtractor`](#weightextractor)\<`T`\> | `undefined` | A function that extracts the weight from an item. Defaults to assuming the item is a number. |
| `random?` | [`RandomFunction`](#randomfunction) | `Math.random` | Function that returns a value in range [0, 1]. |

#### Returns

`number`

Selected random index, or -1 if the array is empty.

***

### randomWeightedKey()

```ts
function randomWeightedKey<T>(keyAndWeight, random?): string;
```

Defined in: [object.ts:18](https://github.com/claus-codes/util-random/blob/main/src/object.ts#L18)

Pick a random key from an object with weight as the value.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` *extends* [`WeightMap`](#weightmap) | The type of the weight map object. |

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `keyAndWeight` | `T` | `undefined` | An object with keys and values as weight. |
| `random?` | [`RandomFunction`](#randomfunction) | `Math.random` | Function that returns a value in range [0, 1]. |

#### Returns

`string`

A random key, or null on error.

#### Throws

When the weighted key object is invalid.

***

### shuffleArray()

```ts
function shuffleArray<T>(arr, random?): T[];
```

Defined in: [array.ts:113](https://github.com/claus-codes/util-random/blob/main/src/array.ts#L113)

Create a shuffled copy of an array.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | The type of the items in the array. |

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `arr` | `T`[] | `undefined` | The array to shuffle |
| `random?` | [`RandomFunction`](#randomfunction) | `Math.random` | Function that returns a value in range [0, 1]. |

#### Returns

`T`[]

A shuffled copy of the array.
