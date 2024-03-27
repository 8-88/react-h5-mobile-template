import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path";

export default defineConfig({
    base: 'https://8-88.github.io/react-h5-mobile-template/',
    plugins: [react()],
    server: {
        port: 3000,
        host: '0.0.0.0',
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '~': '/src',
        }
    }
})
