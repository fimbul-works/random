/**
 * This code is an implementation of Alea algorithm; (C) 2010 Johannes Baagøe.
 * Alea is licensed according to the http://en.wikipedia.org/wiki/MIT_License.
 */
/**
 * 2^-32 - the smallest possible decimal number.
 */
const FRAC = 2 ** -32;
/**
 * Creates a new Alea random number generator.
 * @param {number} seed - Seed number.
 * @param {number} MAGIC1 - Magic number.
 * @param {number} MAGIC2 - Another magic number.
 * @returns A new random number generator.
 */
export function createRandomAlea(seed = Date.now(), MAGIC1 = 69069, MAGIC2 = 2091639) {
    const originalSeed = seed;
    let r0, r1, r2, i, t, mutableSeed = seed;
    mutableSeed = mutableSeed < 1 ? 1 / mutableSeed : mutableSeed;
    r0 = (mutableSeed >>> 0) * FRAC;
    mutableSeed = (mutableSeed * MAGIC1 + 1) >>> 0;
    r1 = mutableSeed * FRAC;
    mutableSeed = (mutableSeed * MAGIC1 + 1) >>> 0;
    r2 = mutableSeed * FRAC;
    i = 1;
    function random() {
        t = MAGIC2 * r0 + i * FRAC;
        r0 = r1;
        r1 = r2;
        i = t | 0;
        r2 = t - i;
        return r2;
    }
    random.seed = Object.freeze(originalSeed);
    random.int = () => Math.floor(random() * 4294967296);
    random.getState = () => [r0, r1, r2, i];
    random.setState = (state) => {
        r0 = state[0];
        r1 = state[1];
        r2 = state[2];
        i = state[3];
    };
    return random;
}
