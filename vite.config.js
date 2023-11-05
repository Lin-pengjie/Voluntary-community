import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  //配置路径别名
  resolve:{
    alias:{
      '@': new URL('./src', import.meta.url).pathname,
      '@f':new URL('./src/Foreground', import.meta.url).pathname,
      '@b':new URL('./src/Backstage', import.meta.url).pathname
    }
  }
})
