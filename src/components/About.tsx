import { site, type Lang } from '../site';
import { Section } from './Section';

export function About({ lang }: { lang: Lang }) {
  const { about } = site;
  return (
    <Section id="about" num={about.num} title={about.title[lang]}>
      <p className="max-w-3xl text-lg leading-relaxed text-ink2 sm:text-xl sm:leading-relaxed">{about.text[lang]}</p>
      <dl className="mt-10 grid gap-4 sm:grid-cols-2">
        {about.facts.map((f) => (
          <div key={f.label.en} className="card p-5">
            <dt className="font-mono text-xs text-accent">→ {f.label[lang]}</dt>
            <dd className="mt-2 leading-relaxed text-ink">{f.value[lang]}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
