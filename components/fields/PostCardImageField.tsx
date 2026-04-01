import {useEffect, useMemo, useState} from 'react'
import {Card, Heading, Stack, Text} from '@sanity/ui'
import type {FieldProps} from 'sanity'
import {useClient, useFormValue} from 'sanity'
import {hasImageAsset} from '../../lib/imagePreview'
import {STUDIO_API_VERSION} from '../../lib/studioConfig'
import {ImageFieldEditorShell} from './ImageFieldEditorShell'
import {PreviewPanel} from './ImageFieldPreviewLayout'
import {PostBlogCardPreview, type PostPreviewSnapshot} from '../previews/PostPreviewPrimitives'

type SanityImageValue = Record<string, unknown> | undefined

function normalizeDocumentId(documentId?: string) {
  if (!documentId) return ''
  return documentId.replace(/^drafts\./, '')
}

function getImageComparisonKey(source?: SanityImageValue) {
  if (!source) return ''

  return JSON.stringify({
    assetRef:
      (source as {asset?: {_ref?: string}}).asset?._ref ||
      (source as {_ref?: string})._ref ||
      '',
    crop: (source as {crop?: unknown}).crop || null,
    hotspot: (source as {hotspot?: unknown}).hotspot || null,
  })
}

function CardPanel({
  snapshot,
  title,
  helpText,
}: {
  snapshot: PostPreviewSnapshot
  title: string
  helpText: string
}) {
  return (
    <PreviewPanel title={title} badge="16:9" helpText={helpText}>
      <div style={{maxWidth: 480}}>
        <PostBlogCardPreview snapshot={snapshot} />
      </div>
    </PreviewPanel>
  )
}

export function PostCardImageField(props: FieldProps) {
  const imageValue = props.value as SanityImageValue
  const coverImageValue = useFormValue(['imagemCapa']) as SanityImageValue
  const title = (useFormValue(['titulo']) as string | undefined) || ''
  const author = (useFormValue(['autor']) as string | undefined) || ''
  const createdAt = (useFormValue(['_createdAt']) as string | undefined) || ''
  const useRealDate = useFormValue(['usarDataReal']) as boolean | undefined
  const displayDate = useFormValue(['dataExibicao']) as string | undefined
  const hideAuthor = useFormValue(['hideAuthor']) as boolean | undefined
  const hideDate = useFormValue(['hideDate']) as boolean | undefined
  const content = (useFormValue(['conteudo']) as any[] | undefined) || []
  const rawDocumentId = useFormValue(['_id']) as string | undefined
  const documentId = useMemo(() => normalizeDocumentId(rawDocumentId), [rawDocumentId])
  const client = useClient({apiVersion: STUDIO_API_VERSION})
  const [publishedSnapshot, setPublishedSnapshot] = useState<PostPreviewSnapshot | null>(null)
  const [publishedLoaded, setPublishedLoaded] = useState(false)

  const draftSnapshot: PostPreviewSnapshot = useMemo(
    () => ({
      titulo: title,
      autor: author,
      _createdAt: createdAt,
      usarDataReal: useRealDate,
      dataExibicao: displayDate,
      hideAuthor,
      hideDate,
      imagemCard: imageValue,
      imagemCapa: coverImageValue,
      conteudo: content,
    }),
    [author, content, coverImageValue, createdAt, displayDate, hideAuthor, hideDate, imageValue, title, useRealDate],
  )

  useEffect(() => {
    let isActive = true

    async function loadPublishedSnapshot() {
      if (!documentId) {
        if (isActive) {
          setPublishedSnapshot(null)
          setPublishedLoaded(true)
        }
        return
      }

      try {
        const publishedPost = await client.fetch<PostPreviewSnapshot | null>(
          `*[_id == $id][0]{
            "titulo": titulo,
            "autor": autor,
            _createdAt,
            "usarDataReal": usarDataReal,
            "dataExibicao": dataExibicao,
            "hideAuthor": hideAuthor,
            "hideDate": hideDate,
            "imagemCard": imagemCard,
            "imagemCapa": imagemCapa,
            "conteudo": conteudo
          }`,
          {id: documentId},
        )

        if (isActive) {
          setPublishedSnapshot(publishedPost)
          setPublishedLoaded(true)
        }
      } catch {
        if (isActive) {
          setPublishedSnapshot(null)
          setPublishedLoaded(true)
        }
      }
    }

    setPublishedLoaded(false)
    void loadPublishedSnapshot()

    return () => {
      isActive = false
    }
  }, [client, documentId])

  const effectiveDraftImage = draftSnapshot.imagemCard || draftSnapshot.imagemCapa
  const effectivePublishedImage =
    publishedSnapshot?.imagemCard || publishedSnapshot?.imagemCapa || undefined
  const hasPublishedVersion = publishedLoaded && hasImageAsset(effectivePublishedImage)
  const hasUnpublishedChanges =
    getImageComparisonKey(effectiveDraftImage) !== getImageComparisonKey(effectivePublishedImage)

  return (
    <Stack space={3}>
      <ImageFieldEditorShell {...props} />

      {hasUnpublishedChanges ? (
        <Card border padding={3} radius={3} tone="caution">
          <Text size={1}>
            O rascunho atual está diferente da versão já publicada no site. As prévias abaixo
            mostram primeiro como ficará após publicar e, em seguida, o que está visível no frontend
            agora.
          </Text>
        </Card>
      ) : null}

      <Card border padding={3} radius={3} tone="transparent">
        <Stack space={3}>
          <Heading size={1}>Após publicar</Heading>
          <CardPanel
            snapshot={draftSnapshot}
            title="Região visível no card do blog"
            helpText="Esta é a área efetiva da miniatura usada nos cards da home e da listagem do blog."
          />
        </Stack>
      </Card>

      {hasPublishedVersion && publishedSnapshot ? (
        <Card border padding={3} radius={3} tone="transparent">
          <Stack space={3}>
            <Heading size={1}>Publicado no site agora</Heading>
            <Text muted size={1}>
              Esta é a versão atualmente visível no frontend. Se ela estiver diferente da prévia
              acima, ainda falta publicar o rascunho.
            </Text>
            <CardPanel
              snapshot={publishedSnapshot}
              title="Card publicado no blog"
              helpText="Use esta comparação para verificar se o site já recebeu o enquadramento mais recente."
            />
          </Stack>
        </Card>
      ) : null}
    </Stack>
  )
}
