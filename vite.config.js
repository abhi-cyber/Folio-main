import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks: {
          gsap: ['gsap', '@gsap/react', 'lenis'],
        },
      },
    },
  },
});
