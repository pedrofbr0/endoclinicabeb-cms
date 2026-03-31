import type {FieldProps} from 'sanity'
import {ImageStage, PreviewPanel} from './ImageFieldPreviewLayout'

export function HeroImageField(props: FieldProps) {
  const imageValue = props.value as Record<string, unknown> | undefined

  return (
    <>
      {props.renderDefault(props)}
      <PreviewPanel
        title="Região visível na imagem de destaque"
        badge="Hero 4:5"
        helpText="Esta é a área efetiva da imagem principal no topo do site."
      >
        <div style={{maxWidth: 420}}>
          <ImageStage
            imageValue={imageValue}
            alt="Prévia da imagem principal do site"
            width={1200}
            height={1500}
            fit="crop"
            objectFit="cover"
            aspectRatio="4 / 5"
            emptyText="A imagem principal do topo aparecerá aqui depois do upload."
          />
        </div>
      </PreviewPanel>
    </>
  )
}
