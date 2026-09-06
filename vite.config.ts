import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        // Long-lived vendor caching + reasonable initial parse cost.
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('gsap') || id.includes('lenis')) return 'motion'
          if (id.includes('motion') || id.includes('framer')) return 'framer'
          if (id.includes('animejs')) return 'anime'
          if (id.includes('react')) return 'react'
          if (id.includes('vara')) return 'vara'
          return 'vendor'
        },
      },
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'gsap', 'gsap/ScrollTrigger', 'lenis', 'lenis/react', 'motion', 'animejs'],
  },
})
