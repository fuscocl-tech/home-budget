import { defineConfig } from 'vite';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  root: 'src',
  base: './',   // relative paths so Capacitor file:// URLs work
  publicDir: resolve(__dirname, 'public'),
  build: {
    outDir: resolve(__dirname, 'www'),
    emptyOutDir: true,
    target: 'es2020',
    cssCodeSplit: false,
    sourcemap: true,
    rollupOptions: {
      input: resolve(__dirname, 'src/index.html'),
    },
  },
  server: {
    port: 5173,
    open: false,
  },
});
