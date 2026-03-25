import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Artigos do Blog',
  type: 'document',
  fields: [
    defineField({
      name: 'titulo',
      title: 'Título do Artigo',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'URL do Artigo (Slug)',
      type: 'slug',
      options: { source: 'titulo' }, // Gera a URL automaticamente baseada no título
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
      of: [{ type: 'block' }]
    }),
  ],
})