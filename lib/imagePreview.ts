import {createImageUrlBuilder} from '@sanity/image-url'
import {createClient} from '@sanity/client'
import {STUDIO_API_VERSION, STUDIO_DATASET, STUDIO_PROJECT_ID} from './studioConfig'

const previewClient = createClient({
  projectId: STUDIO_PROJECT_ID,
  dataset: STUDIO_DATASET,
  apiVersion: STUDIO_API_VERSION,
  useCdn: true,
})

const imageBuilder = createImageUrlBuilder(previewClient)

export function hasImageAsset(source: any) {
  return Boolean(source?.asset?._ref || source?._ref || source?.url)
}

export function buildImageUrl(
  source: any,
  options?: {
    width?: number
    height?: number
    fit?: 'crop' | 'max'
  },
) {
  if (!hasImageAsset(source)) {
    return ''
  }

  if (typeof source?.url === 'string' && source.url) {
    return source.url
  }

  let builder = imageBuilder.image(source).auto('format')

  if (options?.width) {
    builder = builder.width(options.width)
  }

  if (options?.height) {
    builder = builder.height(options.height)
  }

  if (options?.fit === 'max') {
    builder = builder.fit('max')
  } else if (options?.height) {
    builder = builder.fit('crop')
  }

  return builder.url()
}
