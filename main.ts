import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One office joke for make.fun "One Line, One Laugh: The Office Joke
// Open": a meeting that could have been an email — but the email would
// have needed a meeting to explain why it was not a meeting. The joke
// turns on itself in the last few words, so the punchline lands where
// the judge wants it.
// Written from scratch in this session; not copied from any other
// entry, and not a recycled classic.
const text =
  "The meeting could have been an email, but the email would have needed a meeting to explain why it wasn't a meeting.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Gate: the entry must be UTF-8 text of 1-200 characters, exactly one
// line (no newline characters inside), and not only white space.
const MAX_ENTRY_CHARS = 200;

function validateEntry(text: string): void {
  const length = [...text].length;
  if (length < 1 || length > MAX_ENTRY_CHARS) {
    throw new Error(`entry must be 1-${MAX_ENTRY_CHARS} characters, got ${length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be exactly one line");
  }
}

validateEntry(text);

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), text, "utf8");
