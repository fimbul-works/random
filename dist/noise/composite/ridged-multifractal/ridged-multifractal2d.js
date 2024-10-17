/**
 * Creates a ridged multi-fractal noise function for 2D noise.
 * @param noise2D - Base 2D noise function.
 * @returns A function that generates ridged multi-fractal noise.
 */
export function ridgedMultifractal2D(noise2D) {
    return (x, y, initialWeight = 1.0, octaves = 2, lacunarity = 2.0, gain = 0.5, offset = 1.0, frequency = 1.0, amplitude = 1.0) => {
        let result = 0;
        let weight = initialWeight;
        for (let i = 0; i < octaves; i++) {
            let signal = offset - Math.abs(noise2D(x * frequency, y * frequency));
            signal *= signal;
            result += signal * amplitude * weight;
            frequency *= lacunarity;
            amplitude *= gain;
            weight = signal * gain;
        }
        return result;
    };
}
