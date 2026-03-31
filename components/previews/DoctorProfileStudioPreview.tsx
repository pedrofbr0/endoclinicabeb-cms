import {Badge, Box, Card, Flex, Heading, Stack, Text} from '@sanity/ui'
import type {UserViewComponent} from 'sanity/structure'
import {buildImageUrl} from '../../lib/imagePreview'

export const DoctorProfileStudioPreview: UserViewComponent = ({document}) => {
  const displayed = (document.displayed || {}) as Record<string, any>
  const isDrRui = String(displayed.nome || '').includes('Rui')
  const imageUrl = buildImageUrl(displayed.imagem, {width: 1200, height: 960, fit: 'crop'})

  return (
    <Box padding={4}>
      <Stack space={5}>
        <Stack space={2}>
          <Heading size={1}>Pré-visualização da equipe</Heading>
          <Text muted size={1}>
            Esta pré-visualização replica o card exibido na seção de equipe do site.
          </Text>
        </Stack>

        <Card border padding={4} radius={4}>
            <Stack space={3}>
              <Flex align="center" justify="space-between">
                <Heading size={1}>Foto e card do médico</Heading>
                <Badge tone="primary">área de imagem 100% x 384px</Badge>
              </Flex>

            <article
              style={{
                background: '#FAFAF8',
                borderRadius: 24,
                overflow: 'hidden',
                border: '1px solid rgba(26, 58, 82, 0.08)',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  height: 384,
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
                      transform: isDrRui ? 'scale(1.35) translateX(-13%)' : 'none',
                      objectPosition: isDrRui ? 'center 15%' : 'center 7%',
                    }}
                  />
                ) : (
                  <Flex align="center" justify="center" style={{width: '100%', height: '100%'}}>
                    <Text muted size={1}>
                      A foto do médico aparecerá aqui.
                    </Text>
                  </Flex>
                )}

                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(to top, rgba(26, 58, 82, 0.92), rgba(26, 58, 82, 0.42), transparent)',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    left: 32,
                    right: 32,
                    bottom: 28,
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
                  <p style={{margin: '0 0 6px', color: '#C9A962', fontSize: 14, fontWeight: 700}}>
                    {displayed.crm || 'CRM'}
                  </p>
                  <p style={{margin: 0, color: 'rgba(255,255,255,0.92)', fontSize: 15}}>
                    {displayed.especialidade || 'Especialidade'}
                  </p>
                </div>
              </div>

              <div style={{padding: 32}}>
                <p style={{margin: '0 0 12px', color: '#C9A962', fontSize: 12, fontWeight: 700}}>
                  FORMAÇÃO
                </p>
                <p style={{margin: '0 0 22px', color: '#2C3E50', fontSize: 17, lineHeight: 1.6}}>
                  {displayed.formacao || 'A formação preenchida aparecerá aqui.'}
                </p>
                <p style={{margin: '0 0 12px', color: '#C9A962', fontSize: 12, fontWeight: 700}}>
                  RESIDÊNCIAS
                </p>
                <p style={{margin: 0, color: '#2C3E50', fontSize: 16, lineHeight: 1.7}}>
                  {displayed.residencyClinica || 'Residência clínica'} <br />
                  {displayed.residencyEndo || 'Residência em endocrinologia'}
                </p>
              </div>
            </article>
          </Stack>
        </Card>
      </Stack>
    </Box>
  )
}
