import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/entries': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
  css: {
    postcss: './postcss.config.js',  // Atau './postcss.config.cjs' jika menggunakan CommonJS
  },
});
