/**
 * Creates a Curl noise function for 2D noise.
 * @param noise2D - Base 2D noise function.
 * @param epsilon - Small value used for numerical differentiation. Controls the sampling distance
 *                  for derivative approximation. Smaller values generally give more accurate results,
 *                  but very small values may cause numerical instability.
 * @returns A function that generates 2D Curl noise.
 */
export function curlNoise2D(noise2D, epsilon = 0.0001) {
    return (x, y) => {
        // Find rate of change
        const x1 = noise2D(x + epsilon, y);
        const x2 = noise2D(x - epsilon, y);
        const y1 = noise2D(x, y + epsilon);
        const y2 = noise2D(x, y - epsilon);
        // Average to find approximate derivative
        const curlX = (x1 - x2) / (2 * epsilon);
        const curlY = (y1 - y2) / (2 * epsilon);
        return [curlY, -curlX];
    };
}
/**
 * Creates a curl noise function based on a given 2D noise function.
 * @param noise2D - Base 2D noise function.
 * @param curlStrength - The strength of the curl noise.
 * @param curlScale - The scale of the curl noise.
 * @returns A new 2D noise function that incorporates the curl effect.
 */
export function createCurledNoise2D(noise2D, curlStrength = 1.0, curlScale = 1.0) {
    const curl = curlNoise2D(noise2D);
    return (x, y) => {
        const [cy, cx] = curl(x * curlScale, y * curlScale);
        const dx = cx * curlStrength;
        const dy = cy * curlStrength;
        const noise1 = noise2D(x + dy, y - dx);
        const noise2 = noise2D(x - dy, y + dx);
        return (noise1 - noise2) * 0.5 + 0.5;
    };
}
export function createCurlMagnitudeNoise2D(noise2D, epsilon) {
    const curl = curlNoise2D(noise2D, epsilon);
    return (x, y) => {
        const [curlY, curlX] = curl(x, y);
        return Math.sqrt(curlX * curlX + curlY * curlY);
    };
}
export function createCurlAngleNoise2D(noise2D, epsilon) {
    const curl = curlNoise2D(noise2D, epsilon);
    return (x, y) => {
        const [curlY, curlX] = curl(x, y);
        return Math.atan2(curlY, curlX) / (2 * Math.PI) + 0.5;
    };
}
