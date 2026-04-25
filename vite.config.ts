import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

/** Default base for GitHub Pages project sites: https://user.github.io/repository/ */
const GITHUB_PAGES_BASE = '/portfolio/'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  // Dev server uses /. Production: GitHub Pages via GITHUB_PAGES_BASE, unless overridden.
  // On Vercel (root), set: VITE_BASE_PATH=/
  const base = (env.VITE_BASE_PATH as string | undefined) || (mode === 'development' ? '/' : GITHUB_PAGES_BASE)
  const pwaPath = (base.endsWith('/') ? base : `${base}/`) as string

  return {
    base,
    plugins: [
      vue(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.svg', 'icons/*.png', 'profile-placeholder.svg'],
        manifest: {
          name: 'Boeurn Mnor — Portfolio',
          short_name: 'Boeurn Mnor',
          description:
            'Full Stack Developer portfolio — 100% client-side installable PWA resume for Boeurn Mnor.',
          theme_color: '#0f172a',
          background_color: '#0f172a',
          display: 'standalone',
          orientation: 'portrait-primary',
          start_url: pwaPath,
          scope: pwaPath,
          icons: [
            {
              src: 'icons/pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: 'icons/pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: 'icons/pwa-512x512-maskable.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
          ],
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,jpg,jpeg,svg,woff2,webmanifest}'],
        },
      }),
    ],
  }
})
