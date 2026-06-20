import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => ({
  // Automatically switches base path based on dev vs build
  base: command === "build" ? "/photobyvinay/" : "/",
  plugins: [react()],
  server: {
    port: 3000, // Let's change it back to port 3000 to avoid conflicts
    proxy: {
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
    },
  },
}));
