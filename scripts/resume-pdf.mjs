// Post-build: print /resume/ to dist/resume.pdf, and capture the social
// card and touch icon, all with the same headless Chromium.
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import { serve } from './serve.mjs';

const server = await serve();
const browser = await chromium.launch();

try {
  const page = await browser.newPage();
  await page.goto(`${server.url}/resume/`, { waitUntil: 'networkidle' });
  await page.emulateMedia({ media: 'print' });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({ path: 'dist/resume.pdf', format: 'Letter', preferCSSPageSize: true, tagged: true, outline: true });
  console.log('resume.pdf written.');

  const card = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  await card.goto(`${server.url}/og/`, { waitUntil: 'networkidle' });
  await card.waitForTimeout(4000); // let the solution curves grow
  await mkdir('dist/og', { recursive: true });
  await card.screenshot({ path: 'dist/og/card.png' });
  console.log('og/card.png written.');

  const icon = await browser.newPage({ viewport: { width: 180, height: 180 } });
  await icon.setContent(
    `<body style="margin:0"><img src="${server.url}/favicon.svg" width="180" height="180" style="display:block"></body>`,
  );
  await icon.waitForLoadState('networkidle');
  await icon.screenshot({ path: 'dist/apple-touch-icon.png' });
  console.log('apple-touch-icon.png written.');
} finally {
  await browser.close();
  server.close();
}
