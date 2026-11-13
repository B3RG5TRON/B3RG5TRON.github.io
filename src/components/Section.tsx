import type { ReactNode } from 'react';
import { useReveal } from '../hooks';

/** A numbered section: accent number, title, hairline and an optional note, as in the README. */
export function Section({ id, num, title, note, children }: { id: string; num?: string; title: string; note?: string; children: ReactNode }) {
  const ref = useReveal<HTMLElement>();
  return (
    <section id={id} ref={ref} className="reveal mx-auto max-w-page px-4 py-14 sm:px-6 sm:py-20" aria-labelledby={`${id}-title`}>
      <header className="mb-8 flex items-baseline gap-4">
        {num && <span className="font-mono text-xl text-accent">{num}</span>}
        <h2 id={`${id}-title`} className="text-2xl font-semibold tracking-[-0.02em] sm:text-[28px]">{title}</h2>
        <span className="hairline mx-2 hidden h-px flex-1 border-t sm:block" aria-hidden />
        {note && <span className="ml-auto font-mono text-xs text-ink3 sm:ml-0">{note}</span>}
      </header>
      {children}
    </section>
  );
}
