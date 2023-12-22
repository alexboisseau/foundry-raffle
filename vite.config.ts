import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  root: "client/",
  define: {
    global: "globalThis",
  },
  resolve: {
    alias: {
      process: "process/browser",
      util: "util",
    },
  },
  plugins: [react()],
});
