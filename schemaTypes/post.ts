import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Artigos do Blog',
  type: 'document',
  fields: [
    defineField({
      name: 'imagemCapa',
      title: 'Imagem de Capa (Thumbnail)',
      type: 'image',
      options: { hotspot: true }
    }),
    defineField({
      name: 'titulo',
      title: 'Título do Artigo',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'URL do Artigo (Slug)',
      type: 'slug',
      options: { source: 'titulo' },
    }),
    defineField({
      name: 'autor',
      title: 'Autor',
      type: 'string',
      options: {
        list: ['Dr. Rui Barbosa', 'Dr. Yuri Bittencourt']
      }
    }),
    defineField({
      name: 'conteudo',
      title: 'Conteúdo do Texto',
      type: 'array',
      of: [
        { type: 'block' },
        // A MÁGICA AQUI: Permite inserir imagens no meio dos parágrafos
        { 
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', type: 'string', title: 'Legenda / Texto Alternativo' }
          ]
        }
      ]
    }),
  ],
})