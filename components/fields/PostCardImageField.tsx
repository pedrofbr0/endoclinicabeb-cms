import type {FieldProps} from 'sanity'
import {ImageStage, PreviewPanel} from './ImageFieldPreviewLayout'

export function PostCardImageField(props: FieldProps) {
  const imageValue = props.value as Record<string, unknown> | undefined

  return (
    <>
      {props.renderDefault(props)}
      <PreviewPanel
        title="Região visível no card do blog"
        badge="16:9"
        helpText="Esta é a área efetiva da miniatura usada nos cards da home e da listagem do blog."
      >
        <div style={{maxWidth: 420, margin: '0 auto'}}>
          <ImageStage
            imageValue={imageValue}
            alt="Prévia da imagem do card do blog"
            width={960}
            height={540}
            fit="crop"
            objectFit="cover"
            aspectRatio="16 / 9"
            emptyText="A imagem do card do blog aparecerá aqui depois do upload."
          />
        </div>
      </PreviewPanel>
    </>
  )
}
