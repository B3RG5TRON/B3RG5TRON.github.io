import { asset, site, type Lang, type Repo } from '../site';
import { ui } from '../ui';
import { ArrowIcon } from './Icons';
import { Section } from './Section';

const METHOD: Record<string, string> = { GET: '#4ade80', POST: '#a78bfa', PUT: '#60a5fa', PATCH: '#60a5fa', DELETE: '#f87171' };

/** Cover for a repository without a screenshot, such as an API: its logo and the endpoints it serves. */
function DrawnCover({ title, logo, endpoints }: { title: string; logo?: string; endpoints?: string[] }) {
  return (
    <div className="flex h-full flex-col justify-between bg-[radial-gradient(120%_120%_at_0%_0%,#1e1b4b_0%,#09090b_55%)] p-4">
      {logo ? <img src={asset(logo)} alt="" className="h-7 w-auto self-start" /> : <span className="font-semibold text-white">{title}</span>}
      <ul className="space-y-1 rounded-lg border border-white/10 bg-black/40 p-3 font-mono text-[11px] text-zinc-300">
        {(endpoints ?? []).slice(0, 4).map((e) => {
          const [m, ...path] = e.split(' ');
          return (
            <li key={e} className="truncate"><span style={{ color: METHOD[m] ?? '#a1a1aa' }}>{m.padEnd(6, ' ')}</span>{path.join(' ')}</li>
          );
        })}
      </ul>
    </div>
  );
}

function RepoCard({ repo, lang }: { repo: Repo; lang: Lang }) {
  const extra = site.projects.details[repo.name];
  const title = extra?.title ?? repo.name.replace(/_/g, ' ');
  const text = extra?.text[lang] ?? repo.description ?? '';
  const stack = extra?.stack ?? (repo.language ? [repo.language.name] : []);
  const when = repo.lastCommitAt ?? repo.pushedAt;
  const year = when ? new Date(when).getUTCFullYear() : null;
  return (
    <a href={repo.url} className="card focus-ring pressable group flex flex-col overflow-hidden hover:border-accent/50">
      <div className="aspect-video overflow-hidden border-b hairline">
        {extra?.image ? (
          <img src={asset(extra.image)} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
        ) : (
          <DrawnCover title={title} logo={extra?.logo} endpoints={extra?.endpoints} />
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-semibold tracking-[-0.01em]">{title}</h3>
          {year && <span className="font-mono text-xs text-ink3">{year}</span>}
        </div>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink2">{text}</p>
        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="truncate font-mono text-[11px] text-ink3">{stack.join(' · ')}</p>
          <span className="inline-flex items-center gap-1 text-xs text-ink3 group-hover:text-accent">
            {ui.viewRepo[lang]} <ArrowIcon className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </a>
  );
}

export function Building({ lang }: { lang: Lang }) {
  const { building } = site;
  return (
    <Section id="projects" num={building.num} title={building.title[lang]}>
      {building.items.map((b) => (
        <article key={b.id} className="card grid overflow-hidden md:grid-cols-[1.1fr_1fr]">
          <div className="aspect-video border-b hairline md:border-b-0 md:border-r">
            <img src={asset(b.image.light)} alt="" className="h-full w-full object-cover dark:hidden" />
            <img src={asset(b.image.dark)} alt="" className="hidden h-full w-full object-cover dark:block" />
          </div>
          <div className="flex flex-col p-6 sm:p-8">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="text-2xl font-semibold tracking-[-0.02em]">{b.name}</h3>
              <span className="font-mono text-xs text-ink3">{b.year}</span>
            </div>
            <p className="mt-3 inline-flex w-max items-center gap-2 rounded-full border border-accent/60 bg-accent/10 px-3 py-1 font-mono text-xs text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
              {b.status[lang]}
            </p>
            <p className="mt-5 leading-relaxed text-ink2">{b.text[lang]}</p>
            <p className="mt-auto pt-6 font-mono text-xs text-ink3">{b.stack.join(' · ')}</p>
          </div>
        </article>
      ))}
    </Section>
  );
}

export function Built({ lang }: { lang: Lang }) {
  const { projects, github } = site;
  return (
    <Section id="built" num={projects.num} title={projects.title[lang]} note={projects.note[lang]}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {github.pinned.map((r) => <RepoCard key={r.name} repo={r} lang={lang} />)}
      </div>
    </Section>
  );
}
