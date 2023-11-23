import react from '@vitejs/plugin-react';
import * as path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        port: 5173,
        open: true,
    },
    plugins: [react(), visualizer()],
    resolve: {
        alias: {
            '@components': path.resolve(__dirname, './src/components'),
            '@features': path.resolve(__dirname, './src/features'),
            '@pages': path.resolve(__dirname, './src/pages'),
            '@hooks': path.resolve(__dirname, './src/hooks'),
        },
    },
    build: {
        rollupOptions: {
            external: ['./api/**', './src/dev/**'],
        },
    },
});
