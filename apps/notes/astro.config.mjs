import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

import { remarkCodeTitle } from './src/plugins/remark-code-title.mjs'

export default defineConfig({
  integrations: [mdx(), react()],
  markdown: {
    remarkPlugins: [remarkCodeTitle],
  },
  server: {
    fs: {
      allow: ['../..'],
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
})
