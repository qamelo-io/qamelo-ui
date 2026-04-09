import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [tailwindcss()],
  resolve: {
    alias: [
      {
        find: "@qamelo-io/ui/styles/globals.css",
        replacement: path.resolve(
          __dirname,
          "../../packages/ui/src/tokens/globals.css",
        ),
      },
      {
        find: "@qamelo-io/ui",
        replacement: path.resolve(
          __dirname,
          "../../packages/ui/src/index.ts",
        ),
      },
    ],
  },
});
