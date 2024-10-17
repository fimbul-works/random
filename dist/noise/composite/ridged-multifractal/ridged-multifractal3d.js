/**
 * Creates a ridged multi-fractal noise function for 3D noise.
 * @param noise3D - Base 3D noise function.
 * @returns A function that generates ridged multi-fractal noise.
 */
export function ridgedMultifractal3D(noise3D) {
    return (x, y, z, initialWeight = 1.0, octaves = 2, lacunarity = 2.0, gain = 0.5, offset = 1.0, frequency = 1.0, amplitude = 1.0) => {
        let result = 0;
        let weight = initialWeight;
        for (let i = 0; i < octaves; i++) {
            let signal = offset - Math.abs(noise3D(x * frequency, y * frequency, z * frequency));
            signal *= signal;
            result += signal * amplitude * weight;
            frequency *= lacunarity;
            amplitude *= gain;
            weight = signal * gain;
        }
        return result;
    };
}
