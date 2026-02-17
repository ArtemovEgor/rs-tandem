import { defineConfig } from "vite";
import path from "node:path";

export default defineConfig({
  base: "/rs-tandem/",
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/common.scss" as *;`,
      },
    },
  },
  build: {
    outDir: "dist",
  },
  server: {
    port: 3000,
    open: true,
  },
});
