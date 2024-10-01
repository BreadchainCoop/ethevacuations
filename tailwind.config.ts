import type { Config } from "tailwindcss"

export default {
  content: {
    relative: true,
    files: [
      './src/components/*.{tsx,ts}',
      './src/*.{tsx,ts}'
    ]
  },
  theme: {
    extend: {
      screens: {
        xs: '445px',
        sm: '576px',
        md: '960px',
        lg: '1440px'
      },
      colors: {
        primary: '#ff7777',
        secondary: '#ffd0d0',
        ternary: '#dd2e44',
        input: '#f5f5f5'
      }
    }
  },
  plugins: [],
} satisfies Config;
