import {Box, Card, Flex, Grid, Heading, Stack, Text} from '@sanity/ui'
import type {UserViewComponent} from 'sanity/structure'
import {buildImageUrl, hasImageAsset} from '../../lib/imagePreview'
import {PortableTextPreview} from './PortableTextPreview'

function formatPreviewDate(documentValue: Record<string, any>) {
  const baseDate =
    documentValue.usarDataReal === false ? documentValue.dataExibicao : documentValue._createdAt

  if (!baseDate) return 'Sem data definida'

  if (/^\d{4}-\d{2}-\d{2}$/.test(baseDate)) {
    const [year, month, day] = baseDate.split('-')
    return `${day}/${month}/${year}`
  }

  return new Date(baseDate).toLocaleDateString('pt-BR')
}

function PreviewImage({
  image,
  alt,
  height,
  objectFit = 'cover',
  width,
}: {
  image: any
  alt: string
  height: number
  objectFit?: 'cover' | 'contain'
  width: number
}) {
  const imageUrl = buildImageUrl(image, {
    width,
    height: objectFit === 'cover' ? height : undefined,
    fit: objectFit === 'cover' ? 'crop' : 'max',
  })

  if (!imageUrl) {
    return (
      <Flex
        align="center"
        justify="center"
        style={{
          width: '100%',
          height,
          borderRadius: 24,
          background: 'rgba(26, 58, 82, 0.05)',
          color: '#6B7280',
          textAlign: 'center',
          padding: 24,
        }}
      >
        <Text muted size={1}>
          Nenhuma imagem selecionada ainda.
        </Text>
      </Flex>
    )
  }

  return (
    <img
      alt={alt}
      src={imageUrl}
      style={{
        width: '100%',
        height,
        objectFit,
        borderRadius: 24,
        display: 'block',
        background: '#F8F5EE',
      }}
    />
  )
}

