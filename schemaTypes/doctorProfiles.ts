import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'informacoesMedicos',
  title: 'Equipe Médica',
  type: 'document',
  groups: [
    {name: 'identity', title: 'Identificação', default: true},
    {name: 'profile', title: 'Foto e Perfil'},
  ],
  fields: [
    defineField({
      name: 'nome',
      title: 'Nome do Médico',
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
      title: 'Formação',
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
      title: 'Residência Clínica',
      type: 'string',
      group: 'profile',
    }),
    defineField({
      name: 'residencyEndo',
      title: 'Residência em Endocrinologia',
      type: 'string',
      group: 'profile',
    }),
    defineField({
      name: 'imagem',
      title: 'Foto do Médico',
      type: 'image',
      group: 'profile',
      description:
        'Use "Editar foco e recortar" para ajustar como a foto aparecerá no card da equipe.',
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
