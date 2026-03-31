import {defineField, defineType} from 'sanity'

function formatPreviewDate(value?: string) {
  if (!value) return 'Sem data definida'

  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [year, month, day] = value.split('-')
    return `${day}/${month}/${year}`
  }

  return new Date(value).toLocaleDateString('pt-BR')
}

export default defineType({
  name: 'post',
  title: 'Artigos do Blog',
  type: 'document',
  preview: {
    select: {
      title: 'titulo',
      subtitle: 'autor',
      cardMedia: 'imagemCard',
      media: 'imagemCapa',
      useRealDate: 'usarDataReal',
      displayDate: 'dataExibicao',
      createdAt: '_createdAt',
    },
    prepare(selection) {
      const baseDate = selection.useRealDate === false ? selection.displayDate : selection.createdAt
      const dateLabel = formatPreviewDate(baseDate)

      return {
        title: selection.title,
        subtitle: `${selection.subtitle || 'Sem autor'} - ${dateLabel}`,
        media: selection.cardMedia || selection.media,
      }
    },
  },
  fields: [
    defineField({
      name: 'imagemCapa',
      title: 'Imagem de Capa do Artigo',
      type: 'image',
      description:
        'Usada na pagina do artigo e nos compartilhamentos. Use "Editar foco e recortar" para ajustar o enquadramento principal.',
      options: {
        hotspot: {
          previews: [
            {title: '3:4', aspectRatio: 3 / 4},
            {title: 'Square', aspectRatio: 1},
            {title: '16:9', aspectRatio: 16 / 9},
            {title: 'Panorama', aspectRatio: 21 / 9},
          ],
        },
      },
    }),
    defineField({
      name: 'imagemCard',
      title: 'Imagem para os Cards do Blog',
      type: 'image',
      description:
        'Opcional. Use este campo quando a capa principal nao funcionar bem nas miniaturas. Se nada for escolhido aqui, o site usa automaticamente a imagem de capa do artigo.',
      options: {
        hotspot: {
          previews: [{title: '16:9', aspectRatio: 16 / 9}],
        },
      },
    }),
    defineField({
      name: 'titulo',
      title: 'Titulo do Artigo',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'URL do Artigo (Slug)',
      type: 'slug',
      options: {source: 'titulo'},
    }),
    defineField({
      name: 'autor',
      title: 'Autor',
      type: 'string',
      options: {
        list: ['Dr. Rui Barbosa', 'Dr. Yuri Bittencourt'],
      },
    }),
    defineField({
      name: 'usarDataReal',
      title: 'Exibir a data real de publicacao',
      type: 'boolean',
      description:
        'Quando ativo, o site mostra a data real registrada pelo Sanity. Desative para usar uma data ficticia.',
      initialValue: true,
    }),
    defineField({
      name: 'dataExibicao',
      title: 'Data exibida no site',
      type: 'date',
      description:
        'Usada apenas quando a data real estiver desativada. A data real continua registrada internamente pelo Sanity.',
      hidden: ({document}) => document?.usarDataReal !== false,
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (context.document?.usarDataReal === false && !value) {
            return 'Selecione a data que deve aparecer no site.'
          }

          return true
        }),
    }),
    defineField({
      name: 'conteudo',
      title: 'Conteudo do Texto',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Justificado (padrao)', value: 'normal'},
            {title: 'A esquerda', value: 'alignLeft'},
            {title: 'Centralizado', value: 'alignCenter'},
            {title: 'A direita', value: 'alignRight'},
            {title: 'Paragrafo justificado', value: 'justified'},
            {title: 'Introducao em destaque', value: 'lead'},
            {title: 'Titulo de secao', value: 'h2'},
            {title: 'Subtitulo', value: 'h3'},
            {title: 'Citacao', value: 'blockquote'},
          ],
          lists: [
            {title: 'Marcadores', value: 'bullet'},
            {title: 'Numerada', value: 'number'},
          ],
          marks: {
            decorators: [
              {title: 'Negrito', value: 'strong'},
              {title: 'Italico', value: 'em'},
            ],
            annotations: [
              {
                name: 'link',
                title: 'Link',
                type: 'object',
                fields: [
                  defineField({
                    name: 'href',
                    title: 'URL',
                    type: 'url',
                    validation: (Rule) =>
                      Rule.uri({
                        scheme: ['http', 'https', 'mailto', 'tel'],
                      }),
                  }),
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: {hotspot: true},
          fields: [{name: 'alt', type: 'string', title: 'Legenda / Texto Alternativo'}],
        },
        {
          type: 'youtubeEmbed',
        },
      ],
    }),
  ],
})
