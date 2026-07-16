/// <reference types="node" />

import fs from "node:fs";
import path from "node:path";
import { bench, group, run } from "mitata";
import pc from "picocolors";
import randomFactories from "./factories.js";
import type { RandomFunction } from "../src/types.js";

const GENERATION_SAMPLES = 10000;

const algos = Object.entries(randomFactories).map(([name, fn]) => ({ name, fn })) as {
  name: string;
  fn: (seed: number) => RandomFunction;
}[];

// const numSamples = 10;
// for (const { name, fn } of algos) {
//   const random = fn(42);
//   const floats = Array.from({ length: numSamples }, () => random());
//   const ints = Array.from({ length: numSamples }, () => random.int());
//   const int64s = Array.from({ length: numSamples }, () => random.int64());
//   const doubles = Array.from({ length: numSamples }, () => random.double());
//   console.log({ name, seed: random.seed, floats, ints, int64s, doubles });
// }
// process.exit(0);

console.log(`\n=== PRNG Speed Benchmark Suite ===`);

group("Generation", () => {
  for (const { name, fn } of algos) {
    const random = fn(42);
    bench(name, () => {
      for (let i = 1; i < GENERATION_SAMPLES; i++) {
        random();
      }
    });
  }
});

const result = await run();

// 1. Read stored quality results
const qualityJsonPath = path.resolve(process.cwd(), "benchmark-quality.json");
const qualityScores: Record<string, { score: number; total: number; qualityScore: number }> = {};

if (fs.existsSync(qualityJsonPath)) {
  try {
    const data = JSON.parse(fs.readFileSync(qualityJsonPath, "utf-8"));
    if (data?.results) {
      for (const [name, val] of Object.entries(data.results)) {
        const item = val as any;
        qualityScores[name] = {
          score: item.score ?? 0,
          total: item.total ?? 8,
          qualityScore: item.qualityScore ?? 1.0,
        };
      }
    }
  } catch (e) {
    console.error("Error reading benchmark-quality.json:", e);
  }
}

