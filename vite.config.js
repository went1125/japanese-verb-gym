import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa' // 新增

export default defineConfig({
  plugins: [
    react(),
    VitePWA({ 
      registerType: 'autoUpdate',
      manifest: {
        name: 'Verb Gym',
        short_name: 'VerbGym',
        theme_color: '#0f172a', // bg-slate-900
        icons: [
            {
                src: 'vite.svg', // 之後要換成你的 192x192 icon
                sizes: '192x192',
                type: 'image/svg+xml'
            },
            {
                src: 'vite.svg', // 之後要換成 512x512
                sizes: '512x512',
                type: 'image/svg+xml'
            }
        ]
      }
    })
  ],
  server: {
    host: true
  }
})