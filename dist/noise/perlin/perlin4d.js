import { shuffleArray } from '../../random';
import { fade, lerp } from './util';
/**
 * Create a 4D Perlin Noise function.
 * @return 4D Perlin noise function.
 */
export function createPerlinNoise4D(random = Math.random) {
    let perm = [];
    for (let i = 0; i < 256; i++) {
        perm[i] = i;
    }
    perm = shuffleArray(perm, random);
    perm = [...perm, ...perm];
    function grad(hash, x, y, z, w) {
        const h = hash & 31;
        const u = h < 24 ? x : y;
        const v = h < 16 ? y : z;
        const w1 = h < 8 ? z : w;
        return (((h & 1) === 0 ? u : -u) +
            ((h & 2) === 0 ? v : -v) +
            ((h & 4) === 0 ? w1 : -w1));
    }
    /**
     * Generate 4D Perlin noise.
     * @param x - X coordinate in 4D space.
     * @param y - Y coordinate in 4D space.
     * @param z - Z coordinate in 4D space.
     * @param w - W coordinate in 4D space.
     * @return A noise value in the range [-1, 1].
     */
    return function noise4D(x, y, z, w) {
        const X = Math.floor(x) & 255;
        const Y = Math.floor(y) & 255;
        const Z = Math.floor(z) & 255;
        const W = Math.floor(w) & 255;
        x -= Math.floor(x);
        y -= Math.floor(y);
        z -= Math.floor(z);
        w -= Math.floor(w);
        const u = fade(x);
        const v = fade(y);
        const s = fade(z);
        const t = fade(w);
        const A = perm[X] + Y, AA = perm[A] + Z, AB = perm[A + 1] + Z;
        const B = perm[X + 1] + Y, BA = perm[B] + Z, BB = perm[B + 1] + Z;
        return lerp(lerp(lerp(lerp(grad(perm[AA + W], x, y, z, w), grad(perm[BA + W], x - 1, y, z, w), u), lerp(grad(perm[AB + W], x, y - 1, z, w), grad(perm[BB + W], x - 1, y - 1, z, w), u), v), lerp(lerp(grad(perm[AA + 1 + W], x, y, z - 1, w), grad(perm[BA + 1 + W], x - 1, y, z - 1, w), u), lerp(grad(perm[AB + 1 + W], x, y - 1, z - 1, w), grad(perm[BB + 1 + W], x - 1, y - 1, z - 1, w), u), v), s), lerp(lerp(lerp(grad(perm[AA + W + 1], x, y, z, w - 1), grad(perm[BA + W + 1], x - 1, y, z, w - 1), u), lerp(grad(perm[AB + W + 1], x, y - 1, z, w - 1), grad(perm[BB + W + 1], x - 1, y - 1, z, w - 1), u), v), lerp(lerp(grad(perm[AA + 1 + W + 1], x, y, z - 1, w - 1), grad(perm[BA + 1 + W + 1], x - 1, y, z - 1, w - 1), u), lerp(grad(perm[AB + 1 + W + 1], x, y - 1, z - 1, w - 1), grad(perm[BB + 1 + W + 1], x - 1, y - 1, z - 1, w - 1), u), v), s), t);
    };
}
