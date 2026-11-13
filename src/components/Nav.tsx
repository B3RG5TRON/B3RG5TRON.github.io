import { useEffect, useState } from 'react';
import type { Lang } from '../site';
import { ui } from '../ui';
import { MoonIcon, SunIcon } from './Icons';

const items = ['about', 'experience', 'stack', 'projects', 'certificates', 'contact'] as const;

/** Floating glass bar: section links, language and theme. Content scrolls underneath it. */
export function Nav({ lang, setLang, dark, toggleTheme }: { lang: Lang; setLang: (l: Lang) => void; dark: boolean; toggleTheme: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4">
      <nav
        aria-label={lang === 'pt' ? 'Seções' : 'Sections'}
        className={`mx-auto flex max-w-page items-center gap-2 rounded-full px-3 py-2 transition-[background,box-shadow] duration-300 sm:px-4 ${scrolled ? 'glass' : 'border border-transparent'}`}
      >
        <a href="#top" className="focus-ring pressable rounded-full px-2 py-1 font-mono text-sm text-ink">EB<span className="text-accent">.</span></a>
        <ul className="mx-auto hidden items-center gap-1 md:flex">
          {items.map((id) => (
            <li key={id}>
              <a href={`#${id}`} className="focus-ring pressable rounded-full px-3 py-1.5 text-sm text-ink2 hover:text-ink">{ui.nav[id][lang]}</a>
            </li>
          ))}
        </ul>
        <div className="ml-auto flex items-center gap-1 md:ml-0" role="group" aria-label={ui.langLabel[lang]}>
          {(['pt', 'en'] as Lang[]).map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLang(l)}
              aria-pressed={lang === l}
              className={`focus-ring pressable rounded-full px-2.5 py-1 font-mono text-xs uppercase ${lang === l ? 'bg-accent/15 text-accent' : 'text-ink3 hover:text-ink'}`}
            >
              {l}
            </button>
          ))}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={dark ? ui.themeToLight[lang] : ui.themeToDark[lang]}
            title={dark ? ui.themeToLight[lang] : ui.themeToDark[lang]}
            className="focus-ring pressable ml-1 grid h-8 w-8 place-items-center rounded-full text-ink2 hover:text-ink"
          >
            {dark ? <SunIcon className="h-[18px] w-[18px]" /> : <MoonIcon className="h-[18px] w-[18px]" />}
          </button>
        </div>
      </nav>
    </header>
  );
}
