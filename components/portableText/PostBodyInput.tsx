import {PortableTextEditor, type EditorChange} from '@portabletext/editor'
import {Button, Card, Code, Flex, Inline, Stack, Text, Tooltip} from '@sanity/ui'
import {useEffect, useRef, useState} from 'react'
import {createPortal} from 'react-dom'
import {PortableTextInput, type PortableTextInputProps} from 'sanity'

const alignmentOptions = [
  {value: 'justify', label: 'Justificar', icon: JustifyAlignIcon},
  {value: 'left', label: 'A esquerda', icon: LeftAlignIcon},
  {value: 'center', label: 'Centralizar', icon: CenterAlignIcon},
  {value: 'right', label: 'A direita', icon: RightAlignIcon},
] as const

const paragraphStyleMap = {
  justify: 'normal',
  left: 'alignLeft',
  center: 'alignCenter',
  right: 'alignRight',
} as const

const paragraphStyles = new Set(['normal', 'alignLeft', 'alignCenter', 'alignRight', 'justified'])

function getCurrentAlignment(style?: string) {
  if (style === 'alignLeft') return 'left'
  if (style === 'alignCenter') return 'center'
  if (style === 'alignRight') return 'right'
  return 'justify'
}

function AlignmentSvg({
  widths,
  align = 'left',
}: {
  widths: number[]
  align?: 'left' | 'center' | 'right'
}) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" width="16" height="16" fill="none">
      {widths.map((width, index) => {
        const x =
          align === 'center' ? (16 - width) / 2 : align === 'right' ? 16 - width : 0

        return (
          <rect
            key={`${width}-${index}`}
            x={x}
            y={1.5 + index * 4}
            width={width}
            height={1.7}
            rx={0.85}
            fill="currentColor"
          />
        )
      })}
    </svg>
  )
}

function JustifyAlignIcon() {
  return <AlignmentSvg widths={[16, 16, 16, 16]} />
}

function LeftAlignIcon() {
  return <AlignmentSvg widths={[16, 12, 16, 10]} align="left" />
}

function CenterAlignIcon() {
  return <AlignmentSvg widths={[14, 10, 14, 8]} align="center" />
}

function RightAlignIcon() {
  return <AlignmentSvg widths={[16, 12, 16, 10]} align="right" />
}

