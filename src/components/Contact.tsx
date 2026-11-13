import { site, type Lang } from '../site';
import { ui } from '../ui';
import { useReveal } from '../hooks';
import { GitHubIcon, GlobeIcon, LinkedInIcon, MailIcon } from './Icons';

const ICON = { linkedin: LinkedInIcon, github: GitHubIcon, site: GlobeIcon } as Record<string, typeof GitHubIcon>;

export function Contact({ lang }: { lang: Lang }) {
  const ref = useReveal<HTMLElement>();
  const { contact, profile } = site;
  // The site itself is the portfolio, so its own card is left out here.
  const links = contact.links.filter((l) => l.id !== 'site');
  return (
    <section id="contact" ref={ref} className="reveal mx-auto max-w-page px-4 py-14 sm:px-6 sm:py-20">
      <div className="card relative overflow-hidden p-7 sm:p-12">
        <div aria-hidden className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full bg-[#a78bfa] blur-[100px]" style={{ opacity: 'calc(var(--glow) * 0.5)' }} />
        <div className="relative flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-semibold tracking-[-0.025em] sm:text-4xl">{contact.title[lang]}</h2>
            <p className="mt-3 max-w-md text-lg leading-relaxed text-ink2">{contact.text[lang]}</p>
          </div>
          <a href={`mailto:${profile.email}`} className="focus-ring pressable glass inline-flex items-center gap-2 self-start rounded-full px-5 py-3 font-mono text-sm md:self-auto">
            <MailIcon className="h-4 w-4 text-accent" />
            <span className="sr-only">{ui.writeMe[lang]}: </span>
            {profile.email}
          </a>
        </div>
      </div>
      <ul className="mt-4 grid gap-4 sm:grid-cols-2">
        {links.map((l) => {
          const Icon = ICON[l.id] ?? GlobeIcon;
          return (
            <li key={l.id}>
              <a href={l.href} className="card focus-ring pressable flex items-center gap-4 p-5 hover:border-accent/50">
                <span className={`grid h-11 w-11 place-items-center rounded-xl border hairline bg-ink/[0.04] ${l.id === 'linkedin' ? 'text-[#0a66c2] dark:text-[#3b8fe0]' : 'text-ink'}`}>
                  <Icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-semibold">{l.title[lang]}</span>
                  <span className="block font-mono text-xs text-ink2">{l.sub}</span>
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export function Footer({ lang }: { lang: Lang }) {
  return (
    <footer className="mx-auto flex max-w-page flex-col gap-2 px-4 pb-12 pt-4 font-mono text-xs text-ink3 sm:flex-row sm:justify-between sm:px-6">
      <p>© {new Date().getFullYear()} Eduardo Bergstron · Porto Alegre, BR</p>
      <p>{ui.footerNote[lang]}</p>
    </footer>
  );
}
