import type {CSSProperties} from 'react'

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

const frameStyles: CSSProperties = {
  width: 46,
  height: 46,
  borderRadius: 10,
  overflow: 'hidden',
  position: 'relative',
  background: 'linear-gradient(135deg, rgba(201, 169, 98, 0.16), rgba(26, 58, 82, 0.14))',
  boxShadow: 'inset 0 0 0 1px rgba(26, 58, 82, 0.08)',
}

export function YouTubeThumbnailMedia({title, url}: {title?: string; url?: string}) {
  const videoId = extractYouTubeId(url)
  const thumbnailUrl = videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : ''

  if (!thumbnailUrl) {
    return (
      <div style={{...frameStyles, display: 'grid', placeItems: 'center', color: '#1A3A52'}}>
        <div
          style={{
            width: 18,
            height: 14,
            borderRadius: 4,
            background: 'rgba(228, 29, 37, 0.95)',
            display: 'grid',
            placeItems: 'center',
          }}
        >
          <div
            style={{
              width: 0,
              height: 0,
              borderTop: '4px solid transparent',
              borderBottom: '4px solid transparent',
              borderLeft: '6px solid white',
              marginLeft: 2,
            }}
          />
        </div>
      </div>
    )
  }

  return (
    <div style={frameStyles}>
      <img
        alt={title || 'Thumbnail do video'}
        src={thumbnailUrl}
        style={{width: '100%', height: '100%', objectFit: 'cover', display: 'block'}}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(15, 23, 42, 0.3), transparent 65%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: 18,
          height: 14,
          borderRadius: 4,
          background: 'rgba(228, 29, 37, 0.96)',
          display: 'grid',
          placeItems: 'center',
          boxShadow: '0 8px 20px rgba(15, 23, 42, 0.22)',
        }}
      >
        <div
          style={{
            width: 0,
            height: 0,
            borderTop: '4px solid transparent',
            borderBottom: '4px solid transparent',
            borderLeft: '6px solid white',
            marginLeft: 2,
          }}
        />
      </div>
    </div>
  )
}
