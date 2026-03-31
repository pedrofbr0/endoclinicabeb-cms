import {defineField, defineType} from 'sanity'
import {DoctorCardImageField} from '../components/fields/DoctorCardImageField'

export default defineType({
  name: 'informacoesMedicos',
  title: 'Equipe Médica',
  type: 'document',
  groups: [
    {name: 'identity', title: 'Identificação', default: true},
    {name: 'profile', title: 'Foto e Perfil'},
  ],
  preview: {
    select: {
      title: 'nome',
      subtitle: 'crm',
      cardMedia: 'imagemCard',
      media: 'imagem',
    },
    prepare(selection) {
      return {
        title: selection.title,
        subtitle: selection.subtitle,
        media: selection.cardMedia || selection.media,
      }
    },
  },
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
      name: 'imagemCard',
      title: 'Imagem para o card da equipe',
      type: 'image',
      group: 'profile',
      description:
        'Use este campo para controlar exatamente o enquadramento que aparece no card do site. Se nada for escolhido aqui, o card usará a foto principal automaticamente.',
      components: {
        field: DoctorCardImageField,
      },
      options: {
        hotspot: {
          previews: [{title: 'Card do médico', aspectRatio: 16 / 10}],
        },
      },
    }),
    defineField({
      name: 'imagem',
      title: 'Foto principal do médico',
      type: 'image',
      group: 'profile',
      description:
        'Imagem base do perfil. Se nenhuma imagem específica para o card for escolhida acima, o site usará esta foto como fallback.',
      options: {
        hotspot: {
          previews: [
            {title: 'Retrato', aspectRatio: 3 / 4},
            {title: 'Quadrado', aspectRatio: 1},
          ],
        },
      },
    }),
  ],
})
