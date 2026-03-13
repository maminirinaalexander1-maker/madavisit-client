import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // Importe le plugin

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Ajoute-le ici
  ],
})