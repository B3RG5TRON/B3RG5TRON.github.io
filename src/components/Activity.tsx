import { site, type Lang } from '../site';
import { ui } from '../ui';
import { useReveal } from '../hooks';

const LEVELS = [0.07, 0.3, 0.55, 0.8, 1];

/** Contribution calendar of the last 12 months, one column per week, and the language split. */
export function Activity({ lang }: { lang: Lang }) {
  const ref = useReveal<HTMLDivElement>();
  const { contributions, languages, includesPrivate } = site.github;
  const days = contributions?.days ?? [];
  const max = Math.max(1, ...days.map((d) => d.count));
  const weeks: { date: string; count: number }[][] = [];
  if (days.length) {
    const first = new Date(days[0].date + 'T00:00:00Z').getUTCDay();
    let week: { date: string; count: number }[] = Array.from({ length: first }, () => ({ date: '', count: -1 }));
    for (const d of days) {
      week.push(d);
      if (week.length === 7) { weeks.push(week); week = []; }
    }
    if (week.length) weeks.push(week);
  }
  const level = (c: number) => (c <= 0 ? 0 : Math.min(4, Math.ceil((c / max) * 4)));
  const total = (languages ?? []).reduce((s, l) => s + l.bytes, 0) || 1;
  const langs = (languages ?? []).slice(0, 8);
  const colour = (name: string, c: string | null) => site.languageColours[name] ?? c ?? '#8b8b94';

  return (
    <div ref={ref} className="reveal mx-auto grid max-w-page gap-4 px-4 sm:px-6 lg:grid-cols-[1.6fr_1fr]">
      {site.show.heatmap && contributions && (
        <a href={site.profile.github} className="card focus-ring block min-w-0 p-5 sm:p-6">
          <div className="mb-4 flex items-baseline justify-between gap-4">
            <h3 className="font-semibold">{ui.activityTitle[lang]}</h3>
            <p className="font-mono text-xs text-ink3"><span className="text-ink">{contributions.total}</span> {ui.contributions[lang]}</p>
          </div>
          <div className="overflow-x-auto pb-1">
            <div className="flex w-max gap-[3px]" role="img" aria-label={`${contributions.total} ${ui.contributions[lang]}`}>
              {weeks.map((w, i) => (
                <div key={i} className="flex flex-col gap-[3px]">
                  {w.map((d, j) => (
                    <span
                      key={j}
                      title={d.date ? `${d.date}: ${d.count}` : undefined}
                      className="block h-[11px] w-[11px] rounded-[3px]"
                      style={d.count < 0 ? { visibility: 'hidden' } : { background: `rgb(var(--accent) / ${LEVELS[level(d.count)]})` }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </a>
      )}
      {site.show.languages && langs.length > 0 && (
        <div className="card min-w-0 p-5 sm:p-6">
          <div className="mb-4 flex items-baseline justify-between gap-4">
            <h3 className="font-semibold">{ui.languages[lang]}</h3>
            <p className="text-right font-mono text-[11px] text-ink3">{(includesPrivate ? ui.languagesNote : ui.languagesNotePublic)[lang]}</p>
          </div>
          <div className="flex h-2.5 overflow-hidden rounded-full" aria-hidden>
            {langs.map((l) => (
              <span key={l.name} style={{ width: `${(l.bytes / total) * 100}%`, background: colour(l.name, l.color) }} />
            ))}
          </div>
          <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2.5">
            {langs.map((l) => (
              <li key={l.name} className="flex items-center gap-2 text-sm">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: colour(l.name, l.color) }} aria-hidden />
                <span className="truncate">{l.name}</span>
                <span className="ml-auto font-mono text-xs text-ink3">{((l.bytes / total) * 100).toFixed(1)}%</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
