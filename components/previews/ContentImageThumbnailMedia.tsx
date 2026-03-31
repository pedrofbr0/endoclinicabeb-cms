import {buildImageUrl} from '../../lib/imagePreview'

const frameStyles = {
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  position: 'relative' as const,
  background: 'linear-gradient(135deg, rgba(201, 169, 98, 0.16), rgba(26, 58, 82, 0.14))',
  boxShadow: 'inset 0 0 0 1px rgba(26, 58, 82, 0.08)',
}

export function ContentImageThumbnailMedia({
  image,
  title,
}: {
  image?: any
  title?: string
}) {
  const thumbnailUrl = buildImageUrl(image, {
    width: 1200,
    fit: 'max',
  })

  if (!thumbnailUrl) {
    return (
      <div style={{...frameStyles, display: 'grid', placeItems: 'center', color: '#1A3A52'}}>
        <div
          aria-hidden="true"
          style={{
            width: 48,
            height: 48,
            borderRadius: 6,
            background: 'rgba(26, 58, 82, 0.12)',
            display: 'grid',
            placeItems: 'center',
            fontSize: 16,
            fontWeight: 700,
          }}
        >
          img
        </div>
      </div>
    )
  }

  return (
    <div style={frameStyles}>
      <img
        alt={title || 'Thumbnail da imagem'}
        src={thumbnailUrl}
        style={{width: '100%', height: '100%', objectFit: 'contain', display: 'block'}}
      />
    </div>
  )
}
