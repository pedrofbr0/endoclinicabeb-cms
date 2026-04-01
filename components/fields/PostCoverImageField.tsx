import {useEffect, useMemo, useState} from 'react'
import {Card, Grid, Heading, Stack, Text} from '@sanity/ui'
import type {FieldProps} from 'sanity'
import {useClient, useFormValue} from 'sanity'
import {hasImageAsset} from '../../lib/imagePreview'
import {STUDIO_API_VERSION} from '../../lib/studioConfig'
import {ImageFieldEditorShell} from './ImageFieldEditorShell'
import {PreviewPanel} from './ImageFieldPreviewLayout'
import {PostCoverImageFrame, PostSharingImagePreview} from '../previews/PostPreviewPrimitives'

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

function CoverPanels({imageValue}: {imageValue?: SanityImageValue}) {
  return (
    <Grid columns={[1, 1, 2]} gap={3}>
      <PreviewPanel
        title="Capa na página do artigo"
        badge="até 896 × 560"
        helpText="No frontend, a capa aparece inteira dentro de uma moldura mais larga, acima do título do artigo."
      >
        <PostCoverImageFrame
          image={imageValue}
          title="Prévia da capa do artigo"
          emptyText="A capa do artigo aparecerá aqui depois do upload."
        />
      </PreviewPanel>

      <PreviewPanel
        title="Miniatura de compartilhamento"
        badge="1200 × 630"
        helpText="Aqui crop e hotspot fazem diferença. Esta é a versão usada para Open Graph e compartilhamento."
      >
        <PostSharingImagePreview
          image={imageValue}
          title="Prévia de compartilhamento do artigo"
          emptyText="A miniatura de compartilhamento aparecerá aqui depois do upload."
        />
      </PreviewPanel>
    </Grid>
  )
}

export function PostCoverImageField(props: FieldProps) {
  const imageValue = props.value as SanityImageValue
  const rawDocumentId = useFormValue(['_id']) as string | undefined
  const documentId = useMemo(() => normalizeDocumentId(rawDocumentId), [rawDocumentId])
  const client = useClient({apiVersion: STUDIO_API_VERSION})
  const [publishedImage, setPublishedImage] = useState<SanityImageValue>(undefined)
  const [publishedLoaded, setPublishedLoaded] = useState(false)

  useEffect(() => {
    let isActive = true

    async function loadPublishedImage() {
      if (!documentId) {
        if (isActive) {
          setPublishedImage(undefined)
          setPublishedLoaded(true)
        }
        return
      }

      try {
        const publishedPost = await client.fetch<{imagemCapa?: SanityImageValue} | null>(
          '*[_id == $id][0]{imagemCapa}',
          {id: documentId},
        )

        if (isActive) {
          setPublishedImage(publishedPost?.imagemCapa)
          setPublishedLoaded(true)
        }
      } catch {
        if (isActive) {
          setPublishedImage(undefined)
          setPublishedLoaded(true)
        }
      }
    }

    setPublishedLoaded(false)
    void loadPublishedImage()

    return () => {
      isActive = false
    }
  }, [client, documentId])

  const hasPublishedVersion = publishedLoaded && hasImageAsset(publishedImage)
  const hasUnpublishedChanges =
    getImageComparisonKey(imageValue) !== getImageComparisonKey(publishedImage)

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
          <CoverPanels imageValue={imageValue} />
        </Stack>
      </Card>

      {hasPublishedVersion ? (
        <Card border padding={3} radius={3} tone="transparent">
          <Stack space={3}>
            <Heading size={1}>Publicado no site agora</Heading>
            <Text muted size={1}>
              Esta é a versão atualmente visível no frontend. Se ela estiver diferente da prévia
              acima, ainda falta publicar o rascunho.
            </Text>
            <CoverPanels imageValue={publishedImage} />
          </Stack>
        </Card>
      ) : null}
    </Stack>
  )
}
