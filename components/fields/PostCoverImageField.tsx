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
          badge="780 × 320"
          helpText="Na página do artigo, a imagem de capa é exibida inteira dentro de uma moldura mais larga."
        >
          <div style={{background: '#ffffff', borderRadius: 24, padding: 18, margin: '0 auto'}}>
            <ImageStage
              imageValue={imageValue}
              alt="Prévia da capa do artigo"
              width={780}
              height={320}
              fit="max"
              objectFit="contain"
              aspectRatio="39 / 16"
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
