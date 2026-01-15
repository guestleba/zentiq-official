import type { Config } from "tailwindcss";

const config: Config = {
  // AQUI ESTÁ O SEGREDO: Adicionei todas as pastas possíveis
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}", // Redundância para garantir
  ],
  theme: {
    extend: {
      colors: {
        zentiq: {
          dark: "#0a192f",
          light: "#112240",
          neon: "#64ffda",
          text: "#8892b0",
          white: "#e6f1ff",
        }
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;