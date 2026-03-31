import {Badge, Box, Card, Flex, Grid, Heading, Stack, Text} from '@sanity/ui'
import type {UserViewComponent} from 'sanity/structure'
import {buildImageUrl} from '../../lib/imagePreview'

export const SiteSettingsStudioPreview: UserViewComponent = ({document}) => {
  const displayed = (document.displayed || {}) as Record<string, any>
  const logoUrl = buildImageUrl(displayed.logo, {width: 320, height: 96, fit: 'max'})
  const faviconUrl = buildImageUrl(displayed.favicon, {width: 64, height: 64, fit: 'max'})
  const heroUrl = buildImageUrl(displayed.heroImage, {width: 1200, height: 1500, fit: 'crop'})

  return (
    <Box padding={4}>
      <Stack space={5}>
        <Stack space={2}>
          <Heading size={1}>Pré-visualização da marca e do topo</Heading>
          <Text muted size={1}>
            Esta aba mostra como a marca aparece no header, no favicon e no bloco principal do
            site.
          </Text>
        </Stack>

        <Grid columns={[1, 1, 2]} gap={4}>
          <Card border padding={4} radius={4}>
            <Stack space={4}>
              <Flex align="center" justify="space-between">
                <Heading size={1}>Logo e favicon</Heading>
                <Badge tone="primary">header + aba do navegador</Badge>
              </Flex>

              <div
                style={{
                  borderRadius: 18,
                  border: '1px solid rgba(26, 58, 82, 0.08)',
                  overflow: 'hidden',
                  background: '#ffffff',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '12px 16px',
                    borderBottom: '1px solid rgba(26, 58, 82, 0.08)',
                    background: '#F7F7F8',
                  }}
                >
                  <div
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: 4,
                      overflow: 'hidden',
                      background: '#F2F4F7',
                      display: 'grid',
                      placeItems: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {faviconUrl ? (
                      <img
                        alt="Favicon"
                        src={faviconUrl}
                        style={{width: '100%', height: '100%', objectFit: 'contain'}}
                      />
                    ) : (
                      <span style={{fontSize: 10, color: '#6B7280'}}>F</span>
                    )}
                  </div>
                  <Text size={1}>EndoClinica B&amp;B</Text>
                </div>

                <div style={{padding: 20, background: '#ffffff'}}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      minHeight: 70,
                    }}
                  >
                    {logoUrl ? (
                      <img
                        alt="Logo"
                        src={logoUrl}
                        style={{maxWidth: 250, width: 'auto', maxHeight: 56, objectFit: 'contain'}}
                      />
                    ) : (
                      <Text muted size={1}>
                        A logo da clínica aparecerá aqui.
                      </Text>
                    )}
                  </div>
                </div>
              </div>
            </Stack>
          </Card>

          <Card border padding={4} radius={4}>
            <Stack space={4}>
              <Flex align="center" justify="space-between">
                <Heading size={1}>Imagem principal do topo</Heading>
                <Badge tone="caution">Hero do site 4:5</Badge>
              </Flex>

              <div
                style={{
                  borderRadius: 24,
                  overflow: 'hidden',
                  background: '#F8F5EE',
                  boxShadow: '0 18px 42px rgba(15, 23, 42, 0.06)',
                  aspectRatio: '4 / 5',
                }}
              >
                {heroUrl ? (
                  <img
                    alt="Hero"
                    src={heroUrl}
                    style={{width: '100%', height: '100%', objectFit: 'cover', display: 'block'}}
                  />
                ) : (
                  <Flex align="center" justify="center" style={{width: '100%', height: '100%'}}>
                    <Text muted size={1}>
                      A imagem principal do topo aparecerá aqui.
                    </Text>
                  </Flex>
                )}
              </div>
            </Stack>
          </Card>
        </Grid>
      </Stack>
    </Box>
  )
}
