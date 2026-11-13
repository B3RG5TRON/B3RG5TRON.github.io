import { site, t, type Lang } from '../site';
import { Section } from './Section';

export function Stack({ lang }: { lang: Lang }) {
  const { stack } = site;
  return (
    <Section id="stack" num={stack.num} title={stack.title[lang]}>
      <div className="card divide-y divide-[color:var(--hairline)]">
        {stack.groups.map((g) => (
          <div key={g.label.en} className="grid gap-3 p-5 sm:grid-cols-[180px_1fr] sm:items-center">
            <h3 className="font-mono text-xs uppercase tracking-wider text-ink3">{g.label[lang]}</h3>
            <ul className="flex flex-wrap gap-2">
              {g.items.map((item) => {
                const name = t(item, lang);
                const main = typeof item === 'string' && g.main?.includes(item);
                return (
                  <li key={name} className={`pill ${main ? '!border-accent/60 bg-accent/10 !text-accent' : ''}`}>{name}</li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
