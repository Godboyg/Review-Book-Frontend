import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy :{
      '/api' : {
        target : "https://review-books-8m45.onrender.com",
        // target : "http://localhost:5000",
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  plugins: [react(),
    tailwindcss(),
  ],
})
