import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                popup: resolve(__dirname, 'src/popup.html'),
                background: resolve(__dirname, 'src/background.js')
            },
            output: {
                entryFileNames: 'assets/[name].js',
                chunkFileNames: 'assets/[name].js',
                assetFileNames: 'assets/[name].[ext]'
            }
        },
        outDir: 'dist',
        emptyOutDir: true
    }
})