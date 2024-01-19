import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // 代理规则：将所有 /api 开头的请求代理到 http://localhost:3000
      '/api': {
        target: 'http://149.129.176.52:8080', // 后端 API 服务器地址
        changeOrigin: true, // 需要虚拟主机站点
        rewrite: (path) => path.replace(/^\/api/, '') // 重写请求路径，去除 /api
      },
      // 你可以添加更多的代理规则
    }
  }
})
