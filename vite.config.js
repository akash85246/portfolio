import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  assetsInclude: ["**/*.glb", "**/*.fbx"],
  server: {
    watch: {
      usePolling: true, 
      interval: 1000,
      ignored: [
        "**/node_modules/**",
        "**/dist/**",
        "**/.git/**",
        "**/*.log",
        "**/.env*",
      ],
    },
  },
});
