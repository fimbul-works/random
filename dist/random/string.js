/**
 * Generate a random string.
 * @param len - The length of the string to generate.
 * @param random - The random function to use.
 * @param alphabet - The alphabet to use.
 * @returns The generated string.
 */
export function generateRandomString(len, random = Math.random, alphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ') {
    let result = '';
    for (let i = 0; i < len; i++) {
        result += alphabet[Math.floor(random() * alphabet.length)];
    }
    return result;
}
