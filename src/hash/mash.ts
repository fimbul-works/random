/**
 * A stateful function that accepts arbitrary data as input, and outputs a number between 0.0 - 1.0.
 */
type Mash = (data: unknown) => number;

/**
 * Create a new data masher.
 * @returns {Mash} A function that takes data and returns a new value.
 */
export function createMash(): Mash {
  let n: number = 0xefc8249d;

  const prepareData = (data: unknown) =>
    typeof data === 'object' ? JSON.stringify(data) : String(data);

  function mash(data: unknown): number {
    const d = prepareData(data);
    for (let i = 0; i < d.length; i++) {
      n += d.charCodeAt(i);
      let h = 0.02519603282416938 * n;
      n = h >>> 0;
      h -= n;
      h *= n;
      n = h >>> 0;
      h -= n;
      n += h * 0x100000000; // 2^32
    }
    return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
  }

  return mash;
}
