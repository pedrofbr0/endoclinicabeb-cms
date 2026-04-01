import {Card, Stack, Text} from '@sanity/ui'
import type {FieldProps} from 'sanity'
import {buildImageUrl, hasImageAsset} from '../../lib/imagePreview'

const shellClassName = 'custom-image-field-editor-shell'
const defaultRenderClassName = `${shellClassName}__default-render`

export function ImageFieldEditorShell(props: FieldProps) {
  const imageValue = props.value as Record<string, unknown> | undefined
  const uploadedImageUrl = hasImageAsset(imageValue)
    ? buildImageUrl(imageValue, {width: 1400, fit: 'max'})
    : ''

  return (
    <Stack space={3}>
      <style>{`
        .${defaultRenderClassName} [data-testid="media-preview"],
        .${defaultRenderClassName} [data-testid="default-preview"] {
          display: none !important;
        }

        .${defaultRenderClassName} [data-buttons="true"] {
          position: static !important;
          margin-left: auto;
          padding: 0 !important;
        }

        .${defaultRenderClassName} :where(div, section, article, span):has(> [data-buttons="true"]) {
          display: flex;
          justify-content: flex-end;
          align-items: flex-start;
          gap: 8px;
          min-height: 0 !important;
        }

        .${defaultRenderClassName} :where(div, section, article, span):has([data-testid="media-preview"]):not(:has([data-buttons="true"])),
        .${defaultRenderClassName} :where(div, section, article, span):has([data-testid="default-preview"]):not(:has([data-buttons="true"])) {
          min-height: 0 !important;
          height: auto !important;
          padding: 0 !important;
          margin: 0 !important;
          background: transparent !important;
          border: 0 !important;
          box-shadow: none !important;
        }
      `}</style>

      {uploadedImageUrl ? (
        <Card border padding={2} radius={3} tone="transparent">
          <Stack space={2}>
            <div
              style={{
                width: '100%',
                minHeight: 220,
                maxHeight: 320,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                borderRadius: 16,
                background: '#0F1115',
                border: '1px solid rgba(255, 255, 255, 0.06)',
              }}
            >
              <img
                alt="Prévia do arquivo enviado"
                src={uploadedImageUrl}
                style={{
                  maxWidth: '100%',
                  maxHeight: 320,
                  width: 'auto',
                  height: 'auto',
                  display: 'block',
                  objectFit: 'contain',
                }}
              />
            </div>

            <Text muted size={1}>
              Arquivo enviado. Use as prévias abaixo para conferir como a imagem será enquadrada no
              frontend.
            </Text>
          </Stack>
        </Card>
      ) : null}

      <div className={defaultRenderClassName}>{props.renderDefault(props)}</div>
    </Stack>
  )
}
