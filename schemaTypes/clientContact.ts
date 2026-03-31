import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'clienteContato',
  title: 'Clientes e Leads',
  type: 'document',
  orderings: [
    {
      title: 'Mais recentes',
      name: 'contactDateDesc',
      by: [{field: 'dataContato', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      title: 'nome',
      subtitle: 'telefone',
      email: 'email',
      status: 'status',
    },
    prepare(selection) {
      const contactLine = [selection.subtitle, selection.email].filter(Boolean).join(' - ')
      const statusLabel = selection.status ? `Status: ${selection.status}` : 'Status não definido'

      return {
        title: selection.title || 'Lead sem nome',
        subtitle: [contactLine, statusLabel].filter(Boolean).join(' - '),
      }
    },
  },
  fields: [
    defineField({
      name: 'nome',
      title: 'Nome completo',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'E-mail',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'telefone',
      title: 'Telefone / WhatsApp',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'telefoneNormalizado',
      title: 'Telefone normalizado',
      type: 'string',
      hidden: true,
      readOnly: true,
    }),
    defineField({
      name: 'mensagem',
      title: 'Mensagem',
      type: 'text',
      rows: 6,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'origem',
      title: 'Origem',
      type: 'string',
      initialValue: 'Formulario do site',
    }),
    defineField({
      name: 'status',
      title: 'Status do atendimento',
      type: 'string',
      initialValue: 'Novo',
      options: {
        list: ['Novo', 'Em contato', 'Agendado', 'Convertido', 'Arquivado'],
      },
    }),
    defineField({
      name: 'dataContato',
      title: 'Data do contato',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'observacoesInternas',
      title: 'Observações internas',
      type: 'text',
      rows: 4,
    }),
  ],
})
