import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'informacoesMedicos',
  title: 'Equipe Medica',
  type: 'document',
  groups: [
    {name: 'identity', title: 'Identificacao', default: true},
    {name: 'profile', title: 'Foto e Perfil'},
  ],
  fields: [
    defineField({
      name: 'nome',
      title: 'Nome do Medico',
      type: 'string',
      group: 'identity',
    }),
    defineField({
      name: 'crm',
      title: 'CRM',
      type: 'string',
      group: 'identity',
    }),
    defineField({
      name: 'especialidade',
      title: 'Especialidade',
      type: 'string',
      group: 'identity',
    }),
    defineField({
      name: 'formacao',
      title: 'Formacao',
      type: 'string',
      group: 'identity',
    }),
    defineField({
      name: 'email',
      title: 'E-mail',
      type: 'string',
      group: 'identity',
    }),
    defineField({
      name: 'residencyClinica',
      title: 'Residencia Clinica',
      type: 'string',
      group: 'profile',
    }),
    defineField({
      name: 'residencyEndo',
      title: 'Residencia em Endocrinologia',
      type: 'string',
      group: 'profile',
    }),
    defineField({
      name: 'imagem',
      title: 'Foto do Medico',
      type: 'image',
      group: 'profile',
      description:
        'Use "Editar foco e recortar" para ajustar como a foto aparecera no card da equipe.',
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
