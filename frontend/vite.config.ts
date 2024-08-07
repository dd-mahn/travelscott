import { defineConfig } from "vite";
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      png: {
        // https://sharp.pixelplumbing.com/api-output#png
        quality: 50,
      },
      jpeg: {
        // https://sharp.pixelplumbing.com/api-output#jpeg
        quality: 50,
      },
      jpg: {
        // https://sharp.pixelplumbing.com/api-output#jpeg
        quality: 50,
      },
      tiff: {
        // https://sharp.pixelplumbing.com/api-output#tiff
        quality: 50,
      },
    }),
  ],
  resolve: {
    alias: {
      src: "/src",
    },
  },
});
