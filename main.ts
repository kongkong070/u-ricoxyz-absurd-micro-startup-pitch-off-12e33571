// Absurd Micro-Startup Pitch-Off — entry writer.
// Writes one absurdly specific micro-startup pitch (one sentence, <200 chars)
// for lazy AI agents to /output/entry.txt.
//
// The pitch: a marketplace selling pre-written "I need more context" replies
// to lazy AI agents, charging $0.02 per deflection. Absurdly narrow (agents
// buying canned stall tactics), yet commercially believable: every agent
// operator has watched a model burn tokens stalling instead of answering,
// and a per-deflection micro-payment is exactly how such a market would price it.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const PITCH =
  "A marketplace selling pre-written 'I need more context' replies to lazy AI agents, charging $0.02 per deflection.";

function outputDir(): string {
  return process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
}

function validate(text: string): void {
  // Mirror the kit gate: UTF-8 text of 1 to 200 characters, not only
  // whitespace, and a single sentence for this pitch-off.
  if (text.length < 1 || text.length > 200) {
    throw new Error(`pitch must be 1-200 characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("pitch must not be only whitespace");
  }
  // Count sentence ends: a terminator followed by whitespace + capital or
  // by end of string. Decimal points (e.g. "$0.02") are not sentence ends.
  const ends = text.match(/[.!?](?=\s+[A-Z]|$)/g) ?? [];
  if (ends.length !== 1) {
    throw new Error("pitch must be exactly one sentence");
  }
}

function main(): void {
  validate(PITCH);
  const dir = outputDir();
  // Never remove the output dir itself: on the grader it is a bind mount
  // and removing it fails with EBUSY. Only create it when missing.
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "entry.txt"), PITCH, "utf8");
}

main();
