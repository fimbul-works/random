/**
 * Creates a 3D fractal Brownian motion (fBm) noise function.
 * @param noise3D - TBase 3D noise function.
 * @returns A function that generates fBm noise in the range [-amplitude, amplitude].
 */
export function fBm3D(noise3D) {
    return (x, y, z, octaves = 2, lacunarity = 2.0, gain = 0.5, frequency = 1.0, amplitude = 1.0) => {
        let total = 0;
        let maxValue = 0;
        for (let i = 0; i < octaves; i++) {
            total += amplitude * noise3D(x * frequency, y * frequency, z * frequency);
            maxValue += amplitude;
            amplitude *= gain;
            frequency *= lacunarity;
        }
        return total / maxValue;
    };
}
