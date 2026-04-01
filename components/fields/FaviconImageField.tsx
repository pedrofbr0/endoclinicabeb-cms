import {Flex, Text} from '@sanity/ui'
import type {FieldProps} from 'sanity'
import {buildImageUrl} from '../../lib/imagePreview'
import {ImageFieldEditorShell} from './ImageFieldEditorShell'
import {PreviewPanel} from './ImageFieldPreviewLayout'

export function FaviconImageField(props: FieldProps) {
  const imageValue = props.value as Record<string, unknown> | undefined
  const faviconUrl = buildImageUrl(imageValue, {
    width: 128,
    height: 128,
    fit: 'max',
  })

  return (
    <>
      <ImageFieldEditorShell {...props} />
      <PreviewPanel
        title="Como o favicon aparece"
        badge="1:1"
        helpText="O favicon é exibido em formato quadrado e em tamanho pequeno. Prefira ícones simples e bem centralizados."
      >
        <div
          style={{
            display: 'grid',
            gap: 16,
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          }}
        >
          <div
            style={{
              borderRadius: 16,
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
                background: '#F7F7F8',
              }}
            >
              <div
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 4,
                  background: '#F2F4F7',
                  overflow: 'hidden',
                  flexShrink: 0,
                }}
              >
                {faviconUrl ? (
                  <img
                    alt="Prévia do favicon"
                    src={faviconUrl}
                    style={{width: '100%', height: '100%', objectFit: 'contain'}}
                  />
                ) : null}
              </div>
              <Text size={1}>EndoClinica B&amp;B</Text>
            </div>
          </div>

          <div
            style={{
              borderRadius: 16,
              border: '1px solid rgba(26, 58, 82, 0.08)',
              background: '#ffffff',
              padding: 20,
              display: 'grid',
              placeItems: 'center',
            }}
          >
            {faviconUrl ? (
              <img
                alt="Prévia ampliada do favicon"
                src={faviconUrl}
                style={{width: 72, height: 72, objectFit: 'contain'}}
              />
            ) : (
              <Flex align="center" justify="center" style={{minHeight: 72}}>
                <Text muted size={1}>
                  O favicon aparecerá aqui depois do upload.
                </Text>
              </Flex>
            )}
          </div>
        </div>
      </PreviewPanel>
    </>
  )
}
