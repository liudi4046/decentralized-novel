import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// https://vitejs.dev/config/
export default ({ mode }) => {
  // 使用 loadEnv 获取环境变量
  const env = loadEnv(mode, process.cwd(), '');

  return defineConfig({
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: env.VITE_APP_URL, // 使用加载的环境变量
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        },
        // 更多代理规则...
      }
    }
  });
};

