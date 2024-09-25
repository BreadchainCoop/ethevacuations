import type { Config } from "tailwindcss"

export default {
  content: {
    relative: true,
    files: [
      "./src/**/*.{tsx,ts}",
      "./src/*.{tsx,ts}"
    ]
  },
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
} satisfies Config;
