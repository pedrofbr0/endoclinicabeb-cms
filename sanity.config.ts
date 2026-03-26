import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import { ptBRLocale } from '@sanity/locale-pt-br'

export default defineConfig({
  name: 'default',
  title: 'endoclinicabeb-cms',

  projectId: 'olc9cotp',
  dataset: 'production',

  plugins: [structureTool(), visionTool(), ptBRLocale({
      title: 'Portuguese (Brazil)',
    })],

  schema: {
    types: schemaTypes,
  },
})
