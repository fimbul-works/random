import { getBytes } from './util';

const CRC_TABLE = new Uint32Array(256);

// CRC-32 polynomial: 0xEDB88320
for (let i = 0; i < 256; i++) {
  let c = i;
  for (let j = 0; j < 8; j++) {
    c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  }
  CRC_TABLE[i] = c;
}

/**
 * Compute the CRC-32 hash of the input data.
 * @param data - The input data to hash.
 * @returns The computed CRC-32 hash.
 */
export function crc32(data: unknown): number {
  const bytes = getBytes(data);
  let crc: number = 0xffffffff;

  for (let i = 0; i < bytes.length; i++) {
    crc = CRC_TABLE[(crc ^ bytes[i]) & 0xff] ^ (crc >>> 8);
  }

  return (crc ^ 0xffffffff) >>> 0;
}
