import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["js-big-decimal"],
  },
  server: {
    host: "0.0.0.0", // Allow access from other devices
    port: 9000, // Optional: specify the port
  },
  build: {
    commonjsOptions: { transformMixedEsModules: true }, // Change
  },
});
