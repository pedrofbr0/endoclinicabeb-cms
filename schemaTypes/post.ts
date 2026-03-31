import {createElement} from 'react'
import {defineField, defineType} from 'sanity'
import {PostCardImageField} from '../components/fields/PostCardImageField'
import {PostCoverImageField} from '../components/fields/PostCoverImageField'
import {PostBodyInput} from '../components/portableText/PostBodyInput'
import {ContentImageThumbnailMedia} from '../components/previews/ContentImageThumbnailMedia'

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
  groups: [
    {name: 'content', title: 'Conteúdo', default: true},
    {name: 'media', title: 'Imagens'},
    {name: 'publishing', title: 'Publicação'},
  ],
  preview: {
    select: {
      title: 'titulo',
      subtitle: 'autor',
      cardMedia: 'imagemCard',
      media: 'imagemCapa',
      showOnFrontend: 'showOnFrontend',
      useRealDate: 'usarDataReal',
      displayDate: 'dataExibicao',
      createdAt: '_createdAt',
      hideAuthor: 'hideAuthor',
      hideDate: 'hideDate',
    },
    prepare(selection) {
      const baseDate = selection.useRealDate === false ? selection.displayDate : selection.createdAt
      const dateLabel = formatPreviewDate(baseDate)
      const visibilityLabel =
        selection.showOnFrontend === false ? 'Oculto no frontend' : 'Visível no frontend'
      const authorLabel = selection.hideAuthor
        ? 'Autor oculto no frontend'
        : selection.subtitle || 'Sem autor'
      const resolvedDateLabel = selection.hideDate ? 'Data oculta no frontend' : dateLabel

      return {
        title: selection.title,
        subtitle: `${visibilityLabel} \u2022 ${authorLabel} \u2022 ${resolvedDateLabel}`,
        media: selection.cardMedia || selection.media,
      }
    },
  },
  fields: [
    defineField({
      name: 'imagemCapa',
      title: 'Imagem de Capa do Artigo',
      type: 'image',
      group: 'media',
      description:
        'Usada na página do artigo e nos compartilhamentos. Use "Editar foco e recortar" e acompanhe as prévias abaixo para conferir o recorte real.',
      components: {
        field: PostCoverImageField,
      },
      options: {
        hotspot: {
          previews: [
            {title: 'Capa do artigo', aspectRatio: 39 / 16},
            {title: 'Compartilhamento', aspectRatio: 40 / 21},
          ],
        },
      },
    }),
    defineField({
      name: 'imagemCard',
      title: 'Imagem para os Cards do Blog',
      type: 'image',
      group: 'media',
      description:
        'Opcional. Use este campo quando a capa principal não funcionar bem nas miniaturas. Se nada for escolhido aqui, o site usa automaticamente a imagem de capa do artigo.',
      components: {
        field: PostCardImageField,
      },
      options: {
        hotspot: {
          previews: [{title: 'Card do blog', aspectRatio: 16 / 9}],
        },
      },
    }),
    defineField({
      name: 'titulo',
      title: 'Título do Artigo',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'URL do Artigo (Slug)',
      type: 'slug',
      group: 'content',
      options: {source: 'titulo'},
    }),
    defineField({
      name: 'autor',
      title: 'Autor',
      type: 'string',
      group: 'publishing',
      description:
        'Nome do médico vinculado ao artigo. Se a opção "Ocultar autor no frontend" estiver ativada, esse nome continua salvo no CMS, mas não aparece nos cards nem na página do artigo.',
      options: {
        list: ['Dr. Rui Barbosa', 'Dr. Yuri Bittencourt', 'EndoClínica B&B'],
      },
    }),
    defineField({
      name: 'showOnFrontend',
      title: 'Exibir no frontend',
      type: 'boolean',
      group: 'publishing',
      description:
        'Quando ativado, o artigo aparece no site: nos artigos recentes, na listagem do blog e no link direto do artigo. Quando desativado, ele continua salvo no CMS, mas fica oculto no frontend para testes, rascunhos avançados ou publicações futuras.',
      initialValue: true,
    }),
    defineField({
      name: 'hideAuthor',
      title: 'Ocultar autor no frontend',
      type: 'boolean',
      group: 'publishing',
      description:
        'Quando ativado, o nome do autor não aparece no frontend, nem nos cards do blog nem na página do artigo. O vínculo com o médico continua salvo aqui no CMS.',
      initialValue: false,
    }),
    defineField({
      name: 'hideDate',
      title: 'Ocultar data no frontend',
      type: 'boolean',
      group: 'publishing',
      description:
        'Quando ativado, a data não aparece no frontend. Ainda assim, a data real ou a data selecionada continua sendo usada internamente para ordenar os artigos.',
      initialValue: false,
    }),
    defineField({
      name: 'usarDataReal',
      title: 'Exibir a data real de publicação',
      type: 'boolean',
      group: 'publishing',
      description:
        'Quando ativado, o frontend usa a data real registrada pelo Sanity. Desative para escolher manualmente a data que deve ser considerada no site. Mesmo se a data estiver oculta no frontend, esta opção ainda afeta a ordenação dos artigos.',
      initialValue: true,
    }),
    defineField({
      name: 'dataExibicao',
      title: 'Data exibida no site',
      type: 'date',
      group: 'publishing',
      description:
        'Usada apenas quando a data real estiver desativada. Esta data passa a ser a referência usada no frontend e na ordenação dos artigos, mesmo que a opção de ocultar data esteja ativa.',
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
      title: 'Conteúdo do Texto',
      type: 'array',
      group: 'content',
      description:
        'Use o seletor de estilos apenas para a hierarquia do texto. O alinhamento fica separado dentro do próprio editor, e você pode escrever usando atalhos Markdown como #, ##, >, -, 1., ** e *.',
      components: {
        input: PostBodyInput,
      },
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Parágrafo', value: 'normal'},
            {title: 'Introdução em destaque', value: 'lead'},
            {title: 'Título de seção', value: 'h2'},
            {title: 'Subtítulo', value: 'h3'},
            {title: 'Citação', value: 'blockquote'},
          ],
          lists: [
            {title: 'Marcadores', value: 'bullet'},
            {title: 'Numerada', value: 'number'},
          ],
          marks: {
            decorators: [
              {title: 'Negrito', value: 'strong'},
              {title: 'Itálico', value: 'em'},
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
          title: 'Imagem',
          type: 'image',
          options: {hotspot: true},
          fields: [{name: 'alt', type: 'string', title: 'Legenda / Texto Alternativo'}],
          preview: {
            select: {
              alt: 'alt',
              image: 'asset',
              originalFilename: 'asset.originalFilename',
            },
            prepare(selection) {
              return {
                title: 'Imagem no conteúdo',
                subtitle:
                  selection.alt ||
                  selection.originalFilename ||
                  'A imagem será exibida apenas na aba de pré-visualização do artigo.',
                media: createElement(ContentImageThumbnailMedia, {
                  image: selection.image,
                  title: selection.alt || selection.originalFilename || 'Imagem no conteúdo',
                }),
              }
            },
          },
        },
        {
          type: 'youtubeEmbed',
        },
      ],
    }),
  ],
})
