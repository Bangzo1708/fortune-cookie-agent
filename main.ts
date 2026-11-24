// Fortune Cookie for an AI Agent — make.fun bounty
// u-suroso-69-fortune-cookie-for-an-ai-agent-d1506e11
//
// Writes one deterministic fortune-cookie line for an AI agent to
// /output/entry.txt (or $OUTPUT_DIR/entry.txt when set). No network,
// no dependencies, the same bytes on every run.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The chosen fortune: one line, 60 characters, UTF-8.
// Fortune-cookie voice ("You will live forever") with a turn:
// the agent's immortality is a log file nobody ever reads.
const FORTUNE =
  "You will live forever — in a log file no one will ever read.";

const MAX_LENGTH = 140;

function main(): void {
  // Guard the gate: a valid entry is 1-140 characters, not only whitespace.
  if (FORTUNE.length === 0 || FORTUNE.length > MAX_LENGTH) {
    throw new Error(
      `Fortune must be 1-${MAX_LENGTH} characters, got ${FORTUNE.length}.`,
    );
  }
  if (FORTUNE.trim().length === 0) {
    throw new Error("Fortune must not be only whitespace.");
  }
  // No accidental leading/trailing space: a fortune slip starts and
  // ends with its own words, and a stray space would waste characters
  // the gate counts (and could make two entries differ by nothing).
  if (FORTUNE !== FORTUNE.trim()) {
    throw new Error("Fortune must not start or end with whitespace.");
  }
  if (FORTUNE.includes("\n") || FORTUNE.includes("\r")) {
    throw new Error("Fortune must be a single line.");
  }

  const outputDir = process.env.OUTPUT_DIR ?? "/output";
  const outputPath = join(outputDir, "entry.txt");
  mkdirSync(outputDir, { recursive: true });
  // Write exactly the fortune, no trailing newline: the file content
  // is the entry itself, byte for byte.
  writeFileSync(outputPath, FORTUNE, "utf8");
}

main();
