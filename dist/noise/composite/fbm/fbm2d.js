/**
 * Creates a 2D fractal Brownian motion (fBm) noise function.
 * @param noise2D - The base 2D noise function.
 * @returns A function that generates fBm noise in the range [-amplitude, amplitude].
 */
export function fBm2D(noise2D) {
    return (x, y, octaves = 2, lacunarity = 2.0, gain = 0.5, frequency = 1.0, amplitude = 1.0) => {
        let total = 0;
        let maxValue = 0;
        for (let i = 0; i < octaves; i++) {
            total += amplitude * noise2D(x * frequency, y * frequency);
            maxValue += amplitude;
            amplitude *= gain;
            frequency *= lacunarity;
        }
        return total / maxValue;
    };
}
