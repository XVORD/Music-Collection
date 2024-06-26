import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.js',  // Atau './postcss.config.cjs' jika menggunakan CommonJS
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
});
