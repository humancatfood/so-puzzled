import {
  PropsWithChildren,
  forwardRef,
  useEffect,
  useRef,
  useImperativeHandle,
} from 'react'
import { useDrop } from 'react-dnd'
import { useGameState } from '../../State'
import { Piece } from '../Piece'
import { StageWrapper } from './Stage.styled'
// import {  } from '../../utils'

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

  const { stagePieces } = useGameState()

  useEffect(() => {
    dropRef(ref)
  })

  useImperativeHandle<Ref, Ref>(forwardedRef, () => ref.current)

  return (
    <StageWrapper isHighlighted={isOver} ref={ref}>
      {children}
      {stagePieces.map(({ id, top, left }) => {
        if (top != null && left != null) {
          return <Piece key={id} id={id} offset={{ x: left, y: top }} />
        }
      })}
    </StageWrapper>
  )
})

Stage.displayName = 'Stage'
