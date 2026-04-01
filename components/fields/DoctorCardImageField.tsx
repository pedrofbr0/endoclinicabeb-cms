import {useEffect, useMemo, useState} from 'react'
import {Badge, Card, Flex, Heading, Stack, Text} from '@sanity/ui'
import type {FieldProps} from 'sanity'
import {useClient, useFormValue} from 'sanity'
import {buildImageUrl, hasImageAsset} from '../../lib/imagePreview'
import {STUDIO_API_VERSION} from '../../lib/studioConfig'
import {ImageFieldEditorShell} from './ImageFieldEditorShell'

type SanityImageValue = Record<string, unknown> | undefined

interface DoctorCardSnapshot {
  imagemCard?: SanityImageValue
  imagem?: SanityImageValue
  nome?: string
  crm?: string
  especialidade?: string
}

interface DoctorCardStageProps {
  imageValue?: SanityImageValue
  imageUrl: string
  aspectRatio: string
  badge: string
  title: string
  emptyText: string
  name: string
  crm: string
  specialty: string
  isMobile?: boolean
  stageMaxWidth?: number
}

function AwardIcon({size = 16}: {size?: number}) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width={size} height={size} fill="none">
      <circle cx="12" cy="8.5" r="4.2" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M9.5 12.2 8 20l4-2.5L16 20l-1.5-7.8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

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

function DoctorCardStage({
  imageValue,
  imageUrl,
  aspectRatio,
  badge,
  title,
  emptyText,
  name,
  crm,
  specialty,
  isMobile = false,
  stageMaxWidth,
}: DoctorCardStageProps) {
  return (
    <Stack
      space={2}
      style={{
        width: '100%',
        maxWidth: stageMaxWidth,
        marginInline: 'auto',
      }}
    >
      <Flex align="center" justify="space-between" style={{gap: 8, flexWrap: 'wrap'}}>
        <Text size={1} weight="semibold">
          {title}
        </Text>
        <Badge tone="primary">{badge}</Badge>
      </Flex>

      <div
        style={{
          position: 'relative',
          width: '100%',
          overflow: 'hidden',
          aspectRatio,
          borderRadius: 16,
          background: 'rgba(26, 58, 82, 0.05)',
          border: '1px solid rgba(26, 58, 82, 0.08)',
        }}
      >
        {hasImageAsset(imageValue) && imageUrl ? (
          <>
            <img
              alt={`Prévia do enquadramento do card (${title})`}
              src={imageUrl}
              style={{
                width: '100%',
                height: '100%',
                display: 'block',
                objectFit: 'cover',
              }}
            />

            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(to top, rgba(26, 58, 82, 0.90), rgba(26, 58, 82, 0.40), transparent)',
              }}
            />

            <div
              style={{
                position: 'absolute',
                left: isMobile ? 20 : 32,
                right: isMobile ? 20 : 32,
                bottom: isMobile ? 20 : 32,
                color: '#fff',
              }}
            >
              <div
                style={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: isMobile ? 24 : 30,
                  fontWeight: 700,
                  lineHeight: 1.25,
                  marginBottom: isMobile ? 6 : 8,
                  textWrap: 'balance',
                }}
              >
                {name}
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  color: '#C9A962',
                  marginBottom: isMobile ? 6 : 8,
                }}
              >
                <AwardIcon size={isMobile ? 14 : 16} />
                <span
                  style={{
                    fontSize: isMobile ? 13 : 14,
                    fontWeight: 600,
                  }}
                >
                  {crm}
                </span>
              </div>

              <div
                style={{
                  fontSize: isMobile ? 13 : 14,
                  color: 'rgba(255,255,255,0.92)',
                  lineHeight: 1.4,
                }}
              >
                {specialty}
              </div>
            </div>
          </>
        ) : (
          <Flex align="center" justify="center" style={{width: '100%', height: '100%'}}>
          <div style={{maxWidth: 260, padding: 16, textAlign: 'center'}}>
              <Text muted size={1}>
                {emptyText}
              </Text>
            </div>
          </Flex>
        )}
      </div>
    </Stack>
  )
}

