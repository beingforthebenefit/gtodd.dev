import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://gtodd.dev',
  trailingSlash: 'ignore',
  integrations: [sitemap({ filter: (page) => !page.includes('/og/') && !page.includes('/404') })],
  build: { inlineStylesheets: 'auto' },
  // Compression drops the space between a line of text and a tag on the next
  // line ("size\n<em>n</em>" becomes "size<em>n</em>"). Readable copy wins.
  compressHTML: false,
});
