import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: { port: 5173, open: false },
  build: {
    // Split heavy vendor deps into their own chunks so Rollup doesn't build
    // one oversized bundle (keeps memory down on CI like Cloudflare Pages).
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          r3f: ['@react-three/fiber', '@react-three/drei'],
          motion: ['framer-motion', 'gsap', 'lenis'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
})
