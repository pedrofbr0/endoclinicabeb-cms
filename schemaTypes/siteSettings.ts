import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'configuracoesSite',
  title: 'Configuracoes do Site',
  type: 'document',
  fields: [
    defineField({
      name: 'logo',
      title: 'Logo da Clinica',
      type: 'image',
      description:
        'Prefira uma imagem quadrada, com boa resolucao e, de preferencia, sem fundo/transparente.',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon do Site',
      type: 'image',
      description:
        'Prefira uma imagem quadrada em pixels, simples e bem legivel em tamanho pequeno. De preferencia use fundo branco ou azul.',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'heroImage',
      title: 'Imagem de Destaque (Topo do Site)',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      logo: 'logo',
      favicon: 'favicon',
      heroImage: 'heroImage',
    },
    prepare(selection) {
      return {
        title: 'Configuracoes do Site',
        media: selection.logo || selection.favicon || selection.heroImage,
      }
    },
  },
})
