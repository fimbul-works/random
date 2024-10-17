/**
 * Scrambles 3 numbers into one.
 * @param a - First number.
 * @param b - Second number.
 * @param c - Third number.
 * @returns - A new number.
 */
export const mix = (a, b, c) => {
    a = a - b;
    a = a - c;
    a = a ^ (c >>> 13);
    b = b - c;
    b = b - a;
    b = b ^ (a << 8);
    c = c - a;
    c = c - b;
    c = c ^ (b >>> 13);
    a = a - b;
    a = a - c;
    a = a ^ (c >>> 12);
    b = b - c;
    b = b - a;
    b = b ^ (a << 16);
    c = c - a;
    c = c - b;
    c = c ^ (b >>> 5);
    a = a - b;
    a = a - c;
    a = a ^ (c >>> 3);
    b = b - c;
    b = b - a;
    b = b ^ (a << 10);
    c = c - a;
    c = c - b;
    c = c ^ (b >>> 15);
    return c;
};
