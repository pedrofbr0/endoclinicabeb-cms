import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'informacoesMedicos',
  title: 'Equipe Medica',
  type: 'document',
  fields: [
    defineField({
      name: 'nome',
      title: 'Nome do Medico',
      type: 'string',
    }),
    defineField({
      name: 'crm',
      title: 'CRM',
      type: 'string',
    }),
    defineField({
      name: 'especialidade',
      title: 'Especialidade',
      type: 'string',
    }),
    defineField({
      name: 'formacao',
      title: 'Formacao',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'E-mail',
      type: 'string',
    }),
    defineField({
      name: 'residencyClinica',
      title: 'Residencia Clinica',
      type: 'string',
    }),
    defineField({
      name: 'residencyEndo',
      title: 'Residencia em Endocrinologia',
      type: 'string',
    }),
    defineField({
      name: 'imagem',
      title: 'Foto do Medico',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'nome',
      subtitle: 'crm',
      media: 'imagem',
    },
  },
})
