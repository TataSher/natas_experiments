import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": {},
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV ?? "development"),
    "process.env.npm_package_version": JSON.stringify(process.env.npm_package_version ?? "0.0.0"),
    "process.env.npm_package_name": JSON.stringify(process.env.npm_package_name ?? ""),
  },
});