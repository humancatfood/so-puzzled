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

type Ref = HTMLDivElement | null

export const Stage = forwardRef<Ref, PropsWithChildren<unknown>>(
  ({ children }, forwardedRef) => {
    const ref = useRef<HTMLDivElement>(null)

    const { movePieceToStage, stagePieces } = useGameState()

    const [{ isOver }, dropRef] = useDrop(() => ({
      accept: 'piece',
      collect: monitor => ({
        isOver: monitor.isOver(),
      }),
      drop: (item: { id: string }, monitor) => {
        if (!monitor.didDrop()) {
          const offset = monitor.getSourceClientOffset()
          movePieceToStage(item.id, offset?.y ?? 0, offset?.x ?? 0)
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
        {stagePieces.map(piece => {
          if (piece.top != null && piece.left != null) {
            return <Piece key={piece.id} piece={piece} />
          }
        })}
      </StageWrapper>
    )
  },
)

Stage.displayName = 'Stage'
