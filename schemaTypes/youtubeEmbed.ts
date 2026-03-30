import {defineField, defineType} from 'sanity'

function extractYouTubeId(url?: string) {
  if (!url) return ''

  try {
    const parsedUrl = new URL(url)

    if (parsedUrl.hostname.includes('youtu.be')) {
      return parsedUrl.pathname.replace('/', '')
    }

    if (parsedUrl.hostname.includes('youtube.com')) {
      if (parsedUrl.pathname === '/watch') {
        return parsedUrl.searchParams.get('v') || ''
      }

      const segments = parsedUrl.pathname.split('/').filter(Boolean)
      return segments[segments.length - 1] || ''
    }
  } catch {
    return ''
  }

  return ''
}

export default defineType({
  name: 'youtubeEmbed',
  title: 'Video do YouTube',
  type: 'object',
  fields: [
    defineField({
      name: 'url',
      title: 'Link do video',
      type: 'url',
      validation: (Rule) =>
        Rule.required().custom((value) => {
          const videoId = extractYouTubeId(value)
          return videoId ? true : 'Informe um link valido do YouTube.'
        }),
    }),
    defineField({
      name: 'titulo',
      title: 'Titulo do video',
      type: 'string',
      description: 'Opcional. Ajuda na organizacao do conteudo e acessibilidade no site.',
    }),
  ],
  preview: {
    select: {
      title: 'titulo',
      url: 'url',
    },
    prepare(selection) {
      const videoId = extractYouTubeId(selection.url)
      return {
        title: selection.title || 'Video do YouTube',
        subtitle: videoId ? `YouTube - ${videoId}` : selection.url,
      }
    },
  },
})
