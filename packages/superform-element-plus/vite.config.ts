import { resolve } from "node:path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import viteDts from "vite-plugin-dts";

export default defineConfig({
  resolve: {
    alias: [
      {
        find: /^superform\/unplugin\/vite$/,
        replacement: resolve(__dirname, "../../src/unplugin/vite.ts"),
      },
      {
        find: /^superform\/sdk$/,
        replacement: resolve(__dirname, "../../src/sdk.ts"),
      },
      {
        find: /^superform$/,
        replacement: resolve(__dirname, "../../src/index.ts"),
      },
    ],
  },
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, "src/index.ts"),
        components: resolve(__dirname, "src/fieldComponents.ts"),
        unplugin: resolve(__dirname, "src/unplugin.ts"),
      },
      formats: ["es"],
      fileName: (_, entryName) => `${entryName}.js`,
    },
    outDir: "lib",
    minify: false,
    rollupOptions: {
      external: ["vue", "unplugin", /^node:/, /^element-plus(?:\/|$)/],
      output: {
        intro: (chunk) =>
          chunk.name === "index" ? 'import "./style.css";' : "",
        chunkFileNames: "[name].js",
      },
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    viteDts({
      entryRoot: resolve(__dirname, "../.."),
      include: ["src", "../../src", "../../types"],
      outDir: "lib",
      rollupTypes: true,
      insertTypesEntry: false,
      copyDtsFiles: true,
    }),
  ],
});
