import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Ensure the server listens on 0.0.0.0
    port: 8080, // Optional: You can set the port to 3000 or another value
  },
  build: {
    outDir: 'dist',
  },
});
