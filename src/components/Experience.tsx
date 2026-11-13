import { site, type Lang } from '../site';
import { ui } from '../ui';
import { Section } from './Section';

export function Experience({ lang }: { lang: Lang }) {
  const { experience } = site;
  return (
    <Section id="experience" num={experience.num} title={experience.title[lang]}>
      <ol className="relative ml-1.5 border-l hairline">
        {experience.roles.map((r) => (
          <li key={r.period.en} className="relative pb-9 pl-7 last:pb-0">
            <span
              aria-hidden
              className={`absolute -left-[5px] top-[7px] h-[9px] w-[9px] rounded-full ${r.current ? 'bg-accent ring-4 ring-accent/20' : 'bg-ink3/60'}`}
            />
            <p className="font-mono text-xs text-ink3">
              {r.period[lang]}
              {r.current && <span className="ml-2 rounded-full border border-accent/50 px-2 py-0.5 text-accent">{ui.current[lang]}</span>}
            </p>
            <h3 className="mt-1.5 text-lg font-semibold tracking-[-0.01em]">{r.role[lang]}</h3>
            <p className="text-ink2">{r.company}</p>
            {r.detail && <p className="mt-2 max-w-3xl leading-relaxed text-ink2">{r.detail[lang]}</p>}
          </li>
        ))}
      </ol>
    </Section>
  );
}
