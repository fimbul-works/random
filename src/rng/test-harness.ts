import { describe, expect, it } from "vitest";
import type { RandomNumberGenerator, Seed } from "../types.js";

/**
 * Reusable test suite harness for a Pseudo-Random Number Generator.
 *
 * @param name - The name of the PRNG algorithm.
 * @param createRNG - A factory function to instantiate the PRNG.
 */
export function runRNGTests<T>(name: string, createRNG: (seed?: Seed) => RandomNumberGenerator<T>): void {
  describe(name, () => {
    // 1. Output range check over 1000 iterations
    it("should produce values in range [0.0, 1.0) over 1000 iterations", () => {
      const rng = createRNG(42);
      for (let i = 0; i < 1000; i++) {
        const val = rng();
        expect(val).toBeGreaterThanOrEqual(0.0);
        expect(val).toBeLessThan(1.0);
        expect(typeof val).toBe("number");
      }
    });

    // 2. Different seeds produce different sequences
    it("should produce different sequences with different seeds", () => {
      const rng1 = createRNG(12345);
      const rng2 = createRNG(54321);
      const rng3 = createRNG("seed");

      const seq1: number[] = [];
      const seq2: number[] = [];
      const seq3: number[] = [];
      for (let i = 0; i < 50; i++) {
        seq1.push(rng1());
        seq2.push(rng2());
        seq3.push(rng3());
      }

      expect(seq1).not.toEqual(seq2);
      expect(seq1).not.toEqual(seq3);
      expect(seq2).not.toEqual(seq3);
    });

    // 3. Capturing and restoring internal state
    it("should successfully capture and restore state", () => {
      const rng = createRNG(999);

      // Advance generator state first
      for (let i = 0; i < 100; i++) {
        rng();
      }

      // Capture internal state
      const state = rng.getState();

      // Generate sequence of 50 numbers
      const seqBefore: number[] = [];
      for (let i = 0; i < 50; i++) {
        seqBefore.push(rng());
      }

      // Restore internal state
      rng.setState(state);

      // Generate another sequence of 50 numbers
      const seqAfter: number[] = [];
      for (let i = 0; i < 50; i++) {
        seqAfter.push(rng());
      }

      // Verify that sequence is restored perfectly
      expect(seqAfter).toEqual(seqBefore);
    });

    // 4. Verification of decorated functions
    describe("decorated functions", () => {
      it("random.int() should produce correct values (unsigned 32-bit integer)", () => {
        const rng = createRNG(888);
        for (let i = 0; i < 1000; i++) {
          const val = rng.int();
          expect(typeof val).toBe("number");
          expect(Number.isInteger(val)).toBe(true);
          expect(val).toBeGreaterThanOrEqual(0);
          expect(val).toBeLessThanOrEqual(4294967295);
        }
      });

      it("random.int64() should produce correct values (unsigned 64-bit bigint)", () => {
        const rng = createRNG(888);
        for (let i = 0; i < 1000; i++) {
          const val = rng.int64();
          expect(typeof val).toBe("bigint");
          expect(val).toBeGreaterThanOrEqual(0n);
          expect(val).toBeLessThanOrEqual(18446744073709551615n);
        }
      });

      it("random.double() should produce correct values (double-precision float in [0.0, 1.0))", () => {
        const rng = createRNG(888);
        for (let i = 0; i < 1000; i++) {
          const val = rng.double();
          expect(typeof val).toBe("number");
          expect(val).toBeGreaterThanOrEqual(0.0);
          expect(val).toBeLessThan(1.0);
        }
      });
    });
  });
}
