import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  site: "https://varlotta.xyz",
  integrations: [
    tailwind({ applyBaseStyles: false }),
  ],
  markdown: {
    shikiConfig: {
      theme: "one-dark-pro",
      wrap: true,
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5000,
    allowedHosts: true,
  },
  vite: {
    resolve: {
      alias: {
        "@utils": "/src/utils",
        "@i18n": "/src/i18n",
      },
    },
    server: {
      allowedHosts: true,
    },
  },
});
