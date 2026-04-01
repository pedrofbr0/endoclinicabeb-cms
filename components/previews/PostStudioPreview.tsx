import {Box, Card, Grid, Heading, Stack, Text} from '@sanity/ui'
import type {UserViewComponent} from 'sanity/structure'
import {
  PostBlogCardPreview,
  PostCoverImageFrame,
  PostSharingImagePreview,
  getPostPreviewMetaParts,
  type PostPreviewSnapshot,
} from './PostPreviewPrimitives'
import {PortableTextPreview} from './PortableTextPreview'

function getImageComparisonKey(source: any) {
  if (!source) return ''

  return JSON.stringify({
    assetRef: source?.asset?._ref || source?._ref || '',
    crop: source?.crop || null,
    hotspot: source?.hotspot || null,
  })
}

function getSnapshotComparisonKey(snapshot: PostPreviewSnapshot) {
  return JSON.stringify({
    title: snapshot.titulo || '',
    author: snapshot.autor || '',
    hideAuthor: snapshot.hideAuthor === true,
    hideDate: snapshot.hideDate === true,
    showOnFrontend: snapshot.showOnFrontend !== false,
    useRealDate: snapshot.usarDataReal !== false,
    displayDate: snapshot.dataExibicao || '',
    createdAt: snapshot._createdAt || '',
    coverImage: getImageComparisonKey(snapshot.imagemCapa),
    cardImage: getImageComparisonKey(snapshot.imagemCard || snapshot.imagemCapa),
    contentText: JSON.stringify(snapshot.conteudo || []),
  })
}

function PreviewPanel({
  title,
  badge,
  badgeTone = '#C9A962',
  children,
}: {
  title: string
  badge: string
  badgeTone?: string
  children: React.ReactNode
}) {
  return (
    <Card border padding={4} radius={4}>
      <Stack space={3}>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: 12,
            flexWrap: 'wrap',
          }}
        >
          <Heading size={1}>{title}</Heading>
          <Text
            size={1}
            style={{
              color: badgeTone,
              fontWeight: 700,
              padding: '4px 10px',
              borderRadius: 999,
              background:
                badgeTone === '#2563EB' ? 'rgba(37, 99, 235, 0.10)' : 'rgba(201, 169, 98, 0.12)',
              whiteSpace: 'nowrap',
            }}
          >
            {badge}
          </Text>
        </div>
        {children}
      </Stack>
    </Card>
  )
}

function ArticleCoverPreview({snapshot}: {snapshot: PostPreviewSnapshot}) {
  const title = snapshot.titulo || 'Título do artigo'

  return (
    <PreviewPanel title="Capa da página do artigo" badge="até 896 × 560">
      <Text muted size={1}>
        No frontend, a capa aparece inteira acima do título, dentro de uma moldura mais larga e sem
        corte agressivo.
      </Text>
      <PostCoverImageFrame image={snapshot.imagemCapa} title={title} />
    </PreviewPanel>
  )
}

function SharingPreview({snapshot}: {snapshot: PostPreviewSnapshot}) {
  const title = snapshot.titulo || 'Título do artigo'

  return (
    <PreviewPanel
      title="Miniatura de compartilhamento"
      badge="1200 × 630"
      badgeTone="#2563EB"
    >
      <Text muted size={1}>
        Aqui crop e hotspot fazem diferença. Esta é a versão usada para Open Graph e
        compartilhamento.
      </Text>
      <PostSharingImagePreview image={snapshot.imagemCapa} title={title} />
    </PreviewPanel>
  )
}

function BlogCardPanel({snapshot}: {snapshot: PostPreviewSnapshot}) {
  return (
    <PreviewPanel title="Card do blog" badge="16:9" badgeTone="#2563EB">
      {!snapshot.imagemCard && snapshot.imagemCapa ? (
        <Text muted size={1}>
          Nenhuma imagem específica para card foi escolhida. Esta prévia está usando a imagem de
          capa automaticamente.
        </Text>
      ) : null}
      <div style={{maxWidth: 480}}>
        <PostBlogCardPreview snapshot={snapshot} />
      </div>
    </PreviewPanel>
  )
}

