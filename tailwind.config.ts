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
        primary: {
          DEFAULT: "#1553F0",
          50:  "#EEF2FF",
          100: "#E0E9FF",
          200: "#C2D4FF",
          300: "#94AFFF",
          400: "#5C82FF",
          500: "#1553F0",
          600: "#0D41CC",
          700: "#0A32A8",
          800: "#082585",
          900: "#061961",
        },
        blue: {
          600: "#1553F0",
          700: "#0D41CC",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
