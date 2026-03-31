import type {PortableTextPluginsProps} from 'sanity'

export function portableTextPlugins(props: PortableTextPluginsProps) {
  return props.renderDefault({
    ...props,
    plugins: {
      ...props.plugins,
      markdown: {
        enabled: true,
        defaultStyle: ({schema}) => schema.styles.find((style) => style.name === 'normal')?.name,
        headingStyle: ({schema, props: headingProps}) =>
          headingProps.level <= 2
            ? schema.styles.find((style) => style.name === 'h2')?.name
            : schema.styles.find((style) => style.name === 'h3')?.name,
        blockquoteStyle: ({schema}) =>
          schema.styles.find((style) => style.name === 'blockquote')?.name,
        orderedList: ({schema}) => schema.lists.find((list) => list.name === 'number')?.name,
        unorderedList: ({schema}) => schema.lists.find((list) => list.name === 'bullet')?.name,
        boldDecorator: ({schema}) =>
          schema.decorators.find((decorator) => decorator.name === 'strong')?.name,
        italicDecorator: ({schema}) =>
          schema.decorators.find((decorator) => decorator.name === 'em')?.name,
        linkObject: ({context, props: linkProps}) => {
          const schemaType = context.schema.annotations.find((annotation) => annotation.name === 'link')
          const hrefField = schemaType?.fields.find(
            (field) => field.name === 'href' && field.type === 'string',
          )

          if (!schemaType || !hrefField) {
            return undefined
          }

          return {
            _type: schemaType.name,
            [hrefField.name]: linkProps.href,
          }
        },
      },
      pasteLink: {
        enabled: true,
      },
      typography: {
        enabled: true,
      },
    },
  })
}
