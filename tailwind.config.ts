// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#000212",
        foreground: "#ffffff",
        primary: "#3b82f6",
        secondary: "#10b981",
        accent: "#8b5cf6",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        shipfast: {
          primary: "#3b82f6",
          secondary: "#10b981",
          accent: "#8b5cf6",
          neutral: "#3d4451",
          "base-100": "#000212",
          info: "#3abff8",
          success: "#36d399",
          warning: "#fbbd23",
          error: "#f87272",
        },
      },
    ],
  },
};

export default config;
