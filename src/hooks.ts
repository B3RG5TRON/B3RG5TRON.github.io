import { useCallback, useEffect, useRef, useState } from 'react';
import type { Lang } from './site';

const read = (key: string) => {
  try { return localStorage.getItem(key); } catch { return null; }
};
const write = (key: string, value: string) => {
  try { localStorage.setItem(key, value); } catch { /* private mode: keep the choice for this visit only */ }
};

/** Portuguese for visitors whose browser prefers it, English otherwise. A choice is remembered. */
export function useLang() {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = read('lang');
    if (saved === 'en' || saved === 'pt') return saved;
    return navigator.language?.toLowerCase().startsWith('pt') ? 'pt' : 'en';
  });
  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
    document.title = lang === 'pt' ? 'Eduardo Bergstron · Desenvolvedor Full Stack' : 'Eduardo Bergstron · Full Stack Developer';
  }, [lang]);
  const setLang = useCallback((l: Lang) => { setLangState(l); write('lang', l); }, []);
  return [lang, setLang] as const;
}

/** Follows the system theme until the visitor picks one. */
export function useTheme() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'));
  useEffect(() => {
    const mq = matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e: MediaQueryListEvent) => {
      if (read('theme')) return;
      document.documentElement.classList.toggle('dark', e.matches);
      setDark(e.matches);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  const toggle = useCallback(() => {
    setDark((d) => {
      const next = !d;
      document.documentElement.classList.toggle('dark', next);
      write('theme', next ? 'dark' : 'light');
      return next;
    });
  }, []);
  return [dark, toggle] as const;
}

/** Adds "shown" once the element scrolls into view, for the rise-in effect in index.css. */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) { el.classList.add('shown'); return; }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { el.classList.add('shown'); io.disconnect(); }
    }, { rootMargin: '0px 0px -10% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}
