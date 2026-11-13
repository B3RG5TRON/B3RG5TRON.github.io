import type { Config } from 'tailwindcss';

// Colours are CSS variables set per theme in src/index.css, from the profile repository's design tokens.
const v = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: v('bg'),
        surface: v('surface'),
        ink: v('text'),
        ink2: v('text2'),
        ink3: v('text3'),
        accent: v('accent'),
        ok: v('ok'),
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono"', 'ui-monospace', 'monospace'],
      },
      borderRadius: { card: '14px', panel: '18px' },
      maxWidth: { page: '72rem' },
    },
  },
} satisfies Config;
