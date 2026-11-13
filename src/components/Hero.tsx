import type { Lang } from '../site';
import { site } from '../site';
import { ui } from '../ui';
import { GitHubIcon, LinkedInIcon, MailIcon } from './Icons';
import photo480 from '../assets/eduardo-480.webp';
import photo800 from '../assets/eduardo-800.webp';

const fmt = (iso: string, lang: Lang) => {
  const d = new Date(iso);
  return `${d.getUTCDate()} ${site.activity.months[lang][d.getUTCMonth()]} ${d.getUTCFullYear()}`;
};

/** Value of one JSON field, coloured like the README hero: strings, numbers and arrays. */
function JsonValue({ v }: { v: string }) {
  if (v.startsWith('[')) {
    const parts = v.slice(1, -1).split(/,\s*/);
    return (
      <>
        <span className="text-ink3">[</span>
        {parts.map((p, i) => (
          <span key={i}><span className="text-ok">{p}</span>{i < parts.length - 1 && <span className="text-ink3">, </span>}</span>
        ))}
        <span className="text-ink3">]</span>
      </>
    );
  }
  return <span className={v.startsWith('"') ? 'text-ok' : 'text-[#60a5fa]'}>{v}</span>;
}

export function Hero({ lang }: { lang: Lang }) {
  const { profile, github } = site;
  const repos = ui.repos(github.user.publicRepos, github.user.privateRepos)[lang];
  const fields = profile.api.fields[lang];
  return (
    <section id="top" className="relative overflow-hidden">
      {/* Field of light behind the glass panel. Decorative, and still under reduced motion. */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -right-24 top-10 h-[420px] w-[420px] rounded-full bg-[#a78bfa] blur-[110px]" style={{ opacity: 'calc(var(--glow) * 0.55)' }} />
        <div className="absolute right-40 top-56 h-[300px] w-[300px] rounded-full bg-[#60a5fa] blur-[110px]" style={{ opacity: 'calc(var(--glow) * 0.45)' }} />
      </div>
      <div className="relative mx-auto grid max-w-page items-center gap-12 px-4 pb-16 pt-32 sm:px-6 md:grid-cols-[1.15fr_1fr] md:pb-24 md:pt-40">
        <div>
          <p className="mb-6 inline-flex items-center gap-2 font-mono text-xs text-ink3">
            <span className="h-1.5 w-1.5 rounded-full bg-ok" aria-hidden />
            {profile.location}
          </p>
          <h1 className="text-[clamp(2.75rem,8vw,5rem)] font-semibold leading-[0.98] tracking-[-0.035em]">
            {profile.name[0]}
            <br />
            <span className="text-ink2">{profile.name[1]}</span>
          </h1>
          <p className="mt-6 text-lg text-ink">
            {profile.role[lang]} <span className="text-ink3">@</span> <span className="text-accent">{profile.company}</span>
          </p>
          <p className="mt-3 max-w-xl text-[17px] leading-relaxed text-ink2">{profile.tagline[lang]}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={profile.linkedin} className="focus-ring pressable inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-bg hover:opacity-90">
              <LinkedInIcon className="h-4 w-4" /> LinkedIn
            </a>
            <a href={profile.github} className="focus-ring pressable glass inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold">
              <GitHubIcon className="h-4 w-4" /> GitHub
            </a>
            <a href={`mailto:${profile.email}`} className="focus-ring pressable glass inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold">
              <MailIcon className="h-4 w-4" /> E-mail
            </a>
          </div>
          <p className="mt-8 font-mono text-xs text-ink3">{repos} · {ui.updated[lang]} {fmt(github.fetchedAt, lang)}</p>
        </div>

        {/* Portrait with the API panel floating over its lower edge, like a sheet over content. */}
        <div className="w-full min-w-0 md:ml-auto md:max-w-sm">
          <figure className="mx-auto w-64 overflow-hidden rounded-panel sm:w-72 md:w-full hairline border bg-surface shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]">
            <img
              src={photo800}
              srcSet={`${photo480} 480w, ${photo800} 800w`}
              sizes="(min-width: 768px) 24rem, 18rem"
              width={800}
              height={1000}
              alt={ui.photoAlt[lang]}
              fetchPriority="high"
              className="aspect-[4/5] w-full object-cover object-top"
            />
          </figure>
          <div className="glass glass-thick relative -mt-12 rounded-panel p-5 sm:p-6 md:-mt-16 lg:-ml-16" role="img" aria-label={fields.map(([k, v]) => `${k}: ${v.replace(/"/g, '')}`).join(', ')}>
            <div className="mb-4 flex items-center gap-2 font-mono text-xs">
              <span className="rounded-md bg-ok/15 px-2 py-0.5 text-ok">GET</span>
              <span className="text-ink2">{profile.api.path}</span>
              <span className="ml-auto text-ink3">200 OK</span>
            </div>
            <pre className="overflow-x-auto font-mono text-[13px] leading-7 sm:text-sm">
              <span className="text-ink3">{'{'}</span>
              {'\n'}
              {fields.map(([k, v], i) => (
                <span key={k}>
                  {'  '}<span className="text-accent">"{k}"</span><span className="text-ink3">: </span><JsonValue v={v} />
                  {i < fields.length - 1 && <span className="text-ink3">,</span>}
                  {'\n'}
                </span>
              ))}
              <span className="text-ink3">{'}'}</span>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
