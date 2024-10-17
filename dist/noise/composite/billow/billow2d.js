/**
 * Creates a billow noise function for 2D noise.
 * @param noise2D - Base 2D noise function.
 * @returns A function that generates billow noise.
 */
export function billowNoise2D(noise2D) {
    return (x, y, octaves = 2, lacunarity = 2.0, gain = 0.5, frequency = 1.0, amplitude = 1.0) => {
        let result = 0;
        for (let i = 0; i < octaves; i++) {
            const signal = Math.abs(noise2D(x * frequency, y * frequency)) * 2 - 1;
            result += signal * signal * amplitude;
            frequency *= lacunarity;
            amplitude *= gain;
        }
        return result;
    };
}
