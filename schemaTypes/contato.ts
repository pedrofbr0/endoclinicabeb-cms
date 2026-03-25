import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'contato',
  title: 'Informações de Contato',
  type: 'document',
  fields: [
    defineField({
      name: 'telefone',
      title: 'Telefone Celular',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'E-mail de Contato',
      type: 'string',
    }),
  ],
})