import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => ({
  // Automatically switches base path based on dev vs build
  base: command === "build" ? "/photobyvinay/" : "/",
  plugins: [react()],
  server: {
    port: 3000, // Let's change it back to port 3000 to avoid conflicts
    proxy: {
      "/api/bio": {
        target: "http://localhost:3002",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/bio/, ""),
      },
      "/api/projects": {
        target: "http://localhost:8000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/projects/, ""),
      },
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
        secure: false,
      },
      "/graphql": {
        target: "http://localhost:3001",
        changeOrigin: true,
        secure: false,
      },
      "/images": {
        target: "http://localhost:3001",
        changeOrigin: true,
        secure: false,
      },
    },
  },
}));
