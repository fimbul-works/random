import { getBytes } from './util';
const CRC_TABLE = new BigUint64Array(256);
// CRC-64 polynomial: 0xC96C5795D7870F42n (ECMA polynomial)
for (let i = 0n; i < 256n; i++) {
    let crc = i;
    for (let j = 0; j < 8; j++) {
        crc = crc & 1n ? 0xc96c5795d7870f42n ^ (crc >> 1n) : crc >> 1n;
    }
    CRC_TABLE[Number(i)] = crc;
}
/**
 * Compute the CRC-64 hash of the input data.
 * @param data - The input data to hash.
 * @returns The computed CRC-64 hash.
 */
export function crc64(data) {
    const bytes = getBytes(data);
    let crc = 0xffffffffffffffffn;
    for (let i = 0; i < bytes.length; i++) {
        const byte = BigInt(bytes[i]);
        crc = CRC_TABLE[Number((crc ^ byte) & 0xffn)] ^ (crc >> 8n);
    }
    return crc ^ 0xffffffffffffffffn;
}
