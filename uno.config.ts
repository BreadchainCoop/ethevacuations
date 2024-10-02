import { defineConfig, presetUno } from 'unocss'

export default defineConfig({
  content: {
    filesystem: [
      './src/components/*.{ts,tsx}',
      './src/index.{ts,tsx}'
    ],
  },
  presets: [
    presetUno(),
  ],
})
