import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'configuracoesSite',
  title: 'Configurações do Site',
  type: 'document',
  fields: [
    defineField({
      name: 'logo',
      title: 'Logo da Clínica',
      type: 'image',
      options: { hotspot: true }
    }),
    defineField({
      name: 'heroImage',
      title: 'Imagem de Destaque (Topo do Site)',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    // No futuro, dá pra adicionar aqui a "Logo da Clínica", "Favicon", etc.
  ],
  preview: {
    select: {
      logoClinica: 'logo.asset->url',
      heroImage: 'heroImage.asset->url',
    },
    prepare(selecao) {
      return {
        title: 'Configurações do Site'
      }
    }
  }
})
