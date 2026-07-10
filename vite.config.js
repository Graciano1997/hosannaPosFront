import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { rootpath } from './src/lib/ip.js'
// https://vite.dev/config/


export default defineConfig({
  plugins: [react()],
  base: rootpath,
  server: {
    host: true,
  }
})
