import type { L } from './site';

/** Words that belong to the site itself, not to the profile content. */
export const ui = {
  nav: {
    about: { en: 'About', pt: 'Sobre' },
    experience: { en: 'Experience', pt: 'Experiência' },
    stack: { en: 'Stack', pt: 'Stack' },
    projects: { en: 'Projects', pt: 'Projetos' },
    certificates: { en: 'Certificates', pt: 'Certificados' },
    contact: { en: 'Contact', pt: 'Contato' },
  },
  skip: { en: 'Skip to content', pt: 'Pular para o conteúdo' },
  menu: { en: 'Menu', pt: 'Menu' },
  themeToLight: { en: 'Switch to light theme', pt: 'Mudar para o tema claro' },
  themeToDark: { en: 'Switch to dark theme', pt: 'Mudar para o tema escuro' },
  langLabel: { en: 'Language', pt: 'Idioma' },
  current: { en: 'current', pt: 'atual' },
  repos: (pub: number, priv: number | null | undefined) =>
    priv != null
      ? { en: `${pub + priv} repositories, ${priv} private`, pt: `${pub + priv} repositórios, ${priv} privados` }
      : { en: `${pub} public repositories`, pt: `${pub} repositórios públicos` },
  contributions: { en: 'contributions in the last 12 months', pt: 'contribuições nos últimos 12 meses' },
  languages: { en: 'Languages', pt: 'Linguagens' },
  languagesNote: { en: 'by code in public and private repositories', pt: 'por código nos repositórios públicos e privados' },
  languagesNotePublic: { en: 'by code in public repositories', pt: 'por código nos repositórios públicos' },
  activityTitle: { en: 'Contributions', pt: 'Contribuições' },
  viewRepo: { en: 'Repository', pt: 'Repositório' },
  viewPost: { en: 'Read on LinkedIn', pt: 'Ler no LinkedIn' },
  viewCredential: { en: 'View credential', pt: 'Ver credencial' },
  writeMe: { en: 'Send an e-mail', pt: 'Enviar e-mail' },
  updated: { en: 'Data from GitHub, updated', pt: 'Dados do GitHub, atualizados em' },
  footerNote: { en: 'Built with React, Vite and Tailwind. Texts shared with the GitHub profile README.', pt: 'Feito com React, Vite e Tailwind. Textos compartilhados com o README do perfil no GitHub.' },
  close: { en: 'Close', pt: 'Fechar' },
} satisfies Record<string, L | Record<string, L> | ((...a: never[]) => L)>;
