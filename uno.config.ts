import { defineConfig, presetUno, presetWebFonts, transformerDirectives } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        sans: {
          name: 'Roboto',
          weights: [100, 200, 300, 400, 500, 600, 700],
        },
        mono: ['Fira Code', 'Fira Mono:100,700'],
      }
    })
  ],
  content: {
    filesystem: [
      './src/components/*.{ts,tsx}',
      './src/elements/*.{ts,tsx}',
      './src/index.{ts,tsx}'
    ],
  },
  theme: {
    colors: {
      primary: process.env.REACT_APP_PRIMARY_COLOR || '#ff7777',
      secondary: process.env.REACT_APP_SECONDARY_COLOR || '#ffd0d0',
      ternary: process.env.REACT_APP_TERNARY_COLOR || '#dd2e44',
      error: '#d80000',
      success: '#02a61a',
      warning: '#dead2e'
    },
    breakpoints: {
      sm: '460px',
      md: '840px',
      lg: '1800px',
      xl: '2200px'
    },
    fontWeight: {
      thin: '100',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    }
  },
  transformers: [
    transformerDirectives()
  ]
})
