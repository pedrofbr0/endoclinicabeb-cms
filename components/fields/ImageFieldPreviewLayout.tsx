import type {ReactNode} from 'react'
import {Badge, Card, Flex, Heading, Stack, Text} from '@sanity/ui'
import {buildImageUrl, hasImageAsset} from '../../lib/imagePreview'

interface PreviewPanelProps {
  title: string
  badge: string
  helpText: string
  children: ReactNode
}

interface ImageStageProps {
  imageValue: Record<string, unknown> | undefined
  alt: string
  width: number
  height: number
  fit?: 'crop' | 'max'
  objectFit?: 'cover' | 'contain'
  aspectRatio?: string
  borderRadius?: number
  background?: string
  emptyText: string
  overlay?: ReactNode
}

export function PreviewPanel({title, badge, helpText, children}: PreviewPanelProps) {
  return (
    <Card border padding={3} radius={3} tone="transparent">
      <Stack space={3}>
        <Flex
          align="flex-start"
          justify="space-between"
          style={{gap: 10, flexWrap: 'wrap'}}
        >
          <Heading size={1} style={{lineHeight: 1.25}}>
            {title}
          </Heading>
          <Badge tone="primary" style={{whiteSpace: 'nowrap', flexShrink: 0}}>
            {badge}
          </Badge>
        </Flex>

        <Text muted size={1}>
          {helpText}
        </Text>

        {children}
      </Stack>
    </Card>
  )
}

export function ImageStage({
  imageValue,
  alt,
  width,
  height,
  fit = 'crop',
  objectFit = 'cover',
  aspectRatio,
  borderRadius = 24,
  background = '#F8F5EE',
  emptyText,
  overlay,
}: ImageStageProps) {
  const imageUrl = buildImageUrl(imageValue, {width, height, fit})

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: aspectRatio || `${width} / ${height}`,
        overflow: 'hidden',
        borderRadius,
        background,
        border: '1px solid rgba(26, 58, 82, 0.08)',
      }}
    >
      {hasImageAsset(imageValue) && imageUrl ? (
        <img
          alt={alt}
          src={imageUrl}
          style={{
            width: '100%',
            height: '100%',
            display: 'block',
            objectFit,
            background,
          }}
        />
      ) : (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
          }}
        >
          <div style={{maxWidth: 280, margin: '0 auto', textAlign: 'center'}}>
            <Text muted size={1} style={{lineHeight: 1.45}}>
              {emptyText}
            </Text>
          </div>
        </div>
      )}

      {overlay}
    </div>
  )
}
