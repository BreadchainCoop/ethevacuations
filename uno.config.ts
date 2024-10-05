import { defineConfig, presetUno, transformerDirectives, transformerVariantGroup } from 'unocss'

export default defineConfig({
  content: {
    filesystem: [
      './src/components/*.{ts,tsx}',
      './src/index.{ts,tsx}'
    ],
  },
  transformers: [ 
    transformerDirectives(),
    transformerVariantGroup()
  ],
  presets: [ presetUno() ],
  theme: {
    colors: {
      primary: '#0000ff', 
      secondary: '',
      ternary: ''
    },
    breakpoints: {
      sm: '460px',
      md: '840px',
      lg: '1360px'
    }
  }
})
