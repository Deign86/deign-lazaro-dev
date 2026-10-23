// Prints docs/cv/lazaro-cv.html to public/Lazaro CV.pdf (A4) with the installed Chrome.
// Usage: node scripts/print-cv.mjs [output.pdf]
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { chromium } from 'playwright';

const root = path.resolve(import.meta.dirname, '..');
const source = path.join(root, 'docs', 'cv', 'lazaro-cv.html');
const output = process.argv[2] ?? path.join(root, 'public', 'Lazaro CV.pdf');

const browser = await chromium.launch({ channel: 'chrome' });
try {
  const page = await browser.newPage();
  await page.goto(pathToFileURL(source).href, { waitUntil: 'load' });
  // Page size and margins come from the source's @page rule.
  await page.pdf({ path: output, preferCSSPageSize: true, printBackground: true });
  console.log(`wrote ${output}`);
} finally {
  await browser.close();
}
