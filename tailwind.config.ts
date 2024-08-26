import type { Config } from "tailwindcss";

export default const config: Config = {
  content: [
    "./src/pages/*.{tsx,js}",
    "./src/components/*.{tsx,js}",
    "./src/**.{tsx,js}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
        "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
