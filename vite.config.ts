// vite.config.ts

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path, { dirname } from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// This is the new, Vercel-compatible configuration
export default defineConfig({
  root: 'client',
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
    // Your Cartographer plugin for non-production is fine
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
        ]
      : []),
  ],
  resolve: {
    // Your alias configuration is correct and stays
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
    },
  },
  // The conflicting 'root' and 'build' properties have been removed.
  // Vercel's UI settings will now control the build process.
});