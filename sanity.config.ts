import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {ptBRLocale} from '@sanity/locale-pt-br'
import {defaultDocumentNode} from './documentViews'
import {
  STUDIO_DATASET,
  STUDIO_NAME,
  STUDIO_PROJECT_ID,
  STUDIO_TITLE,
} from './lib/studioConfig'
import {portableTextPlugins} from './portableTextPlugins'

export default defineConfig({
  name: STUDIO_NAME,
  title: STUDIO_TITLE,

  projectId: STUDIO_PROJECT_ID,
  dataset: STUDIO_DATASET,

  plugins: [structureTool({defaultDocumentNode}), visionTool(), ptBRLocale({
      title: 'Portuguese (Brazil)',
    })],

  form: {
    components: {
      portableText: {
        plugins: portableTextPlugins,
      },
    },
  },

  schema: {
    types: schemaTypes,
  },
})
