import {Flex, Text} from '@sanity/ui'
import type {FieldProps} from 'sanity'
import {buildImageUrl} from '../../lib/imagePreview'
import {PreviewPanel} from './ImageFieldPreviewLayout'

export function LogoImageField(props: FieldProps) {
  const imageValue = props.value as Record<string, unknown> | undefined
  const imageUrl = buildImageUrl(imageValue, {
    width: 320,
    height: 96,
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
        <div
          style={{
            borderRadius: 18,
            border: '1px solid rgba(26, 58, 82, 0.08)',
            overflow: 'hidden',
            background: '#ffffff',
            maxWidth: 760,
          }}
        >
          <div
            style={{
              padding: '18px 24px',
              minHeight: 86,
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              background: '#FAFAF8',
            }}
          >
            {imageUrl ? (
              <img
                alt="Prévia da logo no header"
                src={imageUrl}
                style={{width: 'auto', maxWidth: 120, maxHeight: 36, objectFit: 'contain'}}
              />
            ) : (
              <Flex align="center" justify="center" style={{minHeight: 40}}>
                <Text muted size={1}>
                  A logo aparecerá aqui depois do upload.
                </Text>
              </Flex>
            )}

            <div style={{lineHeight: 1}}>
              <span
                style={{
                  color: '#C9A962',
                  fontFamily: 'Georgia, serif',
                  fontWeight: 700,
                  fontSize: 26,
                }}
              >
                Endo
              </span>
              <span
                style={{
                  color: '#1A3A52',
                  fontFamily: 'Georgia, serif',
                  fontWeight: 700,
                  fontSize: 26,
                }}
              >
                Clínica
              </span>{' '}
              <span
                style={{
                  color: '#C9A962',
                  fontFamily: 'Georgia, serif',
                  fontWeight: 700,
                  fontSize: 26,
                }}
              >
                B&amp;B
              </span>
            </div>
          </div>
        </div>
      </PreviewPanel>
    </>
  )
}
