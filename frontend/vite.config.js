import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: { alias: { "@": path.resolve(import.meta.dirname, "src") } },
  // Same-origin i dev: browseren taler kun med Vite, som videresender /api til PHP
  server: { proxy: { "/api": "http://localhost:8000" } },
});
