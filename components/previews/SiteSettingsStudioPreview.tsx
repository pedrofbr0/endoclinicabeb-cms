import {Badge, Box, Card, Flex, Grid, Heading, Stack, Text} from '@sanity/ui'
import type {UserViewComponent} from 'sanity/structure'
import {buildImageUrl} from '../../lib/imagePreview'

export const SiteSettingsStudioPreview: UserViewComponent = ({document}) => {
  const displayed = (document.displayed || {}) as Record<string, any>
  const logoUrl = buildImageUrl(displayed.logo, {width: 160, height: 160, fit: 'max'})
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

              <Stack space={3}>
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
                      gap: 10,
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

                  <div style={{padding: 20, background: '#ffffff', display: 'grid', gap: 16}}>
                    <div
                      style={{
                        borderRadius: 16,
                        border: '1px solid rgba(26, 58, 82, 0.08)',
                        overflow: 'hidden',
                        background: '#FAFAF8',
                      }}
                    >
                      <div
                        style={{
                          padding: '16px 20px',
                          minHeight: 74,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 12,
                        }}
                      >
                        <div
                          style={{
                            width: 40,
                            height: 40,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                          }}
                        >
                          {logoUrl ? (
                            <img
                              alt="Logo desktop"
                              src={logoUrl}
                              style={{width: '100%', height: '100%', objectFit: 'contain'}}
                            />
                          ) : null}
                        </div>

                        <div style={{lineHeight: 1, whiteSpace: 'nowrap'}}>
                          <span
                            style={{
                              color: '#C9A962',
                              fontFamily: '"Playfair Display", serif',
                              fontWeight: 700,
                              fontSize: 30,
                            }}
                          >
                            Endo
                          </span>
                          <span
                            style={{
                              color: '#1A3A52',
                              fontFamily: '"Playfair Display", serif',
                              fontWeight: 700,
                              fontSize: 30,
                            }}
                          >
                            Clínica
                          </span>{' '}
                          <span
                            style={{
                              color: '#C9A962',
                              fontFamily: '"Playfair Display", serif',
                              fontWeight: 700,
                              fontSize: 30,
                            }}
                          >
                            B&amp;B
                          </span>
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        borderRadius: 16,
                        border: '1px solid rgba(26, 58, 82, 0.08)',
                        overflow: 'hidden',
                        background: '#FAFAF8',
                        maxWidth: 360,
                      }}
                    >
                      <div
                        style={{
                          padding: '14px 16px',
                          minHeight: 64,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: 10,
                        }}
                      >
                        <div style={{display: 'flex', alignItems: 'center', gap: 10, minWidth: 0}}>
                          <div
                            style={{
                              width: 32,
                              height: 32,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                            }}
                          >
                            {logoUrl ? (
                              <img
                                alt="Logo mobile"
                                src={logoUrl}
                                style={{width: '100%', height: '100%', objectFit: 'contain'}}
                              />
                            ) : null}
                          </div>

                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'baseline',
                              gap: 2,
                              lineHeight: 1.05,
                              minWidth: 0,
                            }}
                          >
                            <span
                              style={{
                                color: '#C9A962',
                                fontFamily: '"Playfair Display", serif',
                                fontWeight: 700,
                                fontSize: 18,
                              }}
                            >
                              Endo
                            </span>
                            <span
                              style={{
                                color: '#1A3A52',
                                fontFamily: '"Playfair Display", serif',
                                fontWeight: 700,
                                fontSize: 18,
                              }}
                            >
                              Clínica
                            </span>{' '}
                            <span
                              style={{
                                color: '#C9A962',
                                fontFamily: '"Playfair Display", serif',
                                fontWeight: 700,
                                fontSize: 18,
                              }}
                            >
                              B&amp;B
                            </span>
                          </div>
                        </div>

                        <div
                          style={{
                            width: 24,
                            height: 24,
                            position: 'relative',
                            flexShrink: 0,
                          }}
                        >
                          {[5, 11, 17].map((top) => (
                            <span
                              key={top}
                              style={{
                                position: 'absolute',
                                top,
                                left: 0,
                                right: 0,
                                height: 2,
                                background: '#1A3A52',
                                borderRadius: 999,
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {!logoUrl ? (
                      <Text muted size={1}>
                        A logo da clínica aparecerá aqui.
                      </Text>
                    ) : null}
                  </div>
                </div>
              </Stack>
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
                  background: '#FAFAF8',
                  border: '1px solid rgba(26, 58, 82, 0.08)',
                  boxShadow: '0 18px 42px rgba(15, 23, 42, 0.06)',
                  padding: 24,
                }}
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 0.9fr)',
                    gap: 24,
                    alignItems: 'center',
                  }}
                >
                  <div style={{display: 'grid', gap: 16}}>
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '8px 14px',
                        borderRadius: 999,
                        background: 'rgba(201, 169, 98, 0.16)',
                        color: '#1A3A52',
                        fontSize: 13,
                        fontWeight: 600,
                        width: 'fit-content',
                      }}
                    >
                      Endocrinologia de Alto Padrão
                    </div>
                    <div
                      style={{
                        color: '#1A3A52',
                        fontFamily: '"Playfair Display", serif',
                        fontWeight: 700,
                        fontSize: 40,
                        lineHeight: 1.08,
                      }}
                    >
                      Saúde endócrina: cuidado em dobro no seu acompanhamento metabólico
                    </div>
                    <div style={{color: '#6B7280', fontSize: 18, lineHeight: 1.7}}>
                      Unimos ciência, tecnologia e atendimento humanizado para cuidar de você.
                    </div>
                  </div>

                  <div
                    style={{
                      borderRadius: 24,
                      overflow: 'hidden',
                      background: '#F8F5EE',
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
                </div>
              </div>
            </Stack>
          </Card>
        </Grid>
      </Stack>
    </Box>
  )
}
