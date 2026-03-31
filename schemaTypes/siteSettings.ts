import {defineField, defineType} from 'sanity'
import {FaviconImageField} from '../components/fields/FaviconImageField'
import {HeroImageField} from '../components/fields/HeroImageField'
import {LogoImageField} from '../components/fields/LogoImageField'

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
        'Use o símbolo da marca ou uma logo compacta, com boa resolução e, de preferência, sem fundo ou com fundo transparente. A prévia abaixo mostra a diagramação real do header.',
      components: {
        field: LogoImageField,
      },
      options: {
        hotspot: {
          previews: [{title: 'Header do site', aspectRatio: 4}],
        },
      },
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon do Site',
      type: 'image',
      group: 'branding',
      description:
        'Prefira uma imagem quadrada em pixels, simples e bem legível em tamanho pequeno. De preferência, use fundo branco ou azul.',
      components: {
        field: FaviconImageField,
      },
      options: {
        hotspot: {
          previews: [{title: 'Favicon', aspectRatio: 1}],
        },
      },
    }),
    defineField({
      name: 'heroImage',
      title: 'Imagem de Destaque (Topo do Site)',
      type: 'image',
      group: 'hero',
      description:
        'Esta imagem aparece no topo do site. Use "Editar foco e recortar" e acompanhe a prévia "Hero do site" para ver a região realmente visível no frontend.',
      components: {
        field: HeroImageField,
      },
      options: {
        hotspot: {
          previews: [{title: 'Hero do site', aspectRatio: 4 / 5}],
        },
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