function ArticlePagePreview({snapshot}: {snapshot: PostPreviewSnapshot}) {
  const title = snapshot.titulo || 'Título do artigo'
  const metaParts = getPostPreviewMetaParts(snapshot, true)

  return (
    <div
      style={{
        background: '#ffffff',
        borderRadius: 32,
        border: '1px solid rgba(26, 58, 82, 0.08)',
        boxShadow: '0 24px 48px rgba(15, 23, 42, 0.08)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          maxWidth: 1080,
          margin: '0 auto',
          padding: '28px 24px 40px',
          background: '#ffffff',
        }}
      >
        <a
          href="#preview"
          onClick={(event) => event.preventDefault()}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            color: '#C9A962',
            fontWeight: 600,
            textDecoration: 'none',
            marginBottom: 28,
          }}
        >
          ← Voltar para o blog
        </a>

        <div style={{maxWidth: 896, margin: '0 auto 48px'}}>
          <PostCoverImageFrame image={snapshot.imagemCapa} title={title} />
        </div>

        <header
          style={{
            maxWidth: 780,
            margin: '0 auto 40px',
            paddingBottom: 32,
            borderBottom: '1px solid rgba(148, 163, 184, 0.16)',
          }}
        >
          <h1
            style={{
              margin: '0 0 24px',
              color: '#1A3A52',
              fontSize: 'clamp(2.6rem, 5vw, 4.3rem)',
              lineHeight: 1.1,
              fontWeight: 700,
              fontFamily: '"Playfair Display", serif',
            }}
          >
            {title}
          </h1>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 18,
              flexWrap: 'wrap',
            }}
          >
            {metaParts.length ? (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  flexWrap: 'wrap',
                  color: '#6B7280',
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: 0.6,
                  textTransform: 'uppercase',
                }}
              >
                {metaParts.map((part, index) => (
                  <div key={`${part}-${index}`} style={{display: 'flex', alignItems: 'center', gap: 14}}>
                    {index > 0 ? <span style={{color: '#C9A962'}}>•</span> : null}
                    <span>{part}</span>
                  </div>
                ))}
              </div>
            ) : (
              <Text muted size={1}>
                Sem metadados visíveis no frontend.
              </Text>
            )}

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '12px 18px',
                borderRadius: 999,
                border: '1px solid rgba(26, 58, 82, 0.14)',
                color: '#1A3A52',
                fontWeight: 600,
                fontSize: 15,
                background: '#ffffff',
              }}
            >
              Compartilhar
            </div>
          </div>
        </header>

        <div style={{maxWidth: 780, margin: '0 auto', background: '#ffffff'}}>
          <PortableTextPreview value={snapshot.conteudo} />
        </div>
      </div>
    </div>
  )
}

function PostSnapshotSection({
  title,
  description,
  snapshot,
}: {
  title: string
  description: string
  snapshot: PostPreviewSnapshot
}) {
  return (
    <Stack space={4}>
      <Stack space={2}>
        <Heading size={1}>{title}</Heading>
        <Text muted size={1}>
          {description}
        </Text>
      </Stack>

      <Grid columns={[1, 1, 2, 3]} gap={4}>
        <ArticleCoverPreview snapshot={snapshot} />
        <SharingPreview snapshot={snapshot} />
        <BlogCardPanel snapshot={snapshot} />
      </Grid>

      <ArticlePagePreview snapshot={snapshot} />
    </Stack>
  )
}

export const PostStudioPreview: UserViewComponent = ({document}) => {
  const displayed = (document.displayed || {}) as PostPreviewSnapshot
  const published = (document.published || {}) as PostPreviewSnapshot
  const showOnFrontend = displayed.showOnFrontend !== false
  const hasPublishedVersion = Object.keys(published).length > 0
  const hasPublishedDifference =
    hasPublishedVersion && getSnapshotComparisonKey(displayed) !== getSnapshotComparisonKey(published)

  return (
    <Box padding={4}>
      <Stack space={5}>
        <Stack space={2}>
          <Heading size={1}>Pré-visualização do artigo</Heading>
          <Text muted size={1}>
            Esta aba usa as mesmas regras visuais do frontend para capa, card do blog, miniatura de
            compartilhamento e página do artigo.
          </Text>
        </Stack>

        {displayed.showOnFrontend === false ? (
          <Card border padding={4} radius={4} tone="caution">
            <Stack space={2}>
              <Heading size={1}>Artigo oculto no frontend</Heading>
              <Text size={1}>
                Este artigo continua salvo no CMS, mas não aparece na home, na listagem do blog nem
                no acesso direto do site enquanto a opção “Exibir no frontend” estiver desativada.
              </Text>
            </Stack>
          </Card>
        ) : null}

        {hasPublishedDifference ? (
          <Card border padding={4} radius={4} tone="caution">
            <Text size={1}>
              O rascunho atual está diferente da versão já publicada no site. As prévias abaixo
              mostram primeiro como ficará após publicar e, em seguida, o que o frontend público
              está exibindo agora.
            </Text>
          </Card>
        ) : null}

        {showOnFrontend ? (
          <PostSnapshotSection
            title="Após publicar"
            description="Esta é a versão mais recente do rascunho, com o mesmo enquadramento e as mesmas regras de exibição do frontend."
            snapshot={displayed}
          />
        ) : null}

        {hasPublishedDifference && published.showOnFrontend !== false ? (
          <PostSnapshotSection
            title="Publicado no site agora"
            description="Use esta comparação para verificar se o site público já recebeu a última publicação ou ainda está mostrando a versão anterior."
            snapshot={published}
          />
        ) : null}
      </Stack>
    </Box>
  )
}
