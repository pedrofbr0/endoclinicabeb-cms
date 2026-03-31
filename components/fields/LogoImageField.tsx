import {Flex, Text} from '@sanity/ui'
import type {FieldProps} from 'sanity'
import {buildImageUrl} from '../../lib/imagePreview'
import {PreviewPanel} from './ImageFieldPreviewLayout'

export function LogoImageField(props: FieldProps) {
  const imageValue = props.value as Record<string, unknown> | undefined
  const imageUrl = buildImageUrl(imageValue, {
    width: 160,
    height: 160,
    fit: 'max',
  })

  return (
    <>
      {props.renderDefault(props)}
      <PreviewPanel
        title="Como a logo aparece no site"
        badge="Header"
        helpText="A prévia abaixo replica a diagramação real do header. Se você usar apenas o símbolo da marca, o nome da clínica continua aparecendo ao lado no site."
      >
        <div style={{display: 'grid', gap: 16, maxWidth: 760}}>
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
                padding: '16px 20px',
                minHeight: 74,
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                background: '#FAFAF8',
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
                {imageUrl ? (
                  <img
                    alt="Prévia desktop da logo no header"
                    src={imageUrl}
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
              borderRadius: 18,
              border: '1px solid rgba(26, 58, 82, 0.08)',
              overflow: 'hidden',
              background: '#ffffff',
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
                background: '#FAFAF8',
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
                  {imageUrl ? (
                    <img
                      alt="Prévia mobile da logo no header"
                      src={imageUrl}
                      style={{width: '100%', height: '100%', objectFit: 'contain'}}
                    />
                  ) : null}
                </div>

                <div
                  style={{
                    lineHeight: 1.05,
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: 2,
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
                <span
                  style={{
                    position: 'absolute',
                    top: 5,
                    left: 0,
                    right: 0,
                    height: 2,
                    background: '#1A3A52',
                    borderRadius: 999,
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: 11,
                    left: 0,
                    right: 0,
                    height: 2,
                    background: '#1A3A52',
                    borderRadius: 999,
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: 17,
                    left: 0,
                    right: 0,
                    height: 2,
                    background: '#1A3A52',
                    borderRadius: 999,
                  }}
                />
              </div>
            </div>
          </div>

          {!imageUrl ? (
            <Flex align="center" justify="center" style={{minHeight: 40}}>
              <Text muted size={1}>
                A logo aparecerá aqui depois do upload.
              </Text>
            </Flex>
          ) : null}
        </div>
      </PreviewPanel>
    </>
  )
}
