import { getBytes } from './util';

const FNV_PRIME = 16777619n;
const FNV_OFFSET_BASIS = 2166136261n;

/**
 * Compute the FNV-1a hash of the input data.
 * @param data - The input data to hash.
 * @returns The computed FNV-1a hash.
 */
export function fnv1a(data: unknown): number {
  const bytes: Uint8Array = getBytes(data);
  let hash = FNV_OFFSET_BASIS;

  for (let i = 0; i < bytes.length; i++) {
    hash ^= BigInt(bytes[i]);
    hash = (hash * FNV_PRIME) & 0xffffffffn; // Keep it 32-bit
  }

  return Number(hash);
}
