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
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          // use a glob pattern so the plugin picks up files inside the folder
          src: "src/photos/*",
          dest: "./", // copy into the root of dist
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
