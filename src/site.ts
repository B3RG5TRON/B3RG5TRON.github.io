/** Typed access to src/generated/site.json, written by scripts/sync-profile.ts. */
import raw from './generated/site.json';

export type Lang = 'en' | 'pt';
export type L = Record<Lang, string>;
export type Repo = {
  name: string;
  description: string | null;
  url: string;
  homepage: string | null;
  language: { name: string; color: string | null } | null;
  pushedAt: string | null;
  lastCommitAt?: string | null;
};

type Site = {
  profile: {
    login: string; name: string[]; location: string; email: string; linkedin: string; linkedinHandle: string;
    github: string; company: string; role: L; tagline: L; api: { path: string; fields: Record<Lang, [string, string][]> };
  };
  about: { num: string; title: L; text: L; facts: { label: L; value: L }[] };
  experience: { num: string; title: L; roles: { current?: boolean; period: L; role: L; company: string; detail?: L }[] };
  stack: { num: string; title: L; groups: { label: L; items: (string | L)[]; main?: string[] }[] };
  building: { num: string; title: L; items: { id: string; name: string; year: string; status: L; image: { dark: string; light: string }; text: L; stack: string[] }[] };
  projects: { num: string; title: L; note: L; details: Record<string, { title: string; image?: string; logo?: string; endpoints?: string[]; text: L; stack: string[] }> };
  posts: { num: string; title: L; note: L; kinds: Record<string, L>; items: { id: string; kind: string; href: string; date: L; title: L; text: L }[] };
  screens: { href: string; items: { id: string; file: string; caption: L }[] };
  certificates: { num: string; title: L; note: L; kinds: Record<string, L>; items: { id: string; file: string; href: string; title: L; issuer: string; kind: string; date: L; hours?: number }[] };
  contact: { title: L; text: L; links: { id: string; href: string; title: L; sub: string; live?: boolean }[]; soon: L };
  activity: { months: Record<Lang, string[]>; less: L; more: L };
  show: { heatmap: boolean; activity: boolean; languages: boolean };
  languageColours: Record<string, string>;
  github: {
    fetchedAt: string;
    user: { login: string; publicRepos: number; privateRepos?: number | null; followers: number };
    pinned: Repo[];
    contributions: { total: number; days: { date: string; count: number }[] } | null;
    languages: { name: string; color: string | null; bytes: number }[] | null;
    includesPrivate?: boolean;
  };
};

export const site = raw as unknown as Site;

/** Pictures live in public/assets, copied from the profile repository. */
export const asset = (path: string) => '/' + path.replace(/^\/+/, '');

export const t = (value: string | L, lang: Lang) => (typeof value === 'string' ? value : value[lang]);
