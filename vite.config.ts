import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// A GitHub user site is served from the domain root, so base stays "/".
export default defineConfig({
  plugins: [react()],
  base: '/',
});
