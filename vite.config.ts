import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  optimizeDeps: {
    exclude: [
      /* other packages to exclude, but NOT 'lucide-react' */
    ],
  },
});
