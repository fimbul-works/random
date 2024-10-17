/**
 * Creates a 4D fractal Brownian motion (fBm) noise function.
 * @param noise4D - Base 4D noise function.
 * @returns A function that generates fBm noise in the range [-amplitude, amplitude].
 */
export function fBm4D(noise4D) {
    return (x, y, z, w, octaves = 2, lacunarity = 2.0, gain = 0.5, frequency = 1.0, amplitude = 1.0) => {
        let total = 0;
        let maxValue = 0;
        for (let i = 0; i < octaves; i++) {
            total +=
                amplitude *
                    noise4D(x * frequency, y * frequency, z * frequency, w * frequency);
            maxValue += amplitude;
            amplitude *= gain;
            frequency *= lacunarity;
        }
        return total / maxValue;
    };
}
