import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [tsconfigPaths(), tailwindcss(), tanstackStart(), nitro({ preset: "vercel" }), viteReact()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
    dedupe: ["react", "react-dom", "@tanstack/react-router", "@tanstack/react-start"],
  },
  ssr: {
    external: ["canvas"],
    noExternal: ["@tanstack/react-start", "@tanstack/react-start-server", "@tanstack/start-server-core"],
  },
  environments: {
    nitro: {
      resolve: { noExternal: ["@tanstack/start-server-core"] },
    },
  },
  build: {
    rolldownOptions: { external: ["canvas"] },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://techbridge-backend-rust.vercel.app",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
