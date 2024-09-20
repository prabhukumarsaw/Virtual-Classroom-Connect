import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Alias for resolving imports with "@"
      '@': path.resolve(__dirname, './src'),
      // Existing alias for simple-peer
      'simple-peer': 'simple-peer/simplepeer.min.js',
    },
  },
  define: {
    global: {},
  },
});
