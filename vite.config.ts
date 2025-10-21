import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  base: '/restaurant-food/', // 👈 nom EXACT de ton repo GitHub sillure-chat-1500kilo.JPG
  plugins: [react()],
})
