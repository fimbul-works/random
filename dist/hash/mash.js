import { getBytes } from './util';
/**
 * Create a new instance of the Mash algorithm.
 * @returns A function that takes data and returns a new value.
 */
export function createMash() {
    let n = 0xefc8249d;
    function mash(data) {
        const bytes = getBytes(data);
        for (let i = 0; i < bytes.length; i++) {
            n += bytes[i];
            let h = 0.02519603282416938 * n;
            n = h >>> 0;
            h -= n;
            h *= n;
            n = h >>> 0;
            h -= n;
            n += h * 0x100000000; // 2^32
        }
        return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
    }
    return mash;
}
