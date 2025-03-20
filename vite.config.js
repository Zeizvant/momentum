import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  base: 'https://github.com/Zeizvant/momentum',
  plugins: [
      react(),
      tailwindcss(),
      svgr(),
  ],
    resolve: {
        alias: {
            src: path.resolve(__dirname, './src'),
        },
    },
})
