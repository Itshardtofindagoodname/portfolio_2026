import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
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
          if (id.includes('framer-motion')) return 'framer-motion'
          if (id.includes('react')) return 'react'
          if (id.includes('vara')) return 'vara'
          return 'vendor'
        },
      },
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'gsap', 'gsap/ScrollTrigger', 'lenis', 'lenis/react'],
  },
})
