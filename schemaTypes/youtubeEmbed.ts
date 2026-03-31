import {createElement} from 'react'
import {defineField, defineType} from 'sanity'
import {YouTubeThumbnailMedia} from '../components/previews/YouTubeThumbnailMedia'

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
  title: 'Vídeo do YouTube',
  type: 'object',
  fields: [
    defineField({
      name: 'url',
      title: 'Link do vídeo',
      type: 'url',
      validation: (Rule) =>
        Rule.required().custom((value) => {
          const videoId = extractYouTubeId(value)
          return videoId ? true : 'Informe um link válido do YouTube.'
        }),
    }),
    defineField({
      name: 'titulo',
      title: 'Título do vídeo',
      type: 'string',
      description: 'Opcional. Ajuda na organização do conteúdo e na acessibilidade no site.',
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
        title: selection.title || 'Vídeo do YouTube',
        subtitle: videoId ? `YouTube - ${videoId}` : selection.url,
        media: createElement(YouTubeThumbnailMedia, {
          title: selection.title || 'Vídeo do YouTube',
          url: selection.url,
        }),
      }
    },
  },
})
