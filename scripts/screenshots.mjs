// Full-page screenshots of the built site at the sizes that matter:
// desktop, iPad (portrait and landscape) and iPhone. Output: screenshots/.
import { chromium, devices } from 'playwright';
import { mkdir } from 'node:fs/promises';
import { serve } from './serve.mjs';

const targets = [
  { name: 'desktop', options: { viewport: { width: 1440, height: 900 } } },
  { name: 'ipad-portrait', options: devices['iPad Pro 11'] },
  { name: 'ipad-landscape', options: devices['iPad Pro 11 landscape'] },
  { name: 'iphone', options: devices['iPhone 15'] },
  { name: 'iphone-se', options: devices['iPhone SE'] },
];
const paths = (process.argv[2] ?? '/,/resume/').split(',');

const server = await serve();
const browser = await chromium.launch();
await mkdir('screenshots', { recursive: true });

try {
  for (const { name, options } of targets) {
    const context = await browser.newContext(options);
    const page = await context.newPage();
    for (const path of paths) {
      await page.goto(`${server.url}${path}`, { waitUntil: 'networkidle' });
      // Load every lazy image up front, as a reader scrolling down would.
      await page.evaluate(async () => {
        document.querySelectorAll('img[loading="lazy"]').forEach((img) => (img.loading = 'eager'));
        for (let y = 0; y < document.documentElement.scrollHeight; y += window.innerHeight / 2) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 60));
        }
        window.scrollTo(0, 0);
      });
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(2500);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      const slug = path === '/' ? 'home' : path.replaceAll('/', '');
      await page.screenshot({ path: `screenshots/${slug}-${name}.png`, fullPage: true });
      // Also in screen-sized slices, which are easier to review than one
      // very tall image.
      const { width, height } = page.viewportSize();
      const total = await page.evaluate(() => document.documentElement.scrollHeight);
      const slice = Math.round(height * 1.6);
      for (let y = 0, i = 0; y < total; y += slice, i++) {
        await page.screenshot({
          path: `screenshots/${slug}-${name}-${String(i).padStart(2, '0')}.png`,
          fullPage: true,
          clip: { x: 0, y, width, height: Math.min(slice, total - y) },
        });
      }
      console.log(`${slug}-${name}: ${overflow > 0 ? `HORIZONTAL OVERFLOW ${overflow}px` : 'no horizontal overflow'}`);
    }
    await context.close();
  }
} finally {
  await browser.close();
  server.close();
}
