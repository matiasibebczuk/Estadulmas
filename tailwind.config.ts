import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        sulma: {
          black: "#050505",
          bordo: "#5B0F18",
          verde: "#0F4A2A",
          oro: "#C89A2B",
          blanco: "#F2F2F2"
        }
      },
      boxShadow: {
        sport: "0 18px 50px rgba(0, 0, 0, 0.34)",
        card: "0 12px 34px rgba(0, 0, 0, 0.24)"
      }
    }
  },
  plugins: []
};

export default config;
