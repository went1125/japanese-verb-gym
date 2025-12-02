import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa' // 新增

export default defineConfig({
  plugins: [
    react(),
    VitePWA({ 
      registerType: 'autoUpdate',
      manifest: {
        name: 'Doushi Gym: Japanese Workout',
        short_name: 'Doushi Gym',
        description: '日文動詞與文法肌肉記憶訓練',
        theme_color: '#0f172a',
        background_color: '#0f172a',
        display: 'standalone',
        icons: [
            {
                src: 'tango_gym.png', // 之後要換成你的 192x192 icon
                sizes: '192x192',
                type: 'image/svg+xml'
            },
            {
                src: 'tango_gym.png', // 之後要換成 512x512
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