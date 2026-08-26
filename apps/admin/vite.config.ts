import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  nitro: { preset: "vercel" },
  vite: {
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
  },
});
