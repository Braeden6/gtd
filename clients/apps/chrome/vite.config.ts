import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import tanstackRouter from '@tanstack/router-plugin/vite'
import { crx } from '@crxjs/vite-plugin'
import { resolve } from "path"
import manifest from './public/manifest.json'

export default defineConfig({
  plugins: [
    tanstackRouter({ autoCodeSplitting: true }),
    react(),
    tailwindcss(),
    crx({
      manifest,
      contentScripts: {
        injectCss: true,
      }
    })
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@gtd/shared": resolve(__dirname, "../../shared"),
    },
  }
})