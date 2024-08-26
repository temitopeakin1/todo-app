import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        serif: ["Inter", "sans-serif"],
      
      },
      colors: {
        primary: "#1A2851",
        background: "#FFFFFF",
        grey: "#D8D5D5",
        button:"#F3F9FA",
        add: "#E53170"
        
      },
      fontWeight: {
        light: "300",
        normal: "450",
        medium: "500",
      },
      lineHeight: {
        "4": "1rem",
        "24": "6rem",
        "30": "7.5rem",

      },
      fontSize: {
        "10": "10px",
        "12": "12px",
        "13": "13px",
        "14": "14px",
        "16": "16px",
        "18": "18px",
        "20": "20px",
        "24": "24px",
        "28": "28px",
        "36": "36px"
      },
    },
  },
  plugins: [],
};
export default config;