export function PostBodyInput(props: PortableTextInputProps) {
  const editorRef = useRef<PortableTextEditor | null>(null)
  const [, setEditorTick] = useState(0)
  const [toolbarPortalHost, setToolbarPortalHost] = useState<HTMLDivElement | null>(null)

  const focusedBlock = editorRef.current ? PortableTextEditor.focusBlock(editorRef.current) : undefined
  const currentStyle = typeof focusedBlock?.style === 'string' ? focusedBlock.style : 'normal'
  const currentAlignment = getCurrentAlignment(currentStyle)
  const isParagraphBlock = paragraphStyles.has(currentStyle)

  const handleEditorChange = (change: EditorChange, editor: PortableTextEditor) => {
    props.onEditorChange?.(change, editor)
    setEditorTick((currentValue) => currentValue + 1)
  }

  const handleAlignmentClick = (value: (typeof alignmentOptions)[number]['value']) => {
    const editor = editorRef.current

    if (!editor) {
      return
    }

    const focusedBlock = PortableTextEditor.focusBlock(editor)
    const focusedStyle = typeof focusedBlock?.style === 'string' ? focusedBlock.style : 'normal'

    if (!paragraphStyles.has(focusedStyle)) {
      return
    }

    PortableTextEditor.focus(editor)
    PortableTextEditor.toggleBlockStyle(editor, paragraphStyleMap[value])
    setEditorTick((currentValue) => currentValue + 1)
  }

  useEffect(() => {
    if (typeof document === 'undefined' || !document.body) {
      return
    }

    const resolveToolbarPortalHost = () => {
      const toolbarCards = Array.from(
        document.querySelectorAll<HTMLElement>('[data-testid="pt-editor__toolbar-card"]'),
      )
      const visibleToolbarCards = toolbarCards.filter((toolbarCard) => toolbarCard.getClientRects().length > 0)
      const toolbarCard = visibleToolbarCards.at(-1) || toolbarCards.at(-1) || null
      const toolbarRow =
        toolbarCard?.firstElementChild instanceof HTMLElement ? toolbarCard.firstElementChild : null

      if (!toolbarRow) {
        setToolbarPortalHost((currentValue) => {
          currentValue?.remove()
          return null
        })
        return
      }

      const fullscreenArea = toolbarRow.lastElementChild
      let portalSlot = toolbarRow.querySelector<HTMLDivElement>('[data-alignment-toolbar-slot="true"]')

      if (!portalSlot) {
        portalSlot = document.createElement('div')
        portalSlot.setAttribute('data-alignment-toolbar-slot', 'true')

        if (fullscreenArea) {
          toolbarRow.insertBefore(portalSlot, fullscreenArea)
        } else {
          toolbarRow.appendChild(portalSlot)
        }
      }

      document.querySelectorAll<HTMLDivElement>('[data-alignment-toolbar-slot="true"]').forEach((slot) => {
        if (slot !== portalSlot) {
          slot.remove()
        }
      })

      setToolbarPortalHost((currentValue) => {
        if (currentValue && currentValue !== portalSlot) {
          currentValue.remove()
        }

        return currentValue === portalSlot ? currentValue : portalSlot
      })
    }

    resolveToolbarPortalHost()

    const observer = new MutationObserver(resolveToolbarPortalHost)
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })

    window.addEventListener('resize', resolveToolbarPortalHost)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', resolveToolbarPortalHost)
      setToolbarPortalHost((currentValue) => {
        currentValue?.remove()
        return null
      })
    }
  }, [])

  return (
    <Stack space={3}>
      <Card border padding={3} radius={3} tone="transparent">
        <Stack space={3}>
          <Text size={1} weight="semibold">
            Editor mais organizado
          </Text>
          <Text muted size={1}>
            O seletor de estilos agora cuida apenas da hierarquia do texto. O alinhamento aparece
            dentro da mesma barra do editor, junto das opcoes como negrito e italico.
          </Text>
          <Text muted size={1}>
            O editor aceita Markdown enquanto voce digita, sem perder o formato estruturado do
            artigo.
          </Text>
          <Inline space={2}>
            <Code size={1}># Titulo</Code>
            <Code size={1}>## Subtitulo</Code>
            <Code size={1}>- Lista</Code>
            <Code size={1}>1. Lista</Code>
            <Code size={1}>&gt; Citacao</Code>
            <Code size={1}>**Negrito**</Code>
            <Code size={1}>*Italico*</Code>
          </Inline>
        </Stack>
      </Card>

      <div>
        {toolbarPortalHost
          ? createPortal(
              <Flex
                align="center"
                gap={1}
                style={{
                  borderLeft: '1px solid var(--card-border-color)',
                  marginLeft: 4,
                  paddingLeft: 8,
                  minHeight: '100%',
                }}
              >
                <Text muted size={1} weight="medium">
                  Alinh.
                </Text>

                {alignmentOptions.map((option) => (
                  <Tooltip
                    content={
                      <Card padding={2} radius={2} shadow={1}>
                        <Text size={1}>
                          {isParagraphBlock
                            ? option.label
                            : 'Selecione um paragrafo para usar os controles de alinhamento.'}
                        </Text>
                      </Card>
                    }
                    key={option.value}
                    placement="top"
                  >
                    <Button
                      aria-label={option.label}
                      fontSize={1}
                      icon={option.icon}
                      mode="bleed"
                      padding={2}
                      disabled={!isParagraphBlock}
                      selected={currentAlignment === option.value}
                      tone={currentAlignment === option.value ? 'primary' : 'default'}
                      onClick={() => handleAlignmentClick(option.value)}
                    />
                  </Tooltip>
                ))}
              </Flex>,
              toolbarPortalHost,
            )
          : null}

        <PortableTextInput
          {...props}
          editorRef={editorRef}
          onEditorChange={handleEditorChange}
        />
      </div>
    </Stack>
  )
}
