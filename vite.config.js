import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['assets/*.png'],
      manifest: {
        name: 'lfs Effect',
        short_name: 'lfs Effect',
        description: 'Sculptural braids, knotless styles & salon booking.',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        display_override: ['standalone', 'fullscreen'],
        background_color: '#F6F3EC',
        theme_color: '#171410',
        orientation: 'portrait',
        icons: [
          { src: 'assets/lfs-favicon-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'assets/lfs-favicon-512x512.png', sizes: '512x512', type: 'image/png' },
          { src: 'assets/lfs-favicon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
      },
    }),
  ],
})
