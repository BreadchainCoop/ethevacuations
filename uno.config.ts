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
  presets: [ presetUno() ]
})
