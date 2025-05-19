import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


const IP = "192.168.64.125";
const PORT = 5173;

export default defineConfig({
  server: {
    host: true,
    hmr: {
      host: IP,
      port: PORT,
    },
    cors: true,
    origin: 'http://' + IP + ':' + PORT
  },
  plugins: [
    react(),
    tailwindcss({
      config: {
        content: ['./src/**/*.{js,jsx,ts,tsx}'],
        theme: {
          extend: {},
        },
        plugins: [],
      },
    }),
  ],
})
