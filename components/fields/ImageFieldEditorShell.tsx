import type {FieldProps} from 'sanity'

const shellClassName = 'custom-image-field-editor-shell'

export function ImageFieldEditorShell(props: FieldProps) {
  return (
    <div className={shellClassName}>
      <style>{`
        .${shellClassName} [data-testid="media-preview"],
        .${shellClassName} [data-testid="default-preview"],
        .${shellClassName} img,
        .${shellClassName} picture,
        .${shellClassName} canvas {
          display: none !important;
        }

        .${shellClassName} [data-buttons="true"] {
          position: static !important;
          margin-left: auto;
          padding: 0 !important;
        }

        .${shellClassName} :where(div, section, article, span):has(> [data-buttons="true"]) {
          display: flex;
          justify-content: flex-end;
          align-items: flex-start;
          gap: 8px;
          min-height: 0 !important;
        }

        .${shellClassName} :where(div, section, article, span):has(img):not(:has([data-buttons="true"])),
        .${shellClassName} :where(div, section, article, span):has(picture):not(:has([data-buttons="true"])) {
          min-height: 0 !important;
          padding: 0 !important;
          margin: 0 !important;
        }
      `}</style>
      {props.renderDefault(props)}
    </div>
  )
}
