import { useEffect } from 'react'
import { useDrag } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'

import { IPiece } from '../../State'
import { Piece } from './Piece'
import { PieceWrapper } from './Piece.styled'

type Props = {
  piece: IPiece
}

export function StaticPiece({ piece }: Props) {
  const { id, left, top } = piece

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
