import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ command }) => ({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
  },
  base: command === 'build' ? '/UI-KIT/' : '/', // فقط برای GitHub Pages
  build: command === 'build' ? {
    lib: {
      entry: path.resolve(__dirname, 'src/components/index.jsx'), // 🔹 ساخت پکیج از این مسیر
      name: 'UIKit',
      formats: ['es', 'cjs', 'umd'],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  } : undefined, // 🔹 در حالت توسعه نیازی به این تنظیمات نیست
}));
