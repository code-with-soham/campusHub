import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
  css: {
    // Tailwind v4 uses @tailwind directives, but Vite's lightningcss minifier can't parse them.
    // Disabling lightningcss minification prevents build-time "Unknown at rule: @tailwind".
    lightningcss: {
      minify: false,
    },
  },
});

