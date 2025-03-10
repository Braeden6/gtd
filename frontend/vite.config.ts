import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
// import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    // VitePWA({
    //   manifest: {
    //     name: 'GTD Quick Capture',
    //     short_name: 'GTD',
    //     start_url: '/capture',
    //     display: 'standalone',
    //     background_color: '#ffffff',
    //     theme_color: '#ffffff',
    //     description: 'Quick capture for GTD workflow',
    //     icons: [
    //       {
    //         src: '/logo.jpeg',
    //         sizes: '512x512',
    //         type: 'image/jpeg',
    //         purpose: 'any maskable'
    //       }
    //     ]
    //   },
    //   registerType: 'autoUpdate',

    //   devOptions: {
    //     enabled: true
    //   }
    // })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // server: {
  //   allowedHosts: ['desktop']
  // },
})