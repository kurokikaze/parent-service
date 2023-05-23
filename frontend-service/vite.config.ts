import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// import federation from "@originjs/vite-plugin-federation";
const config = defineConfig({
  plugins: [
      vue({
        template: {
          transformAssetUrls: {
            base: '/src'
          }
        }
      }),
      vueJsx(),
      // federation({
      //     name: 'shipStatus',
      //     filename: 'remoteEntry.js',
      //     // Modules to expose
      //     exposes: {
      //         main: './src/main.ts',
      //     },
      //     shared: ['vue'],
      //     remotes: [
      //       'http://localhost:4173/assets/remoteEntry.js'
      //     ]
      // }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    target: ["chrome89", "edge89", "firefox89", "safari15"],
  },
  // externals: ['vue', 'vue-router'],
})

export default {
  // ...config,
  rollupOptions: {
    input: 'src/main.js',
    format: 'system',
    preserveEntrySignatures: true
  },
  // base: 'http://localhost:4173',
  plugins: [
    vue({
      template: {
        transformAssetUrls: {
          base: '/src'
        }
      }
    }),
    vueJsx(),
  ],
};

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [vue(), vueJsx()],
//   resolve: {
//     alias: {
//       '@': fileURLToPath(new URL('./src', import.meta.url))
//     }
//   },
//   server: {
//     proxy: {
//       "/api": {
//         target: "https://api.spacetraders.io/v2/",
//         changeOrigin: true,
//         secure: false,
//         ws: true,
//       },
//     },
//   },
//   build: {
//     target: 'esnext',
//   }
// })
