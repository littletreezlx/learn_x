import { defineConfig } from 'vite';
import { resolve } from 'path';
import electron from 'vite-plugin-electron/simple';

export default defineConfig({
  root: 'src/renderer',
  plugins: [
    electron({
      main: {
        entry: '../main/index.ts',
        vite: {
          build: {
            outDir: '../../dist-electron',
            rollupOptions: {
              output: {
                entryFileNames: 'main.js',
                format: 'es'
              },
              external: ['electron']
            }
          }
        }
      },
      preload: {
        input: '../preload/index.ts',
        vite: {
          build: {
            outDir: '../../dist-electron',
            rollupOptions: {
              output: {
                entryFileNames: 'preload.js'
              }
            }
          }
        }
      },
      renderer: process.env.NODE_ENV === 'test'
        ? undefined
        : {}
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  server: {
    port: 5173
  },
  build: {
    outDir: '../../dist',
    emptyOutDir: true
  }
});

