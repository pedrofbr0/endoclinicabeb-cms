import {Grid} from '@sanity/ui'
import type {FieldProps} from 'sanity'
import {ImageStage, PreviewPanel} from './ImageFieldPreviewLayout'

export function PostCoverImageField(props: FieldProps) {
  const imageValue = props.value as Record<string, unknown> | undefined

  return (
    <>
      {props.renderDefault(props)}
      <Grid columns={[1, 1, 2]} gap={3}>
        <PreviewPanel
          title="Capa na página do artigo"
          badge="até 896 × 560"
          helpText="No frontend, a capa aparece inteira dentro de uma moldura mais larga, acima do título do artigo."
        >
          <div
            style={{
              background: '#FAFAF8',
              borderRadius: 24,
              padding: 18,
              margin: '0 auto',
              border: '1px solid rgba(26, 58, 82, 0.08)',
            }}
          >
            <ImageStage
              imageValue={imageValue}
              alt="Prévia da capa do artigo"
              width={1600}
              height={560}
              fit="max"
              objectFit="contain"
              aspectRatio="8 / 5"
              emptyText="A capa do artigo aparecerá aqui depois do upload."
            />
          </div>
        </PreviewPanel>

        <PreviewPanel
          title="Miniatura de compartilhamento"
          badge="1200 × 630"
          helpText="Aqui crop e hotspot fazem diferença. Esta é a versão usada para Open Graph e compartilhamento."
        >
          <ImageStage
            imageValue={imageValue}
            alt="Prévia de compartilhamento do artigo"
            width={1200}
            height={630}
            fit="crop"
            objectFit="cover"
            aspectRatio="40 / 21"
            emptyText="A miniatura de compartilhamento aparecerá aqui depois do upload."
          />
        </PreviewPanel>
      </Grid>
    </>
  )
}
