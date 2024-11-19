import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            // Add alias for Codemirror paths to ensure correct resolution
            'codemirror': 'codemirror/lib/codemirror'
        }
    },
});