export const PostStudioPreview: UserViewComponent = ({document}) => {
  const displayed = (document.displayed || {}) as Record<string, any>
  const title = displayed.titulo || 'Título do artigo'
  const author = displayed.autor || ''
  const showAuthor = displayed.hideAuthor !== true && Boolean(author)
  const showDate = displayed.hideDate !== true
  const showOnFrontend = displayed.showOnFrontend !== false
  const articleCardImage = displayed.imagemCard || displayed.imagemCapa
  const usesCoverFallback = !hasImageAsset(displayed.imagemCard) && hasImageAsset(displayed.imagemCapa)
  const metaParts = [
    showDate ? formatPreviewDate(displayed) : '',
    showAuthor ? `Por ${author}` : '',
  ].filter(Boolean)
  const cardMetaParts = [
    showDate ? formatPreviewDate(displayed) : '',
    showAuthor ? author : '',
  ].filter(Boolean)
  const excerpt =
    (displayed.conteudo &&
      String(displayed.conteudo?.[0]?.children?.[0]?.text || '')?.slice(0, 160)) ||
    'O resumo do artigo aparecerá aqui quando o texto for preenchido.'

  return (
    <Box padding={4}>
      <Stack space={5}>
        <Stack space={2}>
          <Heading size={1}>Pré-visualização do artigo</Heading>
          <Text muted size={1}>
            Esta aba simula a página publicada do artigo sobre fundo branco, incluindo capa,
            título, metadados, texto e o card do blog.
          </Text>
        </Stack>

        {!showOnFrontend ? (
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

        <Grid columns={[1, 1, 2]} gap={4}>
          <Card border padding={4} radius={4}>
            <Stack space={3}>
              <Flex align="center" justify="space-between" style={{gap: 12, flexWrap: 'wrap'}}>
                <Heading size={1}>Capa da página do artigo</Heading>
                <Text
                  size={1}
                  style={{
                    color: '#C9A962',
                    fontWeight: 700,
                    padding: '4px 10px',
                    borderRadius: 999,
                    background: 'rgba(201, 169, 98, 0.12)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  até 896 × 560
                </Text>
              </Flex>
              <Text muted size={1}>
                No frontend, a capa aparece inteira acima do título, dentro de uma moldura mais
                larga e sem corte agressivo.
              </Text>

              <div
                style={{
                  background: '#FAFAF8',
                  borderRadius: 24,
                  border: '1px solid rgba(26, 58, 82, 0.08)',
                  padding: '24px 20px',
                }}
              >
                <div style={{maxWidth: 896, margin: '0 auto'}}>
                  <PreviewImage
                    alt={title}
                    height={560}
                    image={displayed.imagemCapa}
                    objectFit="contain"
                    width={1600}
                  />
                </div>
              </div>
            </Stack>
          </Card>

          <Card border padding={4} radius={4}>
            <Stack space={3}>
              <Flex align="center" justify="space-between" style={{gap: 12, flexWrap: 'wrap'}}>
                <Heading size={1}>Card do blog</Heading>
                <Text
                  size={1}
                  style={{
                    color: '#2563EB',
                    fontWeight: 700,
                    padding: '4px 10px',
                    borderRadius: 999,
                    background: 'rgba(37, 99, 235, 0.10)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  16:9
                </Text>
              </Flex>

              {usesCoverFallback ? (
                <Text muted size={1}>
                  Nenhuma imagem específica para card foi escolhida. O preview abaixo está usando a
                  imagem de capa automaticamente.
                </Text>
              ) : null}

              <article
                style={{
                  maxWidth: 480,
                  background: '#ffffff',
                  borderRadius: 16,
                  overflow: 'hidden',
                  border: '1px solid rgba(26, 58, 82, 0.08)',
                  boxShadow: '0 12px 28px rgba(15, 23, 42, 0.06)',
                }}
              >
                <PreviewImage alt={title} height={270} image={articleCardImage} width={960} />

                <div style={{padding: 32}}>
                  {cardMetaParts.length ? (
                    <p
                      style={{
                        margin: '0 0 12px',
                        color: '#C9A962',
                        fontSize: 14,
                        fontWeight: 600,
                        letterSpacing: 0.3,
                      }}
                    >
                      {cardMetaParts.join(' • ')}
                    </p>
                  ) : null}

                  <h3
                    style={{
                      margin: '0 0 16px',
                      color: '#1A3A52',
                      fontSize: 24,
                      lineHeight: 1.25,
                      fontWeight: 700,
                      fontFamily: '"Playfair Display", serif',
                    }}
                  >
                    {title}
                  </h3>

                  <p
                    style={{
                      margin: 0,
                      color: '#6B7280',
                      fontSize: 17,
                      lineHeight: 1.7,
                    }}
                  >
                    {excerpt}
                  </p>
                </div>
              </article>
            </Stack>
          </Card>
        </Grid>

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
              &larr; Voltar para o blog
            </a>

            <div style={{maxWidth: 896, margin: '0 auto 48px'}}>
              <div
                style={{
                  borderRadius: 24,
                  overflow: 'hidden',
                  background: '#FAFAF8',
                  border: '1px solid rgba(26, 58, 82, 0.08)',
                  boxShadow: '0 18px 42px rgba(15, 23, 42, 0.06)',
                }}
              >
                <PreviewImage
                  alt={title}
                  height={560}
                  image={displayed.imagemCapa}
                  objectFit="contain"
                  width={1600}
                />
              </div>
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
                      <Flex key={part} align="center" gap={14}>
                        {index > 0 ? <span style={{color: '#C9A962'}}>•</span> : null}
                        <span>{part}</span>
                      </Flex>
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

            <div
              style={{
                maxWidth: 780,
                margin: '0 auto',
                background: '#ffffff',
              }}
            >
              <PortableTextPreview value={displayed.conteudo} />
            </div>
          </div>
        </div>
      </Stack>
    </Box>
  )
}
