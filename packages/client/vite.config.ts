import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/game",
  server: {
    port: 10011,
    proxy: {
      "/games": {
        target: "http://localhost:9002", // 后端地址
        changeOrigin: true, // 修改请求头中的 origin
        rewrite: (path) => {
          const nowPath = path.replace(/^\/games/, "/games");
          return nowPath;
        }, // 可选，保留 /api 前缀
      },
      "/socket.io": {
        target: "http://localhost:9002", // 后端地址
        changeOrigin: true, // 修改请求头中的 origin
        ws: true,
        rewrite: (path) => {
          const nowPath = path.replace(/^\/socket.io/, "/socket.io");
          return nowPath;
        }, // 可选，保留 /api 前缀
      },
    },
  },
});
