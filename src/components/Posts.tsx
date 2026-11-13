import { useEffect, useRef, useState } from 'react';
import { asset, site, type Lang } from '../site';
import { ui } from '../ui';
import { ArrowIcon } from './Icons';
import { Section } from './Section';

/** A picture that opens full size in a dialog. The dialog closes on Escape, on the button or on the backdrop. */
function Zoomable({ src, alt, caption, lang, className }: { src: string; alt: string; caption?: string; lang: Lang; className?: string }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={`focus-ring pressable block w-full overflow-hidden ${className ?? ''}`} aria-label={alt}>
        <img src={src} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.02]" />
      </button>
      <dialog
        ref={ref}
        onClose={() => setOpen(false)}
        onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
        className="m-auto max-h-[92vh] max-w-[min(1100px,94vw)] rounded-panel bg-transparent p-0 backdrop:bg-black/70 backdrop:backdrop-blur-sm"
      >
        <figure className="glass overflow-hidden rounded-panel">
          <img src={src} alt={alt} className="max-h-[80vh] w-full object-contain" />
          <figcaption className="flex items-center justify-between gap-4 px-4 py-3 text-sm">
            <span className="text-ink2">{caption ?? alt}</span>
            <button type="button" onClick={() => setOpen(false)} className="focus-ring pressable rounded-full px-3 py-1 font-mono text-xs text-ink2 hover:text-ink">
              {ui.close[lang]}
            </button>
          </figcaption>
        </figure>
      </dialog>
    </>
  );
}

export function Posts({ lang }: { lang: Lang }) {
  const { posts, screens } = site;
  return (
    <Section id="posts" num={posts.num} title={posts.title[lang]} note={posts.note[lang]}>
      {posts.items.map((p) => (
        <article key={p.id} className="card p-5 sm:p-7">
          <div className="flex items-center justify-between gap-4">
            <span className="rounded-full border border-accent/70 px-3 py-0.5 font-mono text-xs text-accent">{posts.kinds[p.kind]?.[lang] ?? p.kind}</span>
            <span className="font-mono text-xs text-ink3">{p.date[lang]}</span>
          </div>
          <h3 className="mt-5 text-xl font-semibold tracking-[-0.015em] sm:text-2xl">{p.title[lang]}</h3>
          <p className="mt-3 max-w-3xl leading-relaxed text-ink2">{p.text[lang]}</p>
          {posts.items.length === 1 && (
            <ul className="mt-6 grid gap-3 sm:grid-cols-3">
              {screens.items.map((s) => (
                <li key={s.id}>
                  <Zoomable src={asset(s.file)} alt={s.caption[lang]} lang={lang} className="aspect-[4/3] rounded-xl border hairline" />
                  <p className="mt-2 font-mono text-xs text-ink2">{s.caption[lang]}</p>
                </li>
              ))}
            </ul>
          )}
          <a href={p.href} className="focus-ring mt-6 inline-flex items-center gap-1.5 text-sm text-accent hover:underline">
            {ui.viewPost[lang]} <ArrowIcon className="h-4 w-4" />
          </a>
        </article>
      ))}
    </Section>
  );
}

export function Certificates({ lang }: { lang: Lang }) {
  const { certificates } = site;
  return (
    <Section id="certificates" num={certificates.num} title={certificates.title[lang]} note={certificates.note[lang]}>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {certificates.items.map((c) => {
          const kind = certificates.kinds[c.kind]?.[lang] ?? c.kind;
          return (
            <li key={c.id} className="card flex flex-col overflow-hidden">
              <Zoomable src={asset(c.file)} alt={c.title[lang]} caption={`${c.title[lang]} · ${c.issuer}`} lang={lang} className="aspect-[1.59/1] border-b hairline" />
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-semibold tracking-[-0.01em]">{c.title[lang]}</h3>
                  <span className="shrink-0 font-mono text-xs text-ink3">{c.date[lang]}</span>
                </div>
                <p className="mt-1.5 font-mono text-xs text-ink2">{[c.issuer, kind, c.hours ? `${c.hours} h` : ''].filter(Boolean).join(' · ')}</p>
                <a href={c.href} className="focus-ring mt-4 inline-flex w-max items-center gap-1 text-sm text-accent hover:underline">
                  {ui.viewCredential[lang]} <ArrowIcon className="h-3.5 w-3.5" />
                </a>
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
