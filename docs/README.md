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

Defined in: [rng/alea.ts:9](https://github.com/claus-codes/util-random/blob/main/src/rng/alea.ts#L9)

Alea internal registry state.

***

### JSF32BState

```ts
type JSF32BState = [number, number, number, number];
```

Defined in: [rng/jsf32b.ts:9](https://github.com/claus-codes/util-random/blob/main/src/rng/jsf32b.ts#L9)

JSF32 internal registry state.

***

### JSF32State

```ts
type JSF32State = [number, number, number, number];
```

Defined in: [rng/jsf32.ts:9](https://github.com/claus-codes/util-random/blob/main/src/rng/jsf32.ts#L9)

JSF32 internal registry state.

***

### MersenneTwisterState

```ts
type MersenneTwisterState = [number[], number];
```

Defined in: [rng/mersenne-twister.ts:8](https://github.com/claus-codes/util-random/blob/main/src/rng/mersenne-twister.ts#L8)

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

Defined in: [rng/sfc32.ts:9](https://github.com/claus-codes/util-random/blob/main/src/rng/sfc32.ts#L9)

SFC32 internal registry state.

***

### TycheiState

```ts
type TycheiState = [number, number, number, number];
```

Defined in: [rng/tychei.ts:9](https://github.com/claus-codes/util-random/blob/main/src/rng/tychei.ts#L9)

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

Defined in: [rng/xor4096.ts:9](https://github.com/claus-codes/util-random/blob/main/src/rng/xor4096.ts#L9)

Xor4096 internal registry state.

***

### Xorshift128State

```ts
type Xorshift128State = [number, number, number, number];
```

Defined in: [rng/xorshift128.ts:9](https://github.com/claus-codes/util-random/blob/main/src/rng/xorshift128.ts#L9)

Xorshift128 internal registry state.

***

### Xorshift7State

```ts
type Xorshift7State = [number[], number];
```

Defined in: [rng/xorshift7.ts:9](https://github.com/claus-codes/util-random/blob/main/src/rng/xorshift7.ts#L9)

Xorshift7 internal registry state.

***

### XorwowState

```ts
type XorwowState = [number, number, number, number, number, number];
```

Defined in: [rng/xorwow.ts:9](https://github.com/claus-codes/util-random/blob/main/src/rng/xorwow.ts#L9)

Xorwow internal registry state.

***

### Xoshiro128PlusPlusState

```ts
type Xoshiro128PlusPlusState = [number, number, number, number];
```

Defined in: [rng/xoshiro128-plusplus.ts:9](https://github.com/claus-codes/util-random/blob/main/src/rng/xoshiro128-plusplus.ts#L9)

Xoshiro128+ internal registry state.

***

### Xoshiro128StatePlus

```ts
type Xoshiro128StatePlus = [number, number, number, number];
```

Defined in: [rng/xoshiro128-plus.ts:9](https://github.com/claus-codes/util-random/blob/main/src/rng/xoshiro128-plus.ts#L9)

Xoshiro128+ internal registry state.

## Functions

### createRandomAlea()

```ts
function createRandomAlea(seed?): RandomNumberGenerator<AleaState>;
```

Defined in: [rng/alea.ts:19](https://github.com/claus-codes/util-random/blob/main/src/rng/alea.ts#L19)

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

### createRandomJSF32()

```ts
function createRandomJSF32(seed?): RandomNumberGenerator<JSF32State>;
```

Defined in: [rng/jsf32.ts:19](https://github.com/claus-codes/util-random/blob/main/src/rng/jsf32.ts#L19)

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

### createRandomJSF32B()

```ts
function createRandomJSF32B(seed?): RandomNumberGenerator<JSF32BState>;
```

Defined in: [rng/jsf32b.ts:19](https://github.com/claus-codes/util-random/blob/main/src/rng/jsf32b.ts#L19)

Creates a new JSF32-B PRNG.

This is an implementation of the JSF32-B PRNG by Bob Jenkin.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `seed?` | `number` | Optional seed number. Defaults to current time if not provided. |

#### Returns

[`RandomNumberGenerator`](#randomnumbergenerator)\<[`JSF32BState`](#jsf32bstate)\>

A new PRNG.

***

### createRandomMersenneTwister()

```ts
function createRandomMersenneTwister(seed?): RandomNumberGenerator<MersenneTwisterState>;
```

Defined in: [rng/mersenne-twister.ts:18](https://github.com/claus-codes/util-random/blob/main/src/rng/mersenne-twister.ts#L18)

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

### createRandomMulberry32()

```ts
function createRandomMulberry32(seed?): RandomNumberGenerator<number>;
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

### createRandomParkMiller()

```ts
function createRandomParkMiller(seed?): RandomNumberGenerator<number>;
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

### createRandomSFC32()

```ts
function createRandomSFC32(seed?): RandomNumberGenerator<SFC32State>;
```

Defined in: [rng/sfc32.ts:19](https://github.com/claus-codes/util-random/blob/main/src/rng/sfc32.ts#L19)

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

### createRandomSplitMix32()

```ts
function createRandomSplitMix32(seed?): RandomNumberGenerator<number>;
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

### createRandomTychei()

```ts
function createRandomTychei(seed?): RandomNumberGenerator<TycheiState>;
```

Defined in: [rng/tychei.ts:19](https://github.com/claus-codes/util-random/blob/main/src/rng/tychei.ts#L19)

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

### createRandomXor4096()

```ts
function createRandomXor4096(seed?): RandomNumberGenerator<Xor4096State>;
```

Defined in: [rng/xor4096.ts:19](https://github.com/claus-codes/util-random/blob/main/src/rng/xor4096.ts#L19)

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

### createRandomXorshift128()

```ts
function createRandomXorshift128(seed?): RandomNumberGenerator<Xorshift128State>;
```

Defined in: [rng/xorshift128.ts:19](https://github.com/claus-codes/util-random/blob/main/src/rng/xorshift128.ts#L19)

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

### createRandomXorshift32()

```ts
function createRandomXorshift32(seed?): RandomNumberGenerator<number>;
```

Defined in: [rng/xorshift32.ts:14](https://github.com/claus-codes/util-random/blob/main/src/rng/xorshift32.ts#L14)

Creates a new Xorshift32 PRNG.

This is an implementation of the Xorshift32 algorithm by George Marsaglia.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `seed?` | `number` | Optional seed number. Defaults to current time if not provided. |

#### Returns

[`RandomNumberGenerator`](#randomnumbergenerator)\<`number`\>

A new PRNG.

***

### createRandomXorshift32AMX()

```ts
function createRandomXorshift32AMX(seed?): RandomNumberGenerator<number>;
```

Defined in: [rng/xorshift32amx.ts:14](https://github.com/claus-codes/util-random/blob/main/src/rng/xorshift32amx.ts#L14)

Creates a new Xorshift32AMX PRNG.

This implementation is based on work by Marc-B-Reynolds and Sebastiano Vigna.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `seed?` | `number` | Optional seed number. Defaults to current time if not provided. |

#### Returns

[`RandomNumberGenerator`](#randomnumbergenerator)\<`number`\>

A new PRNG.

***

### createRandomXorshift32M()

```ts
function createRandomXorshift32M(seed?): RandomNumberGenerator<number>;
```

Defined in: [rng/xorshift32m.ts:14](https://github.com/claus-codes/util-random/blob/main/src/rng/xorshift32m.ts#L14)

Creates a new Xorshift32M PRNG.

This implementation is based on work by Marc-B-Reynolds and Sebastiano Vigna.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `seed?` | `number` | Optional seed number. Defaults to current time if not provided. |

#### Returns

[`RandomNumberGenerator`](#randomnumbergenerator)\<`number`\>

A new PRNG.

***

### createRandomXorshift7()

```ts
function createRandomXorshift7(seed?): RandomNumberGenerator<Xorshift7State>;
```

Defined in: [rng/xorshift7.ts:19](https://github.com/claus-codes/util-random/blob/main/src/rng/xorshift7.ts#L19)

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

### createRandomXorShiftMash()

```ts
function createRandomXorShiftMash(seed?): RandomNumberGenerator<number>;
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

### createRandomXorwow()

```ts
function createRandomXorwow(seed?): RandomNumberGenerator<XorwowState>;
```

Defined in: [rng/xorwow.ts:19](https://github.com/claus-codes/util-random/blob/main/src/rng/xorwow.ts#L19)

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

### createRandomXoshiro128Plus()

```ts
function createRandomXoshiro128Plus(seed?): RandomNumberGenerator<Xoshiro128StatePlus>;
```

Defined in: [rng/xoshiro128-plus.ts:19](https://github.com/claus-codes/util-random/blob/main/src/rng/xoshiro128-plus.ts#L19)

Creates a new Xoshiro128+ PRNG.

This is an implementation of the Xoshiro128+ algorithm by David Blackman and Sebastiano Vigna.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `seed?` | `number` | Optional seed number. Defaults to current time if not provided. |

#### Returns

[`RandomNumberGenerator`](#randomnumbergenerator)\<[`Xoshiro128StatePlus`](#xoshiro128stateplus)\>

A new PRNG.

***

### createRandomXoshiro128PlusPlus()

```ts
function createRandomXoshiro128PlusPlus(seed?): RandomNumberGenerator<Xoshiro128PlusPlusState>;
```

Defined in: [rng/xoshiro128-plusplus.ts:19](https://github.com/claus-codes/util-random/blob/main/src/rng/xoshiro128-plusplus.ts#L19)

Creates a new Xoshiro128++ PRNG.

This is an implementation of the Xoshiro128++ algorithm by David Blackman and Sebastiano Vigna.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `seed?` | `number` | Optional seed number. Defaults to current time if not provided. |

#### Returns

[`RandomNumberGenerator`](#randomnumbergenerator)\<[`Xoshiro128PlusPlusState`](#xoshiro128plusplusstate)\>

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

### randomBool()

```ts
function randomBool(bias?, random?): boolean;
```

Defined in: [range.ts:32](https://github.com/claus-codes/util-random/blob/main/src/range.ts#L32)

Return a random boolean with an optional bias toward true.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `bias?` | `number` | `0.5` | Probability of returning true (range [0, 1]). |
| `random?` | [`RandomFunction`](#randomfunction) | `Math.random` | Function that returns a value in range [0, 1]. |

#### Returns

`boolean`

A random boolean.

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

### randomPointInCircle()

```ts
function randomPointInCircle(radius?, random?): [number, number];
```

Defined in: [geometry.ts:11](https://github.com/claus-codes/util-random/blob/main/src/geometry.ts#L11)

Return a random 2D coordinate [x, y] distributed uniformly inside a circle of the specified radius.
Uses the square root scaling to ensure uniform area distribution.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `radius?` | `number` | `1.0` | Radius of the circle. |
| `random?` | [`RandomFunction`](#randomfunction) | `Math.random` | Function that returns a value in range [0, 1]. |

#### Returns

\[`number`, `number`\]

[x, y] coordinates.

***

### randomPointOnSphere()

```ts
function randomPointOnSphere(radius?, random?): [number, number, number];
```

Defined in: [geometry.ts:25](https://github.com/claus-codes/util-random/blob/main/src/geometry.ts#L25)

Return a random 3D coordinate [x, y, z] distributed uniformly on the surface of a sphere of the specified radius.
Uses Archimedes' theorem for exact uniform distribution.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `radius?` | `number` | `1.0` | Radius of the sphere. |
| `random?` | [`RandomFunction`](#randomfunction) | `Math.random` | Function that returns a value in range [0, 1]. |

#### Returns

\[`number`, `number`, `number`\]

[x, y, z] coordinates.

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

### randomSign()

```ts
function randomSign(random?): number;
```

Defined in: [range.ts:40](https://github.com/claus-codes/util-random/blob/main/src/range.ts#L40)

Return either 1 or -1 randomly.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `random?` | [`RandomFunction`](#randomfunction) | `Math.random` | Function that returns a value in range [0, 1]. |

#### Returns

`number`

1 or -1.

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

### sampleRandom()

```ts
function sampleRandom<T>(
   items, 
   k, 
   random?): T[];
```

Defined in: [array.ts:154](https://github.com/claus-codes/util-random/blob/main/src/array.ts#L154)

Select k unique random items from an array without replacement.
Uses a partial Fisher-Yates shuffle to run in O(k) time and O(n) space for cloning.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | The type of the items in the array. |

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `items` | `T`[] | `undefined` | An array of options to sample from. |
| `k` | `number` | `undefined` | The number of unique items to pick. |
| `random?` | [`RandomFunction`](#randomfunction) | `Math.random` | Function that returns a value in range [0, 1]. |

#### Returns

`T`[]

An array containing k unique items.

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

***

### shuffleInPlace()

```ts
function shuffleInPlace<T>(arr, random?): T[];
```

Defined in: [array.ts:133](https://github.com/claus-codes/util-random/blob/main/src/array.ts#L133)

Shuffle an array in-place, modifying the original array (no allocation).

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | The type of the items in the array. |

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `arr` | `T`[] | `undefined` | The array to shuffle. |
| `random?` | [`RandomFunction`](#randomfunction) | `Math.random` | Function that returns a value in range [0, 1]. |

#### Returns

`T`[]

The same array instance, shuffled.
