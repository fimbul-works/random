/**
 * Creates a turbulence noise function for 4D noise.
 * @param noise4D - Base 4D noise function.
 * @returns A function that generates turbulence noise.
 */
export function turbulence4D(noise4D) {
    return (x, y, z, w, octaves = 2, lacunarity = 2.0, gain = 0.5, frequency = 1.0, amplitude = 1.0) => {
        let result = 0;
        let totalAmplitude = 0;
        for (let i = 0; i < octaves; i++) {
            result +=
                (Math.abs(noise4D(x * frequency, y * frequency, z * frequency, w * frequency)) *
                    2 -
                    1) *
                    amplitude;
            totalAmplitude += amplitude;
            frequency *= lacunarity;
            amplitude *= gain;
        }
        return result / totalAmplitude;
    };
}
