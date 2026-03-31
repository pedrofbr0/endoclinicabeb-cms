import {Badge, Box, Card, Flex, Heading, Stack, Text} from '@sanity/ui'
import type {ReactNode} from 'react'
import type {UserViewComponent} from 'sanity/structure'
import {buildImageUrl, hasImageAsset} from '../../lib/imagePreview'

function GraduationCapIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="none">
      <path
        d="M3 9.5 12 5l9 4.5-9 4.5-9-4.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M7 11.5V15c0 .7.4 1.3 1 1.6 1.2.7 2.7 1.1 4 1.1s2.8-.4 4-1.1c.6-.3 1-.9 1-1.6v-3.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function BriefcaseIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="none">
      <rect x="4" y="7" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M9 7V5.8A1.8 1.8 0 0 1 10.8 4h2.4A1.8 1.8 0 0 1 15 5.8V7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path d="M4 12h16" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  )
}

function AwardIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="none">
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

function DoctorInfoRow({
  icon,
  label,
  value,
}: {
  icon: ReactNode
  label: string
  value: string
}) {
  return (
    <div style={{display: 'flex', alignItems: 'flex-start', gap: 12}}>
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 12,
          background: 'rgba(201, 169, 98, 0.16)',
          color: '#C9A962',
          display: 'grid',
          placeItems: 'center',
          flexShrink: 0,
        }}
      >
        {icon}
      </div>

      <div style={{minWidth: 0}}>
        <p
          style={{
            margin: '0 0 4px',
            color: '#C9A962',
            fontSize: 12,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: 0.5,
          }}
        >
          {label}
        </p>
        <p
          style={{
            margin: 0,
            color: '#2C3E50',
            fontSize: 16,
            fontWeight: 500,
            lineHeight: 1.5,
          }}
        >
          {value}
        </p>
      </div>
    </div>
  )
}

export const DoctorProfileStudioPreview: UserViewComponent = ({document}) => {
  const displayed = (document.displayed || {}) as Record<string, any>
  const cardImage = displayed.imagemCard || displayed.imagem
  const usesFallbackImage = !hasImageAsset(displayed.imagemCard) && hasImageAsset(displayed.imagem)
  const imageUrl = buildImageUrl(cardImage, {
    width: 1600,
    height: 1000,
    fit: 'crop',
  })

  return (
    <Box padding={4}>
      <Stack space={5}>
        <Stack space={2}>
          <Heading size={1}>Pré-visualização da equipe</Heading>
          <Text muted size={1}>
            Esta pré-visualização replica o card exibido na seção de equipe do site e usa a mesma
            imagem enviada para o card.
          </Text>
        </Stack>

        <Card border padding={4} radius={4}>
          <Stack space={3}>
            <Flex align="center" justify="space-between">
              <Heading size={1}>Card do médico</Heading>
              <Badge tone="primary">área de imagem 16:10</Badge>
            </Flex>

            {usesFallbackImage ? (
              <Text muted size={1}>
                Nenhuma imagem específica para o card foi escolhida. Esta pré-visualização está
                usando a foto principal do médico como fallback.
              </Text>
            ) : (
              <Text muted size={1}>
                A imagem abaixo corresponde ao enquadramento real que será exibido no card do site.
              </Text>
            )}

            <article
              style={{
                maxWidth: 760,
                background: '#FAFAF8',
                borderRadius: 24,
                overflow: 'hidden',
                border: '1px solid rgba(26, 58, 82, 0.08)',
                boxShadow: '0 24px 48px rgba(15, 23, 42, 0.08)',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  aspectRatio: '16 / 10',
                  overflow: 'hidden',
                  background: 'rgba(26, 58, 82, 0.05)',
                }}
              >
                {imageUrl ? (
                  <img
                    alt={displayed.nome || 'Foto do médico'}
                    src={imageUrl}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                ) : (
                  <Flex align="center" justify="center" style={{width: '100%', height: '100%'}}>
                    <Text muted size={1}>
                      A imagem do card do médico aparecerá aqui.
                    </Text>
                  </Flex>
                )}

                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(to top, rgba(26, 58, 82, 0.92), rgba(26, 58, 82, 0.40), transparent)',
                  }}
                />

                <div
                  style={{
                    position: 'absolute',
                    left: 32,
                    right: 32,
                    bottom: 30,
                  }}
                >
                  <h3
                    style={{
                      margin: '0 0 8px',
                      color: '#ffffff',
                      fontSize: 34,
                      fontWeight: 700,
                      fontFamily: 'Georgia, serif',
                    }}
                  >
                    {displayed.nome || 'Nome do médico'}
                  </h3>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      color: '#C9A962',
                      marginBottom: 8,
                    }}
                  >
                    <AwardIcon />
                    <span style={{fontSize: 14, fontWeight: 700}}>
                      {displayed.crm || 'CRM'}
                    </span>
                  </div>

                  <p style={{margin: 0, color: 'rgba(255,255,255,0.92)', fontSize: 15}}>
                    {displayed.especialidade || 'Endocrinologia e Metabologia'}
                  </p>
                </div>
              </div>

              <div style={{padding: 32}}>
                <div style={{display: 'grid', gap: 20}}>
                  <DoctorInfoRow
                    icon={<GraduationCapIcon />}
                    label="Formação"
                    value={displayed.formacao || 'A formação preenchida aparecerá aqui.'}
                  />

                  <DoctorInfoRow
                    icon={<BriefcaseIcon />}
                    label="Residência em Clínica Médica"
                    value={displayed.residencyClinica || 'A residência clínica aparecerá aqui.'}
                  />

                  <DoctorInfoRow
                    icon={<AwardIcon />}
                    label="Residência em Endocrinologia"
                    value={
                      displayed.residencyEndo || 'A residência em endocrinologia aparecerá aqui.'
                    }
                  />
                </div>
              </div>
            </article>
          </Stack>
        </Card>
      </Stack>
    </Box>
  )
}
