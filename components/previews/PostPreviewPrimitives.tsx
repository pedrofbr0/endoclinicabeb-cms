import {Flex, Text} from '@sanity/ui'
import {buildImageUrl, hasImageAsset} from '../../lib/imagePreview'

export type PostPreviewSnapshot = Record<string, any>

export function formatPostPreviewDate(snapshot: PostPreviewSnapshot) {
  const baseDate =
    snapshot.usarDataReal === false ? snapshot.dataExibicao : snapshot._createdAt

  if (!baseDate) return ''

  if (/^\d{4}-\d{2}-\d{2}$/.test(baseDate)) {
    const [year, month, day] = String(baseDate).split('-')
    return `${day}/${month}/${year}`
  }

  return new Date(baseDate).toLocaleDateString('pt-BR')
}

export function getPostPreviewExcerpt(snapshot: PostPreviewSnapshot) {
  const plainText =
    Array.isArray(snapshot.conteudo) &&
    snapshot.conteudo
      .flatMap((block: any) => (Array.isArray(block?.children) ? block.children : []))
      .map((child: any) => child?.text || '')
      .join(' ')
      .trim()

  return plainText || 'O resumo do artigo aparecerá aqui quando o texto for preenchido.'
}

export function getPostPreviewMetaParts(
  snapshot: PostPreviewSnapshot,
  includeAuthorPrefix: boolean,
) {
  const parts = [
    snapshot.hideDate === true ? '' : formatPostPreviewDate(snapshot),
    snapshot.hideAuthor === true || !snapshot.autor
      ? ''
      : includeAuthorPrefix
        ? `Por ${snapshot.autor}`
        : snapshot.autor,
  ].filter(Boolean)

  return parts
}

export function resolvePostCardImage(snapshot: PostPreviewSnapshot) {
  return snapshot.imagemCard || snapshot.imagemCapa
}

function EmptyPreviewImage({
  minHeight,
  borderRadius = 24,
  text,
}: {
  minHeight: number
  borderRadius?: number
  text: string
}) {
  return (
    <Flex
      align="center"
      justify="center"
      style={{
        width: '100%',
        minHeight,
        borderRadius,
        background: '#FAFAF8',
        color: '#6B7280',
        textAlign: 'center',
        padding: 24,
        border: '1px solid rgba(26, 58, 82, 0.08)',
      }}
    >
      <Text muted size={1} style={{maxWidth: 280, lineHeight: 1.45}}>
        {text}
      </Text>
    </Flex>
  )
}

export function PostCoverImageFrame({
  image,
  title,
  emptyText = 'A capa do artigo aparecerá aqui depois do upload.',
}: {
  image: any
  title: string
  emptyText?: string
}) {
  const imageUrl = buildImageUrl(image, {
    width: 1600,
    fit: 'max',
  })

  if (!hasImageAsset(image) || !imageUrl) {
    return <EmptyPreviewImage minHeight={280} text={emptyText} />
  }

  return (
    <div
      style={{
        width: '100%',
        borderRadius: 24,
        overflow: 'hidden',
        background: '#FAFAF8',
        border: '1px solid rgba(26, 58, 82, 0.08)',
        boxShadow: '0 18px 42px rgba(15, 23, 42, 0.06)',
      }}
    >
      <img
        alt={title}
        src={imageUrl}
        style={{
          width: '100%',
          height: 'auto',
          maxHeight: 560,
          display: 'block',
          objectFit: 'contain',
          background: '#FAFAF8',
        }}
      />
    </div>
  )
}

export function PostSharingImagePreview({
  image,
  title,
  emptyText = 'A miniatura de compartilhamento aparecerá aqui depois do upload.',
}: {
  image: any
  title: string
  emptyText?: string
}) {
  const imageUrl = buildImageUrl(image, {
    width: 1200,
    height: 630,
    fit: 'crop',
  })

  if (!hasImageAsset(image) || !imageUrl) {
    return <EmptyPreviewImage minHeight={220} text={emptyText} />
  }

  return (
    <div
      style={{
        width: '100%',
        aspectRatio: '40 / 21',
        overflow: 'hidden',
        borderRadius: 24,
        background: '#F8F5EE',
        border: '1px solid rgba(26, 58, 82, 0.08)',
      }}
    >
      <img
        alt={title}
        src={imageUrl}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          background: '#F8F5EE',
        }}
      />
    </div>
  )
}

export function PostBlogCardPreview({
  snapshot,
  maxWidth = 480,
}: {
  snapshot: PostPreviewSnapshot
  maxWidth?: number
}) {
  const title = snapshot.titulo || 'Título do artigo'
  const excerpt = getPostPreviewExcerpt(snapshot)
  const metaParts = getPostPreviewMetaParts(snapshot, false)
  const cardImage = resolvePostCardImage(snapshot)
  const cardImageUrl = buildImageUrl(cardImage, {
    width: 960,
    height: 540,
    fit: 'crop',
  })

  return (
    <article
      style={{
        maxWidth,
        background: '#ffffff',
        borderRadius: 16,
        overflow: 'hidden',
        border: '1px solid rgba(26, 58, 82, 0.08)',
        boxShadow: '0 12px 28px rgba(15, 23, 42, 0.06)',
      }}
    >
      <div
        style={{
          aspectRatio: '16 / 9',
          overflow: 'hidden',
          background: '#F5F3EE',
        }}
      >
        {hasImageAsset(cardImage) && cardImageUrl ? (
          <img
            alt={title}
            src={cardImageUrl}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              background: '#F5F3EE',
            }}
          />
        ) : (
          <EmptyPreviewImage
            minHeight={180}
            borderRadius={0}
            text="A imagem do card do blog aparecerá aqui depois do upload."
          />
        )}
      </div>

      <div style={{padding: 24}}>
        {metaParts.length ? (
          <p
            style={{
              margin: '0 0 12px',
              color: '#C9A962',
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: 0.3,
            }}
          >
            {metaParts.join(' • ')}
          </p>
        ) : null}

        <h3
          style={{
            margin: '0 0 16px',
            color: '#1A3A52',
            fontSize: 20,
            lineHeight: 1.35,
            fontWeight: 700,
            fontFamily:
              'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {title}
        </h3>

        <p
          style={{
            margin: 0,
            color: '#6B7280',
            fontSize: 16,
            lineHeight: 1.625,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {excerpt}
        </p>

        <div
          style={{
            marginTop: 16,
            paddingTop: 16,
            borderTop: '1px solid rgba(148, 163, 184, 0.16)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
          }}
        >
          <span
            style={{
              color: '#1A3A52',
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            Ler artigo completo →
          </span>

          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 999,
              border: '1px solid rgba(26, 58, 82, 0.12)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#1A3A52',
              fontSize: 18,
              flexShrink: 0,
            }}
          >
            ↗
          </div>
        </div>
      </div>
    </article>
  )
}
