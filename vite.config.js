import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";


export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server:{
    host: '192.168.50.91',
    port:80,
    proxy:{
      "/user-api": {
        target: "http://127.0.0.1:2887",
        changeOrigin: true,
        ws:true
      },
      "/admin-api": {
        target: "http://127.0.0.1:2887",
        changeOrigin: true,
        ws:true
      }
    }
  }
});
