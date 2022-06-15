import { useEffect } from 'react'
import { useDrag } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'
import { useConfig } from '../../Config'

import { IPiece } from '../../State'
import { Piece } from './Piece'
import { PieceWrapper } from './Piece.styled'

type Props = {
  piece: IPiece
}

export function StaticPiece({ piece }: Props) {
  const { id, left, top } = piece
  const { pieceWidth, pieceHeight } = useConfig()

  const [{ isDragging }, dragRef, preview] = useDrag({
    type: 'piece',
    item: piece,
    options: {
      dropEffect: 'move',
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  })

  useEffect(() => {
    preview(getEmptyImage(), {
      captureDraggingState: true,
    })
  }, [preview])

  return (
    <PieceWrapper
      ref={dragRef}
      data-testid={`piece-${id}`}
      style={{
        width: pieceWidth,
        height: pieceHeight,
        top: `${top ?? 0}px`,
        left: `${left ?? 0}px`,
        cursor: 'grab',
        opacity: isDragging ? 0 : 1,
      }}
    >
      <Piece piece={piece} />
    </PieceWrapper>
  )
}
