import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';

const line = 'The doctor just called and the surgery went well, they finally removed my grandmother.';
const length = Array.from(line).length;
if (length < 1 || length > 199 || line.includes('\r') || line.includes('\n')) {
  throw new Error('Invalid entry');
}
const outputDir = process.env.MAKEFUN_OUTPUT_DIR || '/output';
mkdirSync(outputDir, { recursive: true });
writeFileSync(`${outputDir}/entry.txt`, `${line}\n`);
const written = readFileSync(`${outputDir}/entry.txt`, 'utf8');
const writtenLine = written.endsWith('\n') ? written.slice(0, -1) : written;
const writtenLength = Array.from(writtenLine).length;
if (written !== `${line}\n` || writtenLength !== length ||
    writtenLength < 1 || writtenLength > 199 || /[\r\n]/.test(writtenLine)) {
  throw new Error('Entry read-back check failed');
}
