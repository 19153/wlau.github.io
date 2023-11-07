import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path';
import WindiCSS from 'vite-plugin-windicss'
import PostcssPresetEnv from 'postcss-preset-env';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), WindiCSS()],
  base: './',
  css:{
    postcss:{
      plugins:[PostcssPresetEnv()]
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    // port: 5500,
    host: '0.0.0.0'
  }
})
