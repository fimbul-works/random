/**
 * Creates a ridged multi-fractal noise function for 4D noise.
 * @param noise4D - Base 4D noise function.
 * @returns A function that generates ridged multi-fractal noise.
 */
export function ridgedMultifractal4D(noise4D) {
    return (x, y, z, w, initialWeight = 1.0, octaves = 2, lacunarity = 2.0, gain = 0.5, offset = 1.0, frequency = 1.0, amplitude = 1.0) => {
        let result = 0;
        let weight = initialWeight;
        for (let i = 0; i < octaves; i++) {
            let signal = offset -
                Math.abs(noise4D(x * frequency, y * frequency, z * frequency, w * frequency));
            signal *= signal;
            result += signal * amplitude * weight;
            frequency *= lacunarity;
            amplitude *= gain;
            weight = signal * gain;
        }
        return result;
    };
}
