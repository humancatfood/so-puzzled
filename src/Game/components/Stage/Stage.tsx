import {
  PropsWithChildren,
  forwardRef,
  useEffect,
  useRef,
  useImperativeHandle,
} from 'react'
import { useDrop } from 'react-dnd'
import { StageWrapper } from './Stage.styled'

type StageProps = PropsWithChildren<{
  onDropPiece: (itemId: string, top: number, left: number) => void
}>

type Ref = HTMLDivElement | null

export const Stage = forwardRef<Ref, StageProps>((props, forwardedRef) => {
  const ref = useRef<HTMLDivElement>(null)

  const { onDropPiece, children } = props
  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: 'piece',
    collect: monitor => ({
      isOver: monitor.isOver(),
    }),
    drop: (item: { id: string }, monitor) => {
      if (!monitor.didDrop()) {
        const offset = monitor.getSourceClientOffset()
        onDropPiece(item.id, offset?.y ?? 0, offset?.x ?? 0)
      }
    },
  }))

  useEffect(() => {
    dropRef(ref)
  })

  useImperativeHandle<Ref, Ref>(forwardedRef, () => ref.current)

  return (
    <StageWrapper isHighlighted={isOver} ref={ref}>
      {children}
    </StageWrapper>
  )
})

Stage.displayName = 'Stage'
