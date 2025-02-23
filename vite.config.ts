import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // <-- Add this
    },
  },
  optimizeDeps: {
    exclude: [
      /* other packages to exclude, but NOT 'lucide-react' */
    ],
  },
});
