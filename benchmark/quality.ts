import fs from "node:fs";
import path from "node:path";
import pc from "picocolors";
import randomness from "randomness";
import randomFactories from "../src/rng/factory.js";

const randomnessTests = (randomness as any).default as Record<string, (typeof randomness)[keyof typeof randomness]>;

const SEED = 42;
const QUALITY_BITS = 2 ** 22; // 4,194,304 bits
const QUALITY_SAMPLES = QUALITY_BITS / 32; // 131,072 floats

function generateBits(randomFn: () => number, samples: number): Uint8Array {
  const bytes = new Uint8Array(samples * 4);
  const view = new DataView(bytes.buffer);
  for (let i = 0; i < samples; i++) {
    view.setUint32(i * 4, (randomFn() * 0x100000000) >>> 0, false);
  }
  return bytes;
}

const algos = Object.entries(randomFactories).map(([name, fn]) => ({ name, fn })) as {
  name: string;
  fn: (seed: number | bigint) => () => number;
}[];

const qualityJsonPath = path.resolve(process.cwd(), "benchmark-quality.json");

// Check if we should skip running
let runNeeded = true;
let existingData: any = null;

if (fs.existsSync(qualityJsonPath)) {
  try {
    existingData = JSON.parse(fs.readFileSync(qualityJsonPath, "utf-8"));
    if (
      existingData &&
      existingData.seed === SEED &&
      existingData.qualityBits === QUALITY_BITS &&
      existingData.results
    ) {
      // Check if all algorithms in current randomFactories exist in results
      const existingAlgos = Object.keys(existingData.results);
      const currentAlgos = algos.map((a) => a.name);

      const allExist = currentAlgos.every((name) => existingAlgos.includes(name));
      const noExtras = existingAlgos.every((name) => currentAlgos.includes(name));

      if (allExist && noExtras) {
        runNeeded = false;
      }
    }
  } catch {
    // If invalid JSON, we just re-run
  }
}

if (!runNeeded) {
  console.log(pc.bold("Quality results are up to date in benchmark-quality.json. Skipping test suite."));
  console.log(`(seed: ${SEED}, samples: ${QUALITY_SAMPLES} floats, bits: ${QUALITY_BITS})`);
  process.exit(0);
}

console.log(`\n=== Running Quality Tests ===`);
console.log(`Sample Settings: Seed = ${SEED}, Quality Bits = ${QUALITY_BITS} (${QUALITY_SAMPLES} floats)`);

const resultsMap: Record<string, any> = {};

for (const { name, fn } of algos) {
  console.log(`Testing quality of ${name}...`);
  const bits = generateBits(fn(SEED), QUALITY_SAMPLES);

  const testResults = Object.entries(randomnessTests).map(([testName, test]) => {
    try {
      const [passed, pValue] = test(bits);
      return { testName, passed, pValue };
    } catch (e) {
      return { testName, passed: false, pValue: 0, error: String(e) };
    }
  });

  const score = testResults.filter((r) => r.passed).length;
  const total = testResults.length;
  const pValueAverage = testResults.reduce((acc, r) => acc + r.pValue, 0) / total;

  const base = 1.0;
  const max = 10.0;
  const qualityBonus = (1 / total) * (max - base);
  const qScore = base + score * qualityBonus;

  resultsMap[name] = {
    score,
    total,
    qualityScore: qScore,
    tests: testResults,
  };

  console.log(
    `  -> ${name}: ${score}/${total} (Avg pValue: ${pValueAverage.toFixed(2)} | Quality Score: ${qScore.toFixed(2)})`,
  );
}

const manifest = {
  seed: SEED,
  qualityBits: QUALITY_BITS,
  timestamp: new Date().toISOString(),
  results: resultsMap,
};

fs.writeFileSync(qualityJsonPath, JSON.stringify(manifest, null, 2), "utf-8");
console.log(pc.green("Saved quality benchmarks to benchmark-quality.json"));
