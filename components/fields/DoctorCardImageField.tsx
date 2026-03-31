import {Badge, Card, Flex, Heading, Stack, Text} from '@sanity/ui'
import type {FieldProps} from 'sanity'
import {buildImageUrl, hasImageAsset} from '../../lib/imagePreview'

export function DoctorCardImageField(props: FieldProps) {
  const imageValue = props.value as Record<string, unknown> | undefined
  const imageUrl = buildImageUrl(imageValue, {
    width: 1600,
    height: 1000,
    fit: 'crop',
  })

  return (
    <Stack space={3}>
      {props.renderDefault(props)}

      <Card border padding={3} radius={3} tone="transparent">
        <Stack space={3}>
          <Flex align="center" justify="space-between">
            <Heading size={1}>Região visível no card do site</Heading>
            <Badge tone="primary">16:10</Badge>
          </Flex>

          <Text muted size={1}>
            Use esta moldura como referência principal. O card publicado no site exibirá exatamente
            esta região da imagem.
          </Text>

          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: 760,
              aspectRatio: '16 / 10',
              overflow: 'hidden',
              borderRadius: 24,
              background: 'rgba(26, 58, 82, 0.05)',
              border: '1px solid rgba(26, 58, 82, 0.08)',
            }}
          >
            {hasImageAsset(imageValue) && imageUrl ? (
              <>
                <img
                  alt="Prévia do enquadramento do card"
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
                      'linear-gradient(to top, rgba(26, 58, 82, 0.88), rgba(26, 58, 82, 0.36), transparent)',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    left: 28,
                    right: 28,
                    bottom: 24,
                    color: '#fff',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'Georgia, serif',
                      fontSize: 28,
                      fontWeight: 700,
                      lineHeight: 1.1,
                      marginBottom: 8,
                    }}
                  >
                    Nome do médico
                  </div>
                  <div style={{fontSize: 14, color: '#C9A962', fontWeight: 700, marginBottom: 6}}>
                    CRM/UF 00000
                  </div>
                  <div style={{fontSize: 14, color: 'rgba(255,255,255,0.92)'}}>
                    Endocrinologia e Metabologia
                  </div>
                </div>
              </>
            ) : (
              <Flex align="center" justify="center" style={{width: '100%', height: '100%'}}>
                <Text muted size={1}>
                  A pré-visualização do card aparecerá aqui depois do upload.
                </Text>
              </Flex>
            )}
          </div>
        </Stack>
      </Card>
    </Stack>
  )
}
