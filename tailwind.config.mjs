import typography from "@tailwindcss/typography";
import plugin from "tailwindcss/plugin";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
        cormorant: ["Cormorant Garamond", "Georgia", "serif"],
      },
      colors: {
        skin: {
          base: "rgb(var(--color-text-base) / <alpha-value>)",
          accent: "rgb(var(--color-accent) / <alpha-value>)",
          "accent-hover": "rgb(var(--color-accent-hover) / <alpha-value>)",
          fill: "rgb(var(--color-fill) / <alpha-value>)",
          "card-muted": "rgb(var(--color-card-muted) / <alpha-value>)",
          border: "rgb(var(--color-border) / <alpha-value>)",
        },
      },
    },
  },
  plugins: [
    typography,
    plugin(function ({ addBase }) {
      addBase({
        ":root": {
          "--color-fill": "250 252 252",
          "--color-text-base": "40 39 40",
          "--color-accent": "0 108 172",
          "--color-accent-hover": "0 73 116",
          "--color-card-muted": "241 245 245",
          "--color-border": "227 230 230",
        },
        ".dark": {
          "--color-fill": "33 39 55",
          "--color-text-base": "234 237 243",
          "--color-accent": "100 168 234",
          "--color-accent-hover": "143 195 247",
          "--color-card-muted": "48 53 68",
          "--color-border": "59 70 95",
        },
      });
    }),
  ],
};
