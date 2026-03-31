import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'contato',
  title: 'Informações de Contato',
  type: 'document',
  fields: [
    defineField({name: 'telefone', title: 'Telefone Celular / WhatsApp', type: 'string'}),
    defineField({name: 'email', title: 'E-mail de Contato', type: 'string'}),
    defineField({
      name: 'logradouro',
      title: 'Logradouro',
      type: 'string',
    }),
    defineField({
      name: 'numero',
      title: 'Número',
      type: 'string',
    }),
    defineField({
      name: 'bairro',
      title: 'Bairro',
      type: 'string',
    }),
    defineField({
      name: 'cidade',
      title: 'Cidade',
      type: 'string',
    }),
    defineField({
      name: 'estado',
      title: 'Estado',
      type: 'string',
    }),
    defineField({
      name: 'cep',
      title: 'CEP',
      type: 'string',
    }),
    defineField({
      name: 'complemento',
      title: 'Complemento',
      type: 'string',
    }),
    defineField({name: 'instagram', title: 'Link do Instagram', type: 'url'}),
    defineField({name: 'facebook', title: 'Link do Facebook', type: 'url'}),
    defineField({name: 'linkedin', title: 'Link do LinkedIn', type: 'url'}),
    defineField({
      name: 'horarios',
      title: 'Horários de Atendimento',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'dia', title: 'Dias (Ex.: Terça-feira)', type: 'string'},
            {name: 'horas', title: 'Horários (Ex.: 8h às 12h e 15h às 19h)', type: 'string'},
          ],
          preview: {
            select: {title: 'dia', subtitle: 'horas'},
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      selectedPhone: 'telefone',
      selectedEmail: 'email',
    },
    prepare(selection) {
      return {
        title: 'Dados Oficiais da Clínica',
        subtitle: `${selection.selectedPhone || ''} | ${selection.selectedEmail || ''}`,
      }
    },
  },
})
