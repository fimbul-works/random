import { getBytes } from './util';

/**
 * Compute the Jenkins hash of the input data.
 * @param data - The input data to hash.
 * @returns The computed Jenkins hash.
 */
export function jenkinsHash(data: unknown) {
  const bytes: Uint8Array = getBytes(data);
  let hash: number = 0;

  for (let i = 0; i < bytes.length; i++) {
    hash += bytes[i];
    hash += hash << 10;
    hash ^= hash >> 6;
  }

  hash += hash << 3;
  hash ^= hash >> 11;
  hash += hash << 15;
  return hash;
}
