import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Enables Jest-like global functions (e.g., `describe`, `it`, `expect`)
    environment: 'jsdom', // Simulates a browser environment
    setupFiles: './vitest.setup.ts', // Optional: Global setup file
  },
});
