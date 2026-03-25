import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'imagens',
  title: 'Imagens do Site',
  type: 'document',

  fields: [
    defineField({
      name: 'heroImage',
      title: 'Imagem de Destaque',
      type: 'image',
      options: {
        hotspot: true, 
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Texto Alternativo',
        }
      ]
    }),
    // Imagem 2
    defineField({
      name: 'drRuiImage',
      title: 'Imagem do Dr. Rui',
      type: 'image',
      options: { hotspot: true },
    }),
    // Imagem 3
    defineField({
      name: 'drYuriImage',
      title: 'Imagem do Dr. Yuri',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
})
