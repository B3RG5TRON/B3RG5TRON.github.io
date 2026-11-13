# b3rg5tron.github.io

Eduardo Bergstron's portfolio: https://b3rg5tron.github.io

The site has no texts of its own. Before every build, `scripts/sync-profile.ts` clones the profile repository
[B3RG5TRON/B3RG5TRON](https://github.com/B3RG5TRON/B3RG5TRON) and reads:

- `src/content.ts`: every text, in Portuguese and English
- `data/github.json`: pinned repositories, contributions and languages, refreshed there every day
- `assets/`: project pictures, certificates and screens
- `design/tokens.json`: language colours

So a change made for the README shows up on the site at the next build.

## Commands

| Goal | Command |
| --- | --- |
| Install | `npm ci` |
| Local server | `npm run dev` |
| Use a local checkout of the profile repository | `PROFILE_DIR=../B3RG5TRON npm run dev` |
| Production build in `dist/` | `npm run build` |

## Publishing

`.github/workflows/deploy.yml` builds and publishes on GitHub Pages on every push to `main`, every day at 06:47 UTC
(after the profile cards refresh) and on demand. In the repository settings, Pages must use "GitHub Actions" as its source.

The `Dockerfile` serves the same build with nginx on `$PORT`, for a later move to Railway.
