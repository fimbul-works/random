/// <reference types="node" />

import fs from "node:fs";
import path from "node:path";
import { bench, group, run } from "mitata";
import pc from "picocolors";
import randomFactories from "./factories.js";
import type { RandomNumberGenerator } from "../src/types.js";

const GENERATION_SAMPLES = 10000;

const algoEntries = Object.entries(randomFactories).map(([name, fn]) => {
  const sample = (fn as any)(42) as RandomNumberGenerator<any>;
  const bits = sample.bits ?? 32;
  return {
    name,
    fn: fn as (seed: number) => RandomNumberGenerator<any>,
    bits,
  };
});

const algoBits = Object.fromEntries(algoEntries.map((a) => [a.name, a.bits]));

console.log(`\n=== PRNG Speed Benchmark Suite ===`);

group("Generation", () => {
  for (const { name, fn } of algoEntries) {
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

  function formatTime(ns: number): string {
    if (ns < 0.001) return `${(ns * 1000000).toFixed(2)} fs`;
    if (ns < 1) return `${(ns * 1000).toFixed(2)} ps`;
    if (ns < 1000) return `${ns.toFixed(2)} ns`;
    if (ns < 1000000) return `${(ns / 1000).toFixed(2)} µs`;
    if (ns < 1000000000) return `${(ns / 1000000).toFixed(2)} ms`;
    return `${(ns / 1000000000).toFixed(2)} s`;
  }

  function printRankingTable(title: string, items: { name: string; avg: number }[]) {
    console.log(pc.cyan(`\n--- ${title} ---`));
    console.log(pc.bold("Rank  Algorithm                 Avg Time / Iter  Relative Speed"));
    console.log("----------------------------------------------------------------");

    if (items.length === 0) {
      console.log("No generators in this category.");
      return;
    }

    const fastest = items[0].avg;

    items.forEach((item, index) => {
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

  function printLeaderboardTable(
    title: string,
    items: {
      name: string;
      avg: number;
      score: number;
      total: number;
      qualityScore: number;
      bits: number;
    }[],
  ) {
    if (items.length === 0) return;

    const fastestGen = Math.min(...items.map((item) => item.avg));

    const scored = items.map((item) => {
      const speedFactor = fastestGen / item.avg;
      const overallScore = speedFactor * item.qualityScore;
      return {
        ...item,
        speedFactor,
        overallScore,
      };
    });

    scored.sort((a, b) => b.overallScore - a.overallScore);

    console.log(
      pc.yellowBright(
        `\n======================================================================================================`,
      ),
    );
    console.log(pc.yellowBright(`  ${title.padEnd(98)}`));
    console.log(
      pc.yellowBright(
        `======================================================================================================`,
      ),
    );
    console.log(
      pc.bold(
        "Rank  Algorithm             Bits  Gen Speed         Quality Pass  Quality Score  Speed Factor  Overall Score",
      ),
    );
    console.log(
      "------------------------------------------------------------------------------------------------------",
    );

    scored.forEach((item, index) => {
      const rank = (index + 1).toString().padEnd(4);
      const name = item.name.padEnd(21);
      const bitsStr = `${item.bits}-bit`.padEnd(6);
      const speedStr = formatTime(item.avg).padEnd(17);
      const passStr = `${item.score}/${item.total}`.padEnd(13);
      const qScoreStr = item.qualityScore.toFixed(2).padEnd(14);
      const speedFactorStr = `${(item.speedFactor * 100).toFixed(1)}%`.padEnd(13);

      let colorFn = pc.red;
      if (item.overallScore >= 6.0) colorFn = pc.green;
      else if (item.overallScore >= 3.0) colorFn = pc.yellow;

      const overallStr = colorFn(item.overallScore.toFixed(3));
      console.log(`${rank}  ${name} ${bitsStr} ${speedStr} ${passStr} ${qScoreStr} ${speedFactorStr} ${overallStr}`);
    });

    console.log(
      "------------------------------------------------------------------------------------------------------",
    );
    console.log("* Note: Overall Score = Speed Factor (relative to category fastest) * Quality Score (1.0 - 10.0)");
    console.log(
      "======================================================================================================\n",
    );
  }

  for (const [groupName, groupBenches] of groupsMap.entries()) {
    console.log(pc.white("\n===================================================================="));
    console.log(pc.white(`           BENCHMARK SPEED RANKING REPORTS (${groupName})           `));
    console.log(pc.white("===================================================================="));

    // Sort benches by average execution time
    const sortedAll = groupBenches
      .map((b) => {
        const runInfo = b.runs?.[0];
        const avg = runInfo?.stats?.avg ?? Infinity;
        const error = runInfo?.error;
        const name = b.alias || "unknown";
        const bits = algoBits[name] ?? 32;
        return { name, avg, error, bits };
      })
      .filter((item) => !item.error)
      .sort((a, b) => a.avg - b.avg);

    const sorted32 = sortedAll.filter((item) => item.bits === 32);
    const sorted64 = sortedAll.filter((item) => item.bits === 64);

    printRankingTable("⚡ 32-Bit PRNG Speed Rankings", sorted32);
    printRankingTable("⚡ 64-Bit PRNG Speed Rankings", sorted64);
    printRankingTable("⚡ Overall PRNG Speed Rankings (All)", sortedAll);
  }

  // overall & segmented leaderboards
  const genGroup = groupsMap.get("Generation");
  if (genGroup) {
    const genBenches = genGroup
      .map((b) => {
        const runInfo = b.runs?.[0];
        const avg = runInfo?.stats?.avg ?? Infinity;
        const error = runInfo?.error;
        const name = b.alias || "unknown";
        const bits = algoBits[name] ?? 32;
        const q = qualityScores[name] || { score: 0, total: 8, qualityScore: 1.0 };
        return {
          name,
          avg,
          error,
          bits,
          score: q.score,
          total: q.total,
          qualityScore: q.qualityScore,
        };
      })
      .filter((item) => !item.error);

    const gen32 = genBenches.filter((b) => b.bits === 32);
    const gen64 = genBenches.filter((b) => b.bits === 64);

    printLeaderboardTable("🏆 32-BIT PRNG EFFICIENCY & QUALITY LEADERBOARD", gen32);
    printLeaderboardTable("🏆 64-BIT PRNG EFFICIENCY & QUALITY LEADERBOARD", gen64);
    printLeaderboardTable("🏆 OVERALL PRNG EFFICIENCY & QUALITY LEADERBOARD (COMBINED)", genBenches);
  }

  // 2. Save speed benchmark results to benchmark-speed.json
  const speedJsonPath = path.resolve(process.cwd(), "benchmark-speed.json");
  const speedData = {
    timestamp: new Date().toISOString(),
    groups: {} as Record<string, { name: string; bits: number; avg: number }[]>,
  };

  for (const [groupName, groupBenches] of groupsMap.entries()) {
    const sorted = groupBenches
      .map((b) => {
        const runInfo = b.runs?.[0];
        const avg = runInfo?.stats?.avg ?? Infinity;
        const error = runInfo?.error;
        const name = b.alias || "unknown";
        const bits = algoBits[name] ?? 32;
        return { name, avg, error, bits };
      })
      .filter((item) => !item.error)
      .sort((a, b) => a.avg - b.avg);

    speedData.groups[groupName] = sorted.map((item) => ({
      name: item.name,
      bits: item.bits,
      avg: item.avg,
    }));
  }

  fs.writeFileSync(speedJsonPath, JSON.stringify(speedData, null, 2), "utf-8");
  console.log(pc.greenBright("Saved speed benchmarks to benchmark-speed.json"));
}
