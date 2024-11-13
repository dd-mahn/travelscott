import { defineConfig, UserConfig } from "vite";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import react from "@vitejs/plugin-react";
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      test: /\.(jpe?g|png|gif|tiff|webp|svg|avif)$/i,
      exclude: undefined,
      include: undefined,
      includePublic: true,
      logStats: true,
      ansiColors: true,
      svg: {
        multipass: true,
        plugins: [
          {
            name: "preset-default",
            params: {
              overrides: {
                cleanupNumericValues: false,
                removeViewBox: false, // https://github.com/svg/svgo/issues/1128
              },
            },
          },
          "sortAttrs",
          {
            name: "addAttributesToSVGElement",
            params: {
              attributes: [{ xmlns: "http://www.w3.org/2000/svg" }],
            },
          },
        ],
      },
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
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      }
    })
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/types/',
        'src/**/*.d.ts',
        'src/**/*.test.{ts,tsx}'
      ]
    },
    mockReset: true,
    restoreMocks: true,
    clearMocks: true
  },
  resolve: {
    alias: {
      src: "/src",
    },
  },
  define: {
    'import.meta.env.VITE_API_BASE_URL': JSON.stringify(process.env.VITE_API_BASE_URL),
    'import.meta.env.VITE_NODE_ENV': JSON.stringify(process.env.VITE_NODE_ENV),
  },
  server: {
    headers: {
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    }
  },
  build: {
    sourcemap: process.env.NODE_ENV === 'development',
    minify: process.env.NODE_ENV === 'production',
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom'],
          'animations': ['framer-motion', 'framer-motion-3d'],
          'three': ['three', '@react-three/fiber', '@react-three/drei']
        }
      }
    }
  },
  
} as UserConfig);
