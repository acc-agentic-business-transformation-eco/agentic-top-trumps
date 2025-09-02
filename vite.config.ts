import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Set base to the repository name for GitHub Pages project site
export default defineConfig({
  base: '/agentic-top-trumps/',
  plugins: [react()],
  server: {
    open: true,
  },
});
