// import path from "path";
// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"), // <-- Add this
//     },
//   },
//   optimizeDeps: {
//     exclude: [
//       /* other packages to exclude, but NOT 'lucide-react' */
//     ],
//   },
// });

import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy"; // Import the plugin

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      // Add the plugin configuration
      targets: [
        {
          src: path.resolve(__dirname, "src/photos"),
          dest: "./photos", // Copies to the 'photos' folder in dist
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    exclude: [
      /* other packages to exclude, but NOT 'lucide-react' */
    ],
  },
});
