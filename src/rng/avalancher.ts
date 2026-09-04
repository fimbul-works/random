import { fastMix } from "@fimbul-works/hash";
import { RandomNumberGenerator, Seed } from "../types.js";
import { expandSeed } from "../seed.js";
import { decorateRandomInt32, defineRandomState } from "../decorate/decorate.js";

/**
 * Avalanche internal registry state: [reg, idx].
 */
export type AvalancherState = [number[], number];

/**
 * Create a new variable-entropy avalanche PRNG.
 *
 * @param {Seed} [seed=Date.now()] - Optional seed value (number or string). Defaults to current time if not provided.
 * @param {number} [numRegisters=16] - Number of registers to use. Default: 16
 * @param {(x: number, seed: number) => number} [mix=fastMix] - Mixing function to use. Default: `fastMix`
 * @returns {RandomNumberGenerator<AvalancherState>} A new PRNG.
 */
export const createRandomAvalancher = (
  seed: Seed = Date.now(),
  numRegisters: number = 16,
  mix: (x: number, seed: number) => number = fastMix,
): RandomNumberGenerator<AvalancherState> => {
  if (numRegisters <= 1) throw new RangeError("numRegisters must be greater than 1");

  // Internal registry and registry index
  let reg = Uint32Array.from(expandSeed(seed, numRegisters));
  let idx = 0;

  const random = (): number => {
    let t = reg[idx];

    for (let i = 1; i < numRegisters; i++) {
      t = mix(t, reg[(idx + i) % numRegisters]);
    }

    reg[idx] = mix(reg[idx], t ^ 0x9e3779b9); // Standard golden ratio
    idx = (idx + 1) % numRegisters;
    return t >>> 0;
  };

  return defineRandomState<AvalancherState>(
    decorateRandomInt32(random),
    seed,
    () => [Array.from(reg), idx],
    (state) => {
      if (state.length !== 2) {
        throw new Error("Invalid Avalanche state");
      }

      const newNumRegisters = state[0].length;
      if (newNumRegisters <= 1) {
        throw new RangeError("numRegisters must be greater than 1");
      }

      numRegisters = newNumRegisters;
      reg = Uint32Array.from(state[0]);

      idx = state[1] >>> 0;
      if (idx >= numRegisters) {
        throw new RangeError("Index out of range");
      }
    },
  );
};
