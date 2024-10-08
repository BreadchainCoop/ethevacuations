import { defineConfig, presetUno, presetWebFonts, transformerDirectives, transformerVariantGroup } from 'unocss'

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
      './src/index.{ts,tsx}'
    ],
  },
  theme: {
    colors: {
      primary: '#ff7777',
      secondary: '#ffd0d0',
      ternary: '#dd2e44',
      input: '#f5f5f5'
    },
    breakpoints: {
      sm: '460px',
      md: '840px',
      lg: '1360px'
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
    transformerDirectives(), 
    transformerVariantGroup() 
  ],
})
