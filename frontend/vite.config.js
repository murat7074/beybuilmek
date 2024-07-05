
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       '/api': 'http://localhost:5000'
//     },
//   },
//   build: {
//     outDir: 'dist',
//     rollupOptions: {
//       output: {
//         manualChunks: undefined,
//       },
//     },
//   },
//   // Eğer production modundaysanız ve proxy ihtiyacınız yoksa:
//   // Bu ayarları kullanmanıza gerek kalmayabilir.
//   // base: process.env.NODE_ENV === 'production' ? '/your-base-path/' : '/',
// })





import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api':"http://localhost:5000/"
    },
  },
})
