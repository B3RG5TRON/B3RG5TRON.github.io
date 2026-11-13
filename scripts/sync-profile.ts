/**
 * Pulls texts, GitHub data and pictures from the profile repository (B3RG5TRON/B3RG5TRON),
 * so the README and the site always say the same thing. Runs before every dev server and build.
 *
 * PROFILE_DIR=/path/to/B3RG5TRON uses a local checkout instead of cloning.
 */
import { execFileSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const root = resolve(import.meta.dirname, '..');
const profileDir = process.env.PROFILE_DIR ? resolve(process.env.PROFILE_DIR) : resolve(root, '.profile');

if (!process.env.PROFILE_DIR) {
  rmSync(profileDir, { recursive: true, force: true });
  execFileSync('git', ['clone', '--depth', '1', '--quiet', 'https://github.com/B3RG5TRON/B3RG5TRON.git', profileDir], { stdio: 'inherit' });
}

const content = await import(pathToFileURL(resolve(profileDir, 'src/content.ts')).href);
const github = JSON.parse(readFileSync(resolve(profileDir, 'data/github.json'), 'utf8'));
const tokens = JSON.parse(readFileSync(resolve(profileDir, 'design/tokens.json'), 'utf8'));

// Everything the site reads, in one file. Functions (formatDate) are left out.
const site = {
  profile: content.profile,
  about: content.about,
  experience: content.experience,
  stack: content.stack,
  building: content.building,
  projects: content.projects,
  posts: content.posts,
  screens: content.screens,
  certificates: content.certificates,
  contact: content.contact,
  activity: content.activity,
  show: content.show,
  languageColours: tokens.language ?? {},
  github,
  syncedAt: new Date().toISOString(),
};

mkdirSync(resolve(root, 'src/generated'), { recursive: true });
writeFileSync(resolve(root, 'src/generated/site.json'), JSON.stringify(site, null, 2));

const assets = resolve(root, 'public/assets');
rmSync(assets, { recursive: true, force: true });
if (existsSync(resolve(profileDir, 'assets'))) cpSync(resolve(profileDir, 'assets'), assets, { recursive: true });

console.log(`Synced ${github.pinned.length} pinned repositories, ${content.certificates.items.length} certificates and the profile assets.`);
