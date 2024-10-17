/**
 * Creates a billow noise function for 3D noise.
 * @param noise3D - Base 3D noise function.
 * @returns A function that generates billow noise.
 */
export function billowNoise3D(noise3D) {
    return (x, y, z, octaves = 2, lacunarity = 2.0, gain = 0.5, frequency = 1.0, amplitude = 1.0) => {
        let result = 0;
        for (let i = 0; i < octaves; i++) {
            const signal = Math.abs(noise3D(x * frequency, y * frequency, z * frequency)) * 2 - 1;
            result += signal * signal * amplitude;
            frequency *= lacunarity;
            amplitude *= gain;
        }
        return result;
    };
}