if (result && typeof result === "object" && "benchmarks" in result) {
  const benchmarks = (result as any).benchmarks as any[];
  const layout = (result as any).layout as any[];

  // Group benchmarks by their group name
  const groupsMap = new Map<string, any[]>();

  for (const b of benchmarks) {
    const groupIdx = b.group;
    const groupName = layout[groupIdx]?.name || "Default";
    if (!groupsMap.has(groupName)) {
      groupsMap.set(groupName, []);
    }
    groupsMap.get(groupName)!.push(b);
  }

  console.log(pc.white("\n===================================================================="));
  console.log(pc.white("           BENCHMARK RANKING REPORT (Fastest to Slowest)            "));
  console.log(pc.white("===================================================================="));

  function formatTime(ns: number): string {
    if (ns < 0.001) return `${(ns * 1000000).toFixed(2)} fs`;
    if (ns < 1) return `${(ns * 1000).toFixed(2)} ps`;
    if (ns < 1000) return `${ns.toFixed(2)} ns`;
    if (ns < 1000000) return `${(ns / 1000).toFixed(2)} µs`;
    if (ns < 1000000000) return `${(ns / 1000000).toFixed(2)} ms`;
    return `${(ns / 1000000000).toFixed(2)} s`;
  }

  for (const [groupName, groupBenches] of groupsMap.entries()) {
    console.log(`\n\x1b[1m\x1b[33mGroup: ${groupName}\x1b[0m`);

    // Sort benches by average execution time
    const sorted = groupBenches
      .map((b) => {
        const runInfo = b.runs?.[0];
        const avg = runInfo?.stats?.avg ?? Infinity;
        const error = runInfo?.error;
        return { name: b.alias || "unknown", avg, error };
      })
      .filter((item) => !item.error)
      .sort((a, b) => a.avg - b.avg);

    if (sorted.length === 0) {
      console.log("No successful benchmarks in this group.");
      continue;
    }

    const fastest = sorted[0].avg;

    console.log(pc.bold("Rank  Algorithm                 Avg Time / Iter  Relative Speed"));
    console.log("----------------------------------------------------------------");

    sorted.forEach((item, index) => {
      const rank = (index + 1).toString().padEnd(4);
      const name = item.name.padEnd(25);
      const timeStr = formatTime(item.avg).padEnd(16);

      let relativeStr = "";
      if (index === 0) {
        relativeStr = `\x1b[32m1.00x (fastest)\x1b[0m`;
      } else {
        const ratio = item.avg / fastest;
        relativeStr = `\x1b[31m${ratio.toFixed(2)}x slower\x1b[0m`;
      }

      console.log(`${rank}  ${name} ${timeStr} ${relativeStr}`);
    });
    console.log("----------------------------------------------------------------");
  }

  // overall leaderboard
  const genGroup = groupsMap.get("Generation");
  if (genGroup) {
    console.log(
      pc.yellowBright(
        "\n======================================================================================================",
      ),
    );
    console.log(
      pc.yellowBright(
        "                           🏆 OVERALL PRNG EFFICIENCY & QUALITY LEADERBOARD                           ",
      ),
    );
    console.log(
      pc.yellowBright(
        "======================================================================================================",
      ),
    );

    const genBenches = genGroup
      .map((b) => {
        const runInfo = b.runs?.[0];
        const avg = runInfo?.stats?.avg ?? Infinity;
        const error = runInfo?.error;
        return { name: b.alias || "unknown", avg, error };
      })
      .filter((item) => !item.error);

    const fastestGen = Math.min(...genBenches.map((item) => item.avg));

    const leaderboard = genBenches.map((item) => {
      const q = qualityScores[item.name] || { score: 0, total: 8, qualityScore: 1.0 };
      const speedFactor = fastestGen / item.avg;
      const overallScore = speedFactor * q.qualityScore;
      return {
        name: item.name,
        avg: item.avg,
        score: q.score,
        total: q.total,
        qualityScore: q.qualityScore,
        speedFactor,
        overallScore,
      };
    });

    leaderboard.sort((a, b) => b.overallScore - a.overallScore);

    console.log(
      pc.bold("Rank  Algorithm             Gen Speed         Quality Pass  Quality Score  Speed Factor  Overall Score"),
    );
    console.log(
      "------------------------------------------------------------------------------------------------------",
    );

    leaderboard.forEach((item, index) => {
      const rank = (index + 1).toString().padEnd(4);
      const name = item.name.padEnd(21);
      const speedStr = formatTime(item.avg).padEnd(17);
      const passStr = `${item.score}/${item.total}`.padEnd(13);
      const qScoreStr = item.qualityScore.toFixed(2).padEnd(14);
      const speedFactorStr = `${(item.speedFactor * 100).toFixed(1)}%`.padEnd(13);

      let colorFn = pc.red;
      if (item.overallScore >= 6.0) colorFn = pc.green;
      else if (item.overallScore >= 3.0) colorFn = pc.yellow;

      const overallStr = colorFn(item.overallScore.toFixed(3));
      console.log(`${rank}  ${name} ${speedStr} ${passStr} ${qScoreStr} ${speedFactorStr} ${overallStr}`);
    });
    console.log(
      "------------------------------------------------------------------------------------------------------",
    );
    console.log(
      "* Note: Overall Score = Speed Factor (relative to fastest) * Quality Score (1.0 - 10.0)               ",
    );
    console.log(
      "======================================================================================================\n",
    );
  }

  // 2. Save speed benchmark results to benchmark-speed.json
  const speedJsonPath = path.resolve(process.cwd(), "benchmark-speed.json");
  const speedData = {
    timestamp: new Date().toISOString(),
    groups: {} as Record<string, { name: string; avg: number }[]>,
  };

  for (const [groupName, groupBenches] of groupsMap.entries()) {
    const sorted = groupBenches
      .map((b) => {
        const runInfo = b.runs?.[0];
        const avg = runInfo?.stats?.avg ?? Infinity;
        const error = runInfo?.error;
        return { name: b.alias || "unknown", avg, error };
      })
      .filter((item) => !item.error)
      .sort((a, b) => a.avg - b.avg);

    speedData.groups[groupName] = sorted.map((item) => ({
      name: item.name,
      avg: item.avg,
    }));
  }

  fs.writeFileSync(speedJsonPath, JSON.stringify(speedData, null, 2), "utf-8");
  console.log(pc.greenBright("Saved speed benchmarks to benchmark-speed.json"));
}