export function DoctorCardImageField(props: FieldProps) {
  const imageValue = props.value as SanityImageValue
  const mainImageValue = useFormValue(['imagem']) as SanityImageValue
  const doctorName = (useFormValue(['nome']) as string | undefined)?.trim() || 'Nome do médico'
  const doctorLicense = (useFormValue(['crm']) as string | undefined)?.trim() || 'CRM/UF 00000'
  const doctorSpecialty =
    (useFormValue(['especialidade']) as string | undefined)?.trim() ||
    'Endocrinologia e Metabologia'
  const rawDocumentId = useFormValue(['_id']) as string | undefined
  const documentId = useMemo(() => normalizeDocumentId(rawDocumentId), [rawDocumentId])
  const client = useClient({apiVersion: STUDIO_API_VERSION})
  const [publishedSnapshot, setPublishedSnapshot] = useState<DoctorCardSnapshot | null>(null)
  const [publishedLoaded, setPublishedLoaded] = useState(false)

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
        const publishedDoctor = await client.fetch<DoctorCardSnapshot | null>(
          '*[_id == $id][0]{imagemCard, imagem, nome, crm, especialidade}',
          {id: documentId},
        )

        if (isActive) {
          setPublishedSnapshot(publishedDoctor)
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

  const draftCardSource = imageValue || mainImageValue
  const publishedCardSource = publishedSnapshot?.imagemCard || publishedSnapshot?.imagem
  const hasPublishedVersion = publishedLoaded && Boolean(publishedSnapshot)
  const hasUnpublishedImageChanges =
    Boolean(draftCardSource || publishedCardSource) &&
    getImageComparisonKey(draftCardSource) !== getImageComparisonKey(publishedCardSource)

  const draftDesktopUrl = buildImageUrl(draftCardSource, {
    width: 1600,
    height: 1000,
    fit: 'crop',
  })
  const draftMobileUrl = buildImageUrl(draftCardSource, {
    width: 1200,
    height: 900,
    fit: 'crop',
  })
  const publishedDesktopUrl = buildImageUrl(publishedCardSource, {
    width: 1600,
    height: 1000,
    fit: 'crop',
  })
  const publishedMobileUrl = buildImageUrl(publishedCardSource, {
    width: 1200,
    height: 900,
    fit: 'crop',
  })

  const publishedName = publishedSnapshot?.nome?.trim() || doctorName
  const publishedLicense = publishedSnapshot?.crm?.trim() || doctorLicense
  const publishedSpecialty = publishedSnapshot?.especialidade?.trim() || doctorSpecialty

  const draftDesktopStage = (
    <DoctorCardStage
      imageValue={draftCardSource}
      imageUrl={draftDesktopUrl}
      aspectRatio="16 / 10"
      badge="16:10"
      title="Após publicar • desktop"
      emptyText="A prévia desktop do card aparecerá aqui depois do upload."
      name={doctorName}
      crm={doctorLicense}
      specialty={doctorSpecialty}
      stageMaxWidth={760}
    />
  )

  const draftMobileStage = (
    <DoctorCardStage
      imageValue={draftCardSource}
      imageUrl={draftMobileUrl}
      aspectRatio="4 / 3"
      badge="4:3"
      title="Após publicar • mobile"
      emptyText="A prévia mobile do card aparecerá aqui depois do upload."
      name={doctorName}
      crm={doctorLicense}
      specialty={doctorSpecialty}
      isMobile
      stageMaxWidth={390}
    />
  )

  const publishedDesktopStage = (
    <DoctorCardStage
      imageValue={publishedCardSource}
      imageUrl={publishedDesktopUrl}
      aspectRatio="16 / 10"
      badge="16:10"
      title="Publicado • desktop"
      emptyText="Ainda não existe uma versão publicada desta imagem no site."
      name={publishedName}
      crm={publishedLicense}
      specialty={publishedSpecialty}
      stageMaxWidth={760}
    />
  )

  const publishedMobileStage = (
    <DoctorCardStage
      imageValue={publishedCardSource}
      imageUrl={publishedMobileUrl}
      aspectRatio="4 / 3"
      badge="4:3"
      title="Publicado • mobile"
      emptyText="Ainda não existe uma versão publicada desta imagem no site."
      name={publishedName}
      crm={publishedLicense}
      specialty={publishedSpecialty}
      isMobile
      stageMaxWidth={390}
    />
  )

  return (
    <Stack space={3}>
      <ImageFieldEditorShell {...props} />

      <Card border padding={3} radius={3} tone="transparent">
        <Stack space={4}>
          <Flex align="center" justify="space-between" style={{gap: 8, flexWrap: 'wrap'}}>
            <Heading size={1}>Regiões visíveis no card do site</Heading>
            <Flex align="center" style={{gap: 6, flexWrap: 'wrap'}}>
              <Badge tone="primary">desktop 16:10</Badge>
              <Badge tone="primary">mobile 4:3</Badge>
            </Flex>
          </Flex>

          <Text muted size={1}>
            Estas molduras usam o mesmo recorte do frontend. No desktop o card usa 16:10. No
            mobile, o site usa uma versão 4:3 própria, então a área visível pode mudar.
          </Text>

          {hasUnpublishedImageChanges ? (
            <Card border padding={3} radius={3} tone="caution">
              <Text size={1}>
                Existe diferença entre o rascunho atual e o que está publicado no site. Compare as
                prévias abaixo para conferir o que entra no ar depois de publicar.
              </Text>
            </Card>
          ) : null}

          <Stack space={4}>
            {draftDesktopStage}
            {draftMobileStage}
          </Stack>

          {hasPublishedVersion ? (
            <Stack space={3}>
              <Flex align="center" justify="space-between" style={{gap: 8, flexWrap: 'wrap'}}>
                <Heading size={1}>Publicado no site agora</Heading>
                <Flex align="center" style={{gap: 6, flexWrap: 'wrap'}}>
                  <Badge tone="positive">desktop 16:10</Badge>
                  <Badge tone="positive">mobile 4:3</Badge>
                </Flex>
              </Flex>

              <Text muted size={1}>
                Esta é a versão atualmente disponível no site público. Se ela estiver diferente da
                prévia acima, ainda falta publicar o rascunho.
              </Text>

              <Stack space={4}>
                {publishedDesktopStage}
                {publishedMobileStage}
              </Stack>
            </Stack>
          ) : null}
        </Stack>
      </Card>
    </Stack>
  )
}
