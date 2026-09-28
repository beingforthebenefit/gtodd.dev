# gtodd.dev

Gerald Todd's site: a slope field on graph paper, then the work.

Built with [Astro](https://astro.build). No UI framework, no CSS framework. The only client-side script is the hero's slope field (`src/scripts/slope-field.ts`), and it pauses when it's off screen and holds still for anyone who prefers reduced motion.

## One data file

`src/data/resume.ts` is the source of truth. Everything below is generated from it, so they can't drift apart:

| Output | What it's for |
| --- | --- |
| `/` | The home page |
| `/resume/` | The résumé as a real web page, one column, parser friendly |
| `/resume.pdf` | That page, printed by headless Chromium at build time |
| `/resume.json` | [JSON Resume](https://jsonresume.org/schema) for tools that want structure |
| `/llms.txt` | A plain summary for AI assistants ([llmstxt.org](https://llmstxt.org)) |
| JSON-LD | schema.org `Person`, `ProfilePage`, `ScholarlyArticle` and `VideoObject` in each page's head |

To update the résumé, edit that file and push. Nothing else.

## Commands

```sh
npm install
npx playwright install chromium   # once, for the PDF and screenshots
npm run dev                        # localhost:4321
npm run build                      # em dash check, type check, build, PDF, social card
npm run shots                      # screenshots of the built site at desktop, iPad and iPhone sizes
```

`npm run build` fails if an em dash appears anywhere in `src/` or `public/`. That's deliberate.

## Deploying

Pushing to `master` runs `.github/workflows/deploy.yml`, which builds the site and publishes `dist/` to GitHub Pages. Pull requests build but don't deploy.

One-time setup:

1. Repository **Settings → Pages → Source**: choose **GitHub Actions** (the old `gh-pages` branch is no longer used).
2. Custom domain `gtodd.dev` stays as is; `public/CNAME` keeps it.
3. Cloudflare Web Analytics is enabled in the Cloudflare dashboard with automatic setup. Because the domain is proxied through Cloudflare, the beacon is injected at the edge; the site's code doesn't include it, so visits aren't counted twice.
4. `geraldtodd.com`: in Cloudflare, add a Redirect Rule for `geraldtodd.com` and `www.geraldtodd.com` that sends a 301 to `https://gtodd.dev/${uri.path}`, keeping the query string. The zone needs a proxied DNS record (an `AAAA` to `100::` works) for the rule to fire. Leave MX records alone.

## License

The code is MIT licensed (see `LICENSE`). The writing, photos and the paper are © Gerald Todd, all rights reserved.
