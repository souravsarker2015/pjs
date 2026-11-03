import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],

  server: {
    port: 2802,
  },
  preview: {
    port: 2802,
  },
});
