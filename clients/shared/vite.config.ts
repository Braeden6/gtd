import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'GTDShared',
      fileName: (format) => `shared.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    },
    sourcemap: true,
    minify: false
  },
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      include: ['src/**/*', 'components/**/*']
    })
  ]
});
