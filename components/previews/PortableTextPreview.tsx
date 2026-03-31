import {PortableText} from '@portabletext/react'
import type {ReactNode} from 'react'
import {buildImageUrl} from '../../lib/imagePreview'

function resolveTextAlignment(value: any) {
  if (value?.textAlignment) {
    return value.textAlignment
  }

  if (value?.style === 'alignLeft') return 'left'
  if (value?.style === 'alignCenter') return 'center'
  if (value?.style === 'alignRight') return 'right'

  return 'justify'
}

function getTextAlignStyles(value: any) {
  const textAlign = resolveTextAlignment(value)

  return {
    textAlign,
  } as const
}

const portableTextComponents = {
  types: {
    image: ({value}: {value: any}) => {
      const imageUrl = buildImageUrl(value, {width: 1400})

      if (!imageUrl) return null

      return (
        <img
          alt={value?.alt || 'Imagem do artigo'}
          src={imageUrl}
          style={{
            width: '100%',
            maxHeight: 420,
            objectFit: 'cover',
            borderRadius: 18,
            margin: '20px auto',
            display: 'block',
            boxShadow: '0 18px 40px rgba(15, 23, 42, 0.08)',
          }}
        />
      )
    },
    youtubeEmbed: ({value}: {value: any}) => {
      if (!value?.url) return null

      const videoId = getYouTubeVideoId(value?.url)
      const thumbnailUrl = videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : ''

      return (
        <div
          style={{
            margin: '24px 0',
            border: '1px solid rgba(15, 23, 42, 0.08)',
            borderRadius: 24,
            overflow: 'hidden',
            background: '#ffffff',
          }}
        >
          <div style={{aspectRatio: '16 / 9', position: 'relative', overflow: 'hidden'}}>
            {thumbnailUrl ? (
              <img
                alt={value?.titulo || 'Thumbnail do video do YouTube'}
                src={thumbnailUrl}
                style={{width: '100%', height: '100%', objectFit: 'cover', display: 'block'}}
              />
            ) : (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'grid',
                  placeItems: 'center',
                  background:
                    'linear-gradient(135deg, rgba(201, 169, 98, 0.12), rgba(26, 58, 82, 0.1))',
                  color: '#1A3A52',
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                Pre-visualizacao do embed do YouTube
              </div>
            )}

            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(15, 23, 42, 0.35), transparent 55%)',
              }}
            />

            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'grid',
                placeItems: 'center',
              }}
            >
              <div
                style={{
                  width: 74,
                  height: 52,
                  borderRadius: 16,
                  background: 'rgba(228, 29, 37, 0.95)',
                  display: 'grid',
                  placeItems: 'center',
                  boxShadow: '0 20px 30px rgba(15, 23, 42, 0.2)',
                }}
              >
                <div
                  style={{
                    width: 0,
                    height: 0,
                    borderTop: '10px solid transparent',
                    borderBottom: '10px solid transparent',
                    borderLeft: '17px solid white',
                    marginLeft: 5,
                  }}
                />
              </div>
            </div>

            <div
              style={{
                position: 'absolute',
                left: 18,
                right: 18,
                bottom: 16,
                color: '#ffffff',
                fontSize: 14,
                fontWeight: 600,
                lineHeight: 1.4,
              }}
            >
              {value?.titulo || 'Thumbnail do video incorporado'}
            </div>
          </div>
        </div>
      )
    },
  },
  block: {
    normal: ({children, value}: {children?: ReactNode; value?: any}) => (
      <p
        style={{
          margin: '0 0 26px',
          color: '#4B5563',
          fontSize: 18,
          lineHeight: 1.95,
          ...getTextAlignStyles(value),
        }}
      >
        {children}
      </p>
    ),
    lead: ({children, value}: {children?: ReactNode; value?: any}) => (
      <p
        style={{
          margin: '0 0 30px',
          color: '#35526B',
          fontSize: 21,
          lineHeight: 1.8,
          fontWeight: 600,
          ...getTextAlignStyles(value),
        }}
      >
        {children}
      </p>
    ),
    h1: ({children, value}: {children?: ReactNode; value?: any}) => (
      <h1
        style={{
          margin: '48px 0 24px',
          color: '#1A3A52',
          fontSize: 38,
          lineHeight: 1.15,
          fontWeight: 700,
          fontFamily: 'Georgia, serif',
          ...getTextAlignStyles(value),
        }}
      >
        {children}
      </h1>
    ),
    h2: ({children, value}: {children?: ReactNode; value?: any}) => (
      <h2
        style={{
          margin: '56px 0 20px',
          color: '#1A3A52',
          fontSize: 32,
          lineHeight: 1.2,
          fontWeight: 700,
          fontFamily: 'Georgia, serif',
          ...getTextAlignStyles(value),
        }}
      >
        {children}
      </h2>
    ),
    h3: ({children, value}: {children?: ReactNode; value?: any}) => (
      <h3
        style={{
          margin: '40px 0 18px',
          color: '#1A3A52',
          fontSize: 26,
          lineHeight: 1.25,
          fontWeight: 700,
          fontFamily: 'Georgia, serif',
          ...getTextAlignStyles(value),
        }}
      >
        {children}
      </h3>
    ),
    blockquote: ({children, value}: {children?: ReactNode; value?: any}) => (
      <blockquote
        style={{
          margin: '28px 0',
          padding: '10px 0 10px 18px',
          borderLeft: '4px solid #C9A962',
          background: '#FAFAF8',
          color: '#6B7280',
          fontSize: 22,
          lineHeight: 1.75,
          fontStyle: 'italic',
          ...getTextAlignStyles(value),
        }}
      >
        {children}
      </blockquote>
    ),
    alignLeft: ({children}: {children?: ReactNode}) => (
      <p style={{margin: '0 0 26px', color: '#4B5563', fontSize: 18, lineHeight: 1.95, textAlign: 'left'}}>
        {children}
      </p>
    ),
    alignCenter: ({children}: {children?: ReactNode}) => (
      <p
        style={{margin: '0 0 26px', color: '#4B5563', fontSize: 18, lineHeight: 1.95, textAlign: 'center'}}
      >
        {children}
      </p>
    ),
    alignRight: ({children}: {children?: ReactNode}) => (
      <p
        style={{margin: '0 0 26px', color: '#4B5563', fontSize: 18, lineHeight: 1.95, textAlign: 'right'}}
      >
        {children}
      </p>
    ),
    justified: ({children}: {children?: ReactNode}) => (
      <p
        style={{
          margin: '0 0 26px',
          color: '#4B5563',
          fontSize: 18,
          lineHeight: 1.95,
          textAlign: 'justify',
        }}
      >
        {children}
      </p>
    ),
  },
  list: {
    bullet: ({children}: {children?: ReactNode}) => (
      <ul style={{paddingLeft: 24, margin: '0 0 26px', color: '#4B5563', fontSize: 18, lineHeight: 1.85}}>
        {children}
      </ul>
    ),
    number: ({children}: {children?: ReactNode}) => (
      <ol style={{paddingLeft: 24, margin: '0 0 26px', color: '#4B5563', fontSize: 18, lineHeight: 1.85}}>
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({children}: {children?: ReactNode}) => (
      <strong style={{color: '#1A3A52', fontWeight: 700}}>{children}</strong>
    ),
    em: ({children}: {children?: ReactNode}) => (
      <em style={{color: '#35526B', fontStyle: 'italic'}}>{children}</em>
    ),
    link: ({children, value}: {children?: ReactNode; value?: {href?: string}}) => (
      <a
        href={value?.href || '#'}
        style={{color: '#C9A962', fontWeight: 600, textDecoration: 'underline'}}
      >
        {children}
      </a>
    ),
  },
}

function getYouTubeVideoId(url?: string) {
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

interface PortableTextPreviewProps {
  value?: any[]
}

export function PortableTextPreview({value}: PortableTextPreviewProps) {
  if (!Array.isArray(value) || value.length === 0) {
    return <p style={{margin: 0, color: '#6B7280'}}>O texto do artigo aparecera aqui.</p>
  }

  return <PortableText components={portableTextComponents} value={value} />
}
