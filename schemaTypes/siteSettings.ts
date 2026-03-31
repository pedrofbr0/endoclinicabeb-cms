import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'configuracoesSite',
  title: 'Configurações do Site',
  type: 'document',
  groups: [
    {name: 'branding', title: 'Marca', default: true},
    {name: 'hero', title: 'Imagem Principal'},
  ],
  fields: [
    defineField({
      name: 'logo',
      title: 'Logo da Clínica',
      type: 'image',
      group: 'branding',
      description:
        'Prefira uma imagem quadrada, com boa resolução e, de preferência, sem fundo/transparente.',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon do Site',
      type: 'image',
      group: 'branding',
      description:
        'Prefira uma imagem quadrada em pixels, simples e bem legível em tamanho pequeno. De preferência, use fundo branco ou azul.',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'heroImage',
      title: 'Imagem de Destaque (Topo do Site)',
      type: 'image',
      group: 'hero',
      description:
        'Essa imagem aparece no topo do site em destaque. Use "Editar foco e recortar" para garantir um bom enquadramento no desktop e no mobile.',
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
        title: 'Configurações do Site',
        media: selection.logo || selection.favicon || selection.heroImage,
      }
    },
  },
})
