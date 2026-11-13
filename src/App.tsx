import { useLang, useTheme } from './hooks';
import { site } from './site';
import { ui } from './ui';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Stack } from './components/Stack';
import { Activity } from './components/Activity';
import { Building, Built } from './components/Projects';
import { Certificates, Posts } from './components/Posts';
import { Contact, Footer } from './components/Contact';

export function App() {
  const [lang, setLang] = useLang();
  const [dark, toggleTheme] = useTheme();
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-bg">
        {ui.skip[lang]}
      </a>
      <Nav lang={lang} setLang={setLang} dark={dark} toggleTheme={toggleTheme} />
      <main id="main">
        <Hero lang={lang} />
        <About lang={lang} />
        <Experience lang={lang} />
        <Stack lang={lang} />
        {(site.show.heatmap || site.show.languages) && <Activity lang={lang} />}
        <Building lang={lang} />
        <Built lang={lang} />
        <Posts lang={lang} />
        <Certificates lang={lang} />
        <Contact lang={lang} />
      </main>
      <Footer lang={lang} />
    </>
  );
}
