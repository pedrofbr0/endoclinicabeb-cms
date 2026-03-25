import {defineField, defineType} from 'sanity'

export default defineType({
    name: 'horarioDeAtendimento',
    title: 'Horário de Atendimento',
    type: 'document',
    fields: [
        defineField({
            name: 'diaDaSemana',
            title: 'Dia da Semana',
            type: 'string',
        }),
        defineField({
            name: 'horario',
            title: 'Horário',
            type: 'string',
        }),
    ],
})