/**
 * Creates a billow noise function for 4D noise.
 * @param noise4D - Base 4D noise function.
 * @returns A function that generates billow noise.
 */
export function billowNoise4D(noise4D) {
    return (x, y, z, w, octaves = 2, lacunarity = 2.0, gain = 0.5, frequency = 1.0, amplitude = 1.0) => {
        let result = 0;
        for (let i = 0; i < octaves; i++) {
            const signal = Math.abs(noise4D(x * frequency, y * frequency, z * frequency, w * frequency)) *
                2 -
                1;
            result += signal * signal * amplitude;
            frequency *= lacunarity;
            amplitude *= gain;
        }
        return result;
    };
}
