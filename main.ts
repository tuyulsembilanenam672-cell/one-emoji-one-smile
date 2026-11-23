// One Emoji, One Smile — entry program.
// Writes exactly one emoji, and nothing else, to /output/entry.txt.
// The emoji: U+1F917 HUGGING FACE — a warm hug at first glance, the
// kind of greeting most likely to make a stranger smile.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const EMOJI: string = "\u{1F917}";
const OUT: string = "/output/entry.txt";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 8 characters,
// not only white space. One emoji, one code point, four bytes — the
// smallest possible valid entry, which also wins the size tie-break.
function main(): void {
  const points: string[] = [...EMOJI];
  if (points.length !== 1) {
    throw new Error(`expected exactly one emoji, got ${points.length} code points`);
  }
  const cp: number = EMOJI.codePointAt(0) as number;
  if (cp < 0x1f000 || cp > 0x1faff) {
    throw new Error(`code point U+${cp.toString(16).toUpperCase()} is not in the emoji range`);
  }
  if (EMOJI.trim().length === 0) {
    throw new Error("entry must not be whitespace-only");
  }
  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, EMOJI, "utf8");
  console.log(`Wrote 1 emoji (${points.length} code point, ${Buffer.byteLength(EMOJI, "utf8")} bytes) to ${OUT}`);
}

main();
